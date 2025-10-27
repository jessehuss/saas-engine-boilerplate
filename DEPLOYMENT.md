# Deployment Guide

This guide covers deploying the Agency SaaS Boilerplate to Cloudflare Pages using GitHub Actions.

## Prerequisites

- A GitHub account with the repository pushed
- A Cloudflare account
- Environment variables ready (see `.env.template`)

## Cloudflare Pages Setup

### Option 1: GitHub Actions (Recommended)

This method uses GitHub Actions to automatically build and deploy to Cloudflare Pages on every push.

#### Step 1: Get Cloudflare Credentials

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Find your **Account ID**:
   - Look at the right sidebar in your dashboard
   - It's a string like `abc123def456...`
3. Create an **API Token**:
   - Go to "My Profile" → "API Tokens"
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template or create custom token with:
     - Permissions: `Cloudflare Pages:Edit`
     - Account Resources: Include - All accounts (or specific account)
   - Click "Continue to summary" → "Create Token"
   - Copy the token immediately (you won't see it again)

#### Step 2: Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
2. Click "Create a project"
3. Choose "Connect to Git"
4. Connect your GitHub account
5. Select your repository
6. Click "Begin setup"
7. Configure:
   - **Project name**: Choose a name for your project
   - **Production branch**: `main` (or `master`)
8. Click "Save and Deploy"
9. Note the project name you chose (you'll need it for the secrets)

#### Step 3: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click "New repository secret" and add:

   **Secret 1: CLOUDFLARE_API_TOKEN**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: The API token you created in Step 1

   **Secret 2: CLOUDFLARE_ACCOUNT_ID**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: Your Account ID from Step 1

   **Secret 3: CLOUDFLARE_PROJECT_NAME**
   - Name: `CLOUDFLARE_PROJECT_NAME`
   - Value: The project name you chose in Step 2

#### Step 4: Configure Environment Variables

1. In Cloudflare Dashboard → Pages → Your Project
2. Go to **Settings** → **Environment variables**
3. Add the following variables from your `.env` file:
   - `RESEND_API_KEY` (required for contact forms)
   - `FROM_EMAIL` (required for contact forms)
   - `TO_EMAIL` (required for contact forms)
   - `NODE_VERSION=18` (optional, for build environment)

#### Step 5: Deploy

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Configure Cloudflare Pages"
   git push origin main
   ```

2. Check deployment:
   - Go to GitHub → Your repository → **Actions** tab
   - You should see a workflow run called "Deploy to Cloudflare Pages"
   - Wait for it to complete (usually 2-3 minutes)
   - Check for any errors

3. Verify:
   - Go to Cloudflare Dashboard → Pages
   - Your project should show the latest deployment
   - Click on it to view the preview URL

### Option 2: Direct Cloudflare Integration (Alternative)

If you prefer to let Cloudflare handle the builds directly:

1. Go to Cloudflare Dashboard → Pages
2. Create a new project from Git
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)
   - **Node version**: `18`

4. Add environment variables as described in Option 1, Step 4

5. Deploy by pushing to your main branch

## Environment Variables

All environment variables must be added to Cloudflare Pages:

### Required for Contact Forms

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=contact@yourdomain.com
```

### Optional

```env
NODE_VERSION=18
```

## Custom Domain Setup

1. In Cloudflare Dashboard → Pages → Your Project → **Custom domains**
2. Click "Set up a custom domain"
3. Enter your domain (e.g., `example.com`)
4. Cloudflare will automatically configure DNS records
5. Wait for DNS propagation (can take up to 24 hours, usually much faster)

## Monitoring Deployments

### GitHub Actions

- Check the **Actions** tab in your GitHub repository
- Click on a workflow run to see detailed logs
- Green checkmark = successful deployment
- Red X = deployment failed

### Cloudflare Dashboard

- Go to Cloudflare Dashboard → Pages → Your Project
- View deployment history
- See build logs
- Rollback to previous deployments if needed

## Troubleshooting

### Build Fails in GitHub Actions

**Error: Missing secrets**
- Ensure all three secrets are added: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_PROJECT_NAME`

**Error: API token invalid**
- Regenerate the API token in Cloudflare
- Update the `CLOUDFLARE_API_TOKEN` secret in GitHub

**Error: Project not found**
- Verify the project name in `CLOUDFLARE_PROJECT_NAME` matches exactly
- Check that the project exists in your Cloudflare account

### Contact Form Not Working

- Verify environment variables are set in Cloudflare Pages
- Check that your Resend API key is valid
- Ensure email addresses are verified in Resend
- Check browser console for errors
- Review Cloudflare Pages build logs

### Build Errors

```bash
# Test build locally first
npm run build
```

If local build works but Cloudflare fails:
- Check build logs in Cloudflare Dashboard
- Ensure Node version is correct
- Verify all dependencies are in package.json

### Deployment Status

To check deployment status in Cloudflare:
1. Go to your project in Cloudflare Dashboard
2. Click on a deployment
3. Check "Build logs" for errors
4. View "Preview" to test the deployed site

## Rollback

To rollback to a previous deployment in Cloudflare:

1. Go to Cloudflare Dashboard → Pages → Your Project
2. Find the deployment you want to restore
3. Click the three dots menu
4. Select "Retry deployment" or "Promote to production"

## CI/CD Workflow

The GitHub Actions workflow triggers on:
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch
- Manual workflow dispatch

To manually trigger a deployment:
1. Go to GitHub repository → Actions tab
2. Select "Deploy to Cloudflare Pages" workflow
3. Click "Run workflow"
4. Choose the branch
5. Click "Run workflow"

## Production Checklist

- [ ] Environment variables configured in Cloudflare
- [ ] Resend API key is valid
- [ ] Test contact form works
- [ ] Test blog posts load correctly
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] SEO meta tags updated
- [ ] Analytics configured (if applicable)

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cloudflare API Reference](https://developers.cloudflare.com/api/)

