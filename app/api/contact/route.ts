import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(),
});

// Simple in-memory IP rate limiter (5 requests per hour)
const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous";
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour

    const rateData = ipRateLimitMap.get(ip);
    if (rateData) {
      if (now < rateData.resetTime) {
        if (rateData.count >= 5) {
          return NextResponse.json(
            { success: false, error: "Too many messages sent. Please try again later." },
            { status: 429 }
          );
        }
        rateData.count += 1;
      } else {
        ipRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      }
    } else {
      ipRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Validation failed.";
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { name, email, subject, message, honeypot } = result.data;

    // Honeypot check (bot detection)
    if (honeypot && honeypot.trim().length > 0) {
      // Fake success to mislead spammers
      return NextResponse.json({ success: true, message: "Message sent successfully." });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "hafizhassanmehmood444@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    // If Resend API key is present, send actual email
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0A2218; background-color: #F3EBDD;">
          <h2 style="color: #123D2B; border-b: 2px solid #C98A4B; padding-bottom: 8px;">New Contact Inquiry from Portfolio</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <hr style="border: 0; border-top: 1px solid #2F6B4F; margin: 20px 0;" />
          <h3 style="color: #123D2B;">Message:</h3>
          <p style="white-space: pre-wrap; background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E8DCC4;">${escapeHtml(message)}</p>
          <footer style="margin-top: 30px; font-size: 12px; color: #2F6B4F;">Sent via Hafiz Hassan Mehmood Portfolio</footer>
        </div>
      `;

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject: `[Portfolio Contact] ${subject} - from ${name}`,
        html: htmlContent,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      });
    } else {
      console.log("[LOCAL DEV CONTACT FORM]", { name, email, subject, message });
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received. Thank you!",
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while sending message." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
