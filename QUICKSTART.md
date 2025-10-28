# Quick Start Guide

Get your boilerplate up and running in minutes.

## Installation

```bash
npm install
```

## Configuration

### 1. Environment Variables

Copy `env.template` to `.env`:

```bash
cp env.template .env
```

Edit `.env` with your credentials:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=contact@yourdomain.com
```

### 2. Site Configuration

Edit `src/config/site.config.ts`:

- Update `siteName` to your client's name
- Change `logo` path to your logo
- Set brand colors (`primaryColor`, `secondaryColor`)
- Add your navigation items
- Configure hero section, services, and about content
- Select template: `"base"`, `"modern"`, `"minimal"`, `"gradient"`, `"dark"`, `"playful"`, `"professional"`, `"portfolio"`, or `"tech"`

### 3. Replace Logo

Add your logo to `public/assets/logos/your-logo.svg`

Update the logo path in `site.config.ts`:

```typescript
logo: "/assets/logos/your-logo.svg"
```

## Running

```bash
npm run dev
```

Visit `http://localhost:4321`

## Building

```bash
npm run build
```

Output goes to `dist/`

## Deployment

### Cloudflare Pages

1. Push to GitHub
2. Connect Cloudflare Pages to your repo
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables

### Alternative: Vercel

```bash
npm i -g vercel
vercel
```

### Alternative: Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

## Next Steps

- Add your content via Decap CMS at `/admin`
- Customize templates in `templates/`
- Add more pages in `src/pages/`
- Configure SMTP for contact forms

## Support

See `README.md` for detailed documentation.

