# Deploying hassan.technestnova.com (Namecheap shared hosting)

The site is a static export. `contact.php` handles the contact form on the server.

## Update the live site (automatic)
Push to the `main` branch on GitHub. The workflow in `.github/workflows/deploy.yml` builds the site and uploads the changed files, usually within 2–3 minutes. You can watch progress in the repo's **Actions** tab, or re-run a deploy there with **Run workflow**.

It needs three repository secrets: `FTP_SERVER` (`premium204.web-hosting.com`), `FTP_USERNAME`, and `FTP_PASSWORD`. The FTP account's directory must be `hassan.technestnova.com`.

## Manual fallback
1. `npm run build`. This writes the finished site to the `out/` folder.
2. Zip the **contents** of `out/`, including the hidden `.htaccess` file.
3. cPanel → File Manager → `hassan.technestnova.com` folder → Upload the zip → Extract (overwrite) → delete the zip.

## Contact form
- Messages go to `hafizhassanmehmood444@gmail.com`, sent from `hassan@technestnova.com`.
- To change these, or to send through Resend instead, create `hassan-contact-config.php` **one level above** the site folder (so it is never public):

```php
<?php return [
  'to_email'       => 'hafizhassanmehmood444@gmail.com',
  'from_email'     => 'Portfolio <hassan@technestnova.com>',
  'resend_api_key' => '', // optional, e.g. 're_xxx' (domain must be verified in Resend)
];
```

- The form only works on the live server. `npm run dev` has no PHP, so submitting locally shows a network error.
