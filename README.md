# Bawat Tala Website

Standalone static website for the Bawat Tala app fandom, advertising, and download page.

## Files

- `index.html` is the full website.
- `styles.css` contains the responsive design.
- `script.js` handles the mobile menu and rotating community quote.
- `assets/images/` contains copied Bawat Tala app artwork.
- `downloads/` is where the release app file should go.

## App Download

The download button points to:

```text
downloads/BawatTala.apk
```

When you have the Android build, place the APK there with that filename. If you later publish to Google Play or another host, replace the `href` on the download button in `index.html`.

## Publishing

This folder has no build step. You can deploy it as static files on GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any regular web host.
