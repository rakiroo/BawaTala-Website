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
https://drive.google.com/uc?export=download&id=1Df-ZsShPj6qlQ-H5uWXMkdP-pU9xkrPB
```

The secondary Drive button opens the file preview:

```text
https://drive.google.com/file/d/1Df-ZsShPj6qlQ-H5uWXMkdP-pU9xkrPB/view?usp=drive_link
```

If you later publish to Google Play or another host, replace the download URL in `index.html` and `script.js`.

## Publishing

This folder has no build step. You can deploy it as static files on GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any regular web host.
