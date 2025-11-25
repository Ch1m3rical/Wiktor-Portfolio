# React Portfolio (Vite)

## Development

```bash
npm install
npm run dev
```

To preview on other devices in your network, run `npm run dev -- --host 0.0.0.0`.

## Building

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages

1. Decide whether the repository is a **user / organization site** (`username.github.io`) or a **project site** (anything else).  
   - User/organization site → keep `VITE_BASE_PATH=/`.  
   - Project site → set `VITE_BASE_PATH=/your-repo-name/`.
2. Copy `.env.production.example` to `.env.production` and set the `VITE_BASE_PATH` value accordingly. This ensures Vite builds assets with the right public path.
3. Choose a deploy method:
   - **Manual**: run `npm run deploy`. The script builds and pushes the `dist/` folder to the `gh-pages` branch via the `gh-pages` CLI.
   - **Automatic**: push to the default branch and let the included GitHub Actions workflow (`.github/workflows/deploy.yml`) build + publish to Pages.

After the first deployment, enable GitHub Pages in your repository settings (build from “GitHub Actions”) and you’ll receive the published URL.
