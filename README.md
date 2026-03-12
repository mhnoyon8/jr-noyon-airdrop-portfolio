# Jr Noyon — Crypto Airdrop Portfolio (Next.js 14)

Production-ready dark-theme portfolio for a Crypto Airdrop Hunter.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Run locally
```bash
npm install
npm run dev
```
Open: `http://localhost:3000`

## Build
```bash
npm run build
npm run start
```

## Folder structure
```text
jr-noyon-airdrop-portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── favicon.svg
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Customization
- Colors: `tailwind.config.ts`
- Content/sections: `app/page.tsx`
- SEO/OG/icons: `app/layout.tsx`

## Vercel Deployment Guide
1. Push repo to GitHub.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `next build` (default)
5. Output: auto
6. Click **Deploy**.

### After deploy
- Add custom domain (optional): Project Settings → Domains.
- Re-deploy on each push (enabled by default).

## Notes
- Replace placeholders (contact links, stats, articles, testimonials).
- Keep crypto-risk disclaimer in footer.
