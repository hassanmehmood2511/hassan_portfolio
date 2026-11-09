<?php
/**
 * Contact form handler for the static portfolio (Namecheap shared hosting).
 * Replaces the Next.js /api/contact route.
 *
 * Optional config file, kept OUTSIDE the public web folder so it is never served:
 *   one level above this file:  ../hassan-contact-config.php
 *   <?php return [
 *     'resend_api_key' => 're_xxx',                                   // optional: send via Resend
 *     'to_email'       => 'hafizhassanmehmood444@gmail.com',
 *     'from_email'     => 'Portfolio <hassan@technestnova.com>',       // must be a verified/own domain address
 *   ];
 * Without a Resend key, the server's built-in mail() is used.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'error' => 'Method not allowed.']);
}

// ---------- Config ----------
$config = [
    'resend_api_key' => '',
    'to_email'       => 'hafizhassanmehmood444@gmail.com',
    'from_email'     => 'Portfolio <hassan@technestnova.com>',
];
$configFile = dirname(__DIR__) . '/hassan-contact-config.php';
if (is_readable($configFile)) {
    $loaded = include $configFile;
    if (is_array($loaded)) {
        $config = array_merge($config, $loaded);
    }
}

// ---------- Rate limit: 5 messages per IP per hour ----------
$ip = $_SERVER['REMOTE_ADDR'] ?? 'anonymous';
$rateFile = sys_get_temp_dir() . '/hassan_contact_' . md5($ip) . '.json';
$now = time();
$rate = ['count' => 0, 'reset' => $now + 3600];
if (is_readable($rateFile)) {
    $saved = json_decode((string) file_get_contents($rateFile), true);
    if (is_array($saved) && ($saved['reset'] ?? 0) > $now) {
        $rate = $saved;
    }
}
if ($rate['count'] >= 5) {
    respond(429, ['success' => false, 'error' => 'Too many messages sent. Please try again later.']);
}
$rate['count']++;
@file_put_contents($rateFile, json_encode($rate), LOCK_EX);

// ---------- Input + validation (mirrors the form's rules) ----------
$data = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($data)) {
    respond(400, ['success' => false, 'error' => 'Invalid request.']);
}

$name     = trim((string) ($data['name'] ?? ''));
$email    = trim((string) ($data['email'] ?? ''));
$subject  = trim((string) ($data['subject'] ?? ''));
$message  = trim((string) ($data['message'] ?? ''));
$honeypot = trim((string) ($data['honeypot'] ?? ''));

// Honeypot: pretend success for bots
if ($honeypot !== '') {
    respond(200, ['success' => true, 'message' => 'Message sent successfully.']);
}

if (mb_strlen($name) < 2)                          respond(400, ['success' => false, 'error' => 'Name must be at least 2 characters']);
if (!filter_var($email, FILTER_VALIDATE_EMAIL))    respond(400, ['success' => false, 'error' => 'Invalid email address']);
if (mb_strlen($subject) < 3)                       respond(400, ['success' => false, 'error' => 'Subject must be at least 3 characters']);
if (mb_strlen($message) < 10)                      respond(400, ['success' => false, 'error' => 'Message must be at least 10 characters']);
if (mb_strlen($name) > 120 || mb_strlen($subject) > 200 || mb_strlen($message) > 5000) {
    respond(400, ['success' => false, 'error' => 'Message is too long.']);
}

// Strip line breaks from header-bound values (prevents header injection)
$clean = fn(string $v): string => str_replace(["\r", "\n"], ' ', $v);
$name = $clean($name);
$subject = $clean($subject);
$e = fn(string $v): string => htmlspecialchars($v, ENT_QUOTES, 'UTF-8');

$mailSubject = "[Portfolio Contact] {$subject} - from {$name}";
$text = "Name: {$name}\nEmail: {$email}\nSubject: {$subject}\n\nMessage:\n{$message}";
$html = '
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #0A2218; background-color: #F3EBDD;">
    <h2 style="color: #123D2B; border-bottom: 2px solid #C98A4B; padding-bottom: 8px;">New Contact Inquiry from Portfolio</h2>
    <p><strong>Name:</strong> ' . $e($name) . '</p>
    <p><strong>Email:</strong> ' . $e($email) . '</p>
    <p><strong>Subject:</strong> ' . $e($subject) . '</p>
    <hr style="border: 0; border-top: 1px solid #2F6B4F; margin: 20px 0;" />
    <h3 style="color: #123D2B;">Message:</h3>
    <p style="white-space: pre-wrap; background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E8DCC4;">' . $e($message) . '</p>
    <footer style="margin-top: 30px; font-size: 12px; color: #2F6B4F;">Sent via hassan.technestnova.com</footer>
  </div>';

$sent = false;

// ---------- Option 1: Resend API ----------
if (!empty($config['resend_api_key']) && function_exists('curl_init')) {
    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $config['resend_api_key'],
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS     => json_encode([
            'from'     => $config['from_email'],
            'to'       => [$config['to_email']],
            'reply_to' => $email,
            'subject'  => $mailSubject,
            'html'     => $html,
            'text'     => $text,
        ]),
    ]);
    curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $sent = $code >= 200 && $code < 300;
}

// ---------- Option 2: hosting mail() ----------
if (!$sent) {
    // mail() must send from our own domain (e.g. never from resend.dev)
    $mailFrom = stripos($config['from_email'], '@technestnova.com') !== false
        ? $config['from_email']
        : 'Portfolio <hassan@technestnova.com>';
    $boundary = 'b' . bin2hex(random_bytes(8));
    $headers  = [
        'From: ' . $mailFrom,
        'Reply-To: ' . $clean($email),
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    ];
    $body = "--{$boundary}\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n{$text}\r\n"
          . "--{$boundary}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n{$html}\r\n"
          . "--{$boundary}--";
    $sent = @mail(
        $config['to_email'],
        '=?UTF-8?B?' . base64_encode($mailSubject) . '?=',
        $body,
        implode("\r\n", $headers)
    );
}

if (!$sent) {
    respond(500, ['success' => false, 'error' => 'An error occurred while sending message.']);
}

respond(200, ['success' => true, 'message' => 'Your message has been received. Thank you!']);
