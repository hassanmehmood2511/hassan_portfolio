"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { MagneticButton } from "../ui/MagneticButton";
import { FloatingGlassShapes } from "../ui/FloatingGlassShapes";
import { siteConfig } from "@/data/site";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const disableParallax = isMobile || prefersReducedMotion;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error occurred. Please check your connection.");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-gradient-to-b from-transparent via-[var(--bg-forest)]/10 to-transparent transition-colors duration-500"
    >
      <FloatingGlassShapes variant="A" />

      <motion.div style={disableParallax ? {} : { y: headingY }} className="relative z-10">
        <SectionHeading
          number="06"
          title="Let's build something great"
          subtitle="Have a project in mind, an architectural query, or a position at your organization? Get in touch!"
        />
      </motion.div>

      <motion.div
        style={disableParallax ? {} : { y: contentY }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Info Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <TiltCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                  Get In Touch
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)]">
                  Senior Software Developer
                </p>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8">
              I'm always open to discussing enterprise backends, mobile app development, technical leadership roles, or custom software projects.
            </p>

            <div className="space-y-4 font-mono text-xs">
              {/* Email Direct Mailto Button */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] transition-all group"
                data-cursor="Send Email"
              >
                <div className="p-2 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">Direct Email</div>
                  <div className="font-bold truncate">{siteConfig.email}</div>
                </div>
              </a>

              {/* LinkedIn Button */}
              <a
                href={siteConfig.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] transition-all group"
                data-cursor="LinkedIn"
              >
                <div className="p-2 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">LinkedIn Profile</div>
                  <div className="font-bold">Hafiz Hassan Mehmood</div>
                </div>
              </a>

              {/* GitHub Button */}
              <a
                href={siteConfig.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] transition-all group"
                data-cursor="GitHub"
              >
                <div className="p-2 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">GitHub Repositories</div>
                  <div className="font-bold">@hassanmehmood2511</div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-color)]">
                <div className="p-2 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">Base Location</div>
                  <div className="font-bold text-[var(--text-primary)]">{siteConfig.location}</div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Form Column (7 Cols) */}
        <div className="lg:col-span-7">
          <TiltCard className="p-8 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Hidden Honeypot Field */}
              <input
                type="text"
                {...register("honeypot")}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    {...register("name")}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-sm"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 font-mono mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    {...register("email")}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-sm"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 font-mono mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="Project Inquiry / Job Opportunity"
                  {...register("subject")}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-sm"
                />
                {errors.subject && (
                  <p className="text-xs text-rose-400 font-mono mt-1">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project goals, timelines, or requirements..."
                  {...register("message")}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-sm resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-rose-400 font-mono mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Status Notifications */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <span>Thank you! Your message has been sent successfully. I'll get back to you shortly.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 font-mono text-xs flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <MagneticButton
                type="submit"
                disabled={status === "loading"}
                cursorLabel="Send Message"
                className="w-full py-4 rounded-xl bg-[var(--accent)] text-stone-900 font-bold text-sm hover:bg-[var(--accent-hover)] shadow-lg shadow-[var(--accent)]/20 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </MagneticButton>
            </form>
          </TiltCard>
        </div>
      </motion.div>
    </section>
  );
};
