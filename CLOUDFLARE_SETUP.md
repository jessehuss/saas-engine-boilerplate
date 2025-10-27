# Quick Start: Cloudflare Pages Deployment

This is a quick reference for setting up automatic GitHub deployments to Cloudflare Pages.

## What's Included

✅ GitHub Actions workflow (`.github/workflows/cloudflare-pages.yml`)
✅ Automatic deployment on push to main/master
✅ Configurable via GitHub Secrets
✅ Detailed documentation in `DEPLOYMENT.md`

## Quick Setup (5 minutes)

### 1. Get Cloudflare Credentials

Go to [Cloudflare Dashboard](https://dash.cloudflare.com/):
1. Note your **Account ID** (right sidebar)
2. Create an **API Token**:
   - My Profile → API Tokens → Create Token
   - Use "Edit Cloudflare Workers" template
   - Copy the token (shown only once)

### 2. Create Cloudflare Pages Project

1. Cloudflare Dashboard → Pages → Create a project
2. Connect to GitHub → Select your repository
3. Configure:
   - Project name: `your-project-name`
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output: `dist`
4. Save and deploy
5. Note your project name

### 3. Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions:

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `CLOUDFLARE_API_TOKEN` | Your API token | Step 1 above |
| `CLOUDFLARE_ACCOUNT_ID` | Your Account ID | Cloudflare Dashboard sidebar |
| `CLOUDFLARE_PROJECT_NAME` | Your project name | Step 2 above |

### 4. Add Environment Variables in Cloudflare

In Cloudflare Pages → Your Project → Settings → Environment variables:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=contact@yourdomain.com
```

### 5. Push and Deploy

```bash
git add .
git commit -m "Add Cloudflare Pages deployment"
git push origin main
```

Check deployment status:
- GitHub: Actions tab
- Cloudflare: Pages → Your project

## Troubleshooting

**Build fails with "project not found"**
- Verify `CLOUDFLARE_PROJECT_NAME` secret matches your project name exactly

**Build fails with authentication error**
- Regenerate API token and update `CLOUDFLARE_API_TOKEN` secret

**Contact form doesn't work**
- Ensure environment variables are set in Cloudflare Pages settings

## Next Steps

- [ ] Add custom domain in Cloudflare Pages settings
- [ ] Configure DNS records for custom domain
- [ ] Test contact form functionality
- [ ] Set up production environment variables
- [ ] Review deployment logs in Cloudflare Dashboard

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

