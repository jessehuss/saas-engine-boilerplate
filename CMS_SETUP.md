# CMS Setup Guide

## Recommended: DecapBridge (Easiest for Client Access)

DecapBridge provides email-based authentication without requiring GitHub accounts. Perfect for client access!

### Setup Steps:

1. **Sign up** at [https://decapbridge.com](https://decapbridge.com)
2. **Create a Site** in DecapBridge
3. **Link your GitHub repository**
4. **Copy the generated config** or use the bridge URL provided
5. **Update** `public/admin/config.yml` with your bridge URL:
   ```yaml
   backend:
     name: github
     repo: your-username/your-repo
     branch: main
     auth_endpoint: https://your-site.decapbridge.com/auth
   ```

### Client Experience:
- ✅ No GitHub account needed
- ✅ Login with Google, Microsoft, or email/password
- ✅ You can invite clients via email
- ✅ Simple user management
- ✅ Works on any hosting (Cloudflare, Vercel, Netlify)

---

## Alternative: GitHub OAuth

If you prefer direct GitHub authentication:

1. Create a GitHub App at: https://github.com/settings/apps/new
2. Set callback URL to: `https://api.netlify.com/auth/done`
3. Update `public/admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: your-username/your-repo
     branch: main
     auth_type: oauth
     app_id: your-github-app-id
     api_root: https://api.github.com
   ```

### Client Experience:
- ⚠️ Clients must have a GitHub account
- ⚠️ Must approve your GitHub App
- ✅ Full edit history and version control

---

## Alternative: Netlify Identity

If deploying to Netlify:

1. Enable Netlify Identity in your Netlify dashboard
2. Update `public/admin/config.yml`:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```

### Client Experience:
- ✅ No GitHub account needed
- ✅ Email/password or OAuth login
- ✅ Simple user management in Netlify dashboard
- ❌ Netlify-only (won't work on Cloudflare/Vercel)

---

## Recommendation

For a client-friendly SaaS engine, **use DecapBridge** - it's the easiest solution for inviting clients and managing content without requiring technical accounts.

