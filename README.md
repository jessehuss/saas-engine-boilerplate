# Agency SaaS Boilerplate

A production-ready boilerplate for small web agency SaaS projects built with Astro, TailwindCSS, Decap CMS, and deployed on Cloudflare Pages.

## Features

- **9 Unique Templates**: base, modern, minimal, gradient, dark, playful, professional, portfolio, and tech templates
- **Dynamic Theme System**: Configure colors, branding, and content via config files
- **Content Management**: Decap CMS for easy content editing
- **Blog System**: Markdown-based blog with content collections
- **Contact Forms**: SMTP-enabled contact forms using Resend
- **Zero Server Dependencies**: Deploys to Cloudflare Pages
- **Production Ready**: TypeScript, SEO, accessibility, mobile-first

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Resend account (for email) or SMTP credentials
- GitHub account (for Decap CMS)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd agency-saas-boilerplate

# Install dependencies
npm install

# Copy environment template
cp env.template .env

# Edit .env with your credentials
nano .env
```

### Configuration

1. **Edit Site Config** (`src/config/site.config.ts`):
   - Update site name, logo, colors
   - Configure navigation
   - Add hero, services, and about content
   - Select template (base, modern, minimal, gradient, dark, playful, professional, portfolio, or tech)

2. **Configure Email** (`.env`):
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
   FROM_EMAIL=noreply@yourdomain.com
   TO_EMAIL=contact@yourdomain.com
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

Visit `http://localhost:4321` to see your site.

## Client Setup

### For a New Client

1. **Update Site Configuration**
   - Edit `src/config/site.config.ts`
   - Replace colors with client's brand colors
   - Update site name and contact info
   - Add client-specific services

2. **Replace Logo**
   - Add logo to `public/assets/logos/`
   - Update logo path in `site.config.ts`

3. **Update Content**
   - Edit hero section content
   - Update services list
   - Modify about section

4. **Choose Template**
   - Set `template: "modern"` (options: "base", "modern", "minimal", "gradient", "dark", "playful", "professional", "portfolio", "tech")
   - Each template has a distinct aesthetic

### Template Switching

Edit `template` in `src/config/site.config.ts`:

```typescript
template: "modern" // Options: "base", "modern", "minimal", "gradient", "dark", "playful", "professional", "portfolio", "tech"
```

Then rebuild:
```bash
npm run build
```

### Rebranding

Colors are controlled via site config:

```typescript
primaryColor: "#2F855A",    // Main brand color
secondaryColor: "#38B2AC",  // Secondary accent
accentColor: "#ED8936",     // Highlight color
```

These are injected as CSS variables at build time.

## Content Management

### Decap CMS Setup

1. **Access the CMS**:
   Visit `/admin` on your live site

2. **Recommended: Use DecapBridge** (Easiest for client access):
   - Sign up at https://decapbridge.com
   - Create a site and link your GitHub repository
   - Update `public/admin/config.yml` with your DecapBridge credentials
   - See [CMS_SETUP.md](./CMS_SETUP.md) for detailed setup instructions

3. **Alternative Authentication Options**:
   See [CMS_SETUP.md](./CMS_SETUP.md) for GitHub OAuth and other authentication methods

4. **Editing Content**:
   - Navigate to `/admin`
   - Authenticate with your chosen method (DecapBridge, GitHub, etc.)
   - Edit content via the collections:
     - **Blog Posts**: Create, edit, or delete blog entries
     - **Services**: Manage your service offerings
     - **Site Settings**: Update hero, about, navigation, and social media sections
   - Changes are committed to GitHub

### Adding Blog Posts

**Via CMS**:
1. Go to `/admin`
2. Click "New Blog Post"
3. Fill in details
4. Save

**Manually**:
1. Create new `.md` file in `src/content/blog/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: 2024-01-15
   description: "Post description"
   author: "Author Name"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Add content below frontmatter

## Contact Form

### Setup

1. **Get Resend API Key**:
   - Sign up at https://resend.com
   - Create API key
   - Add to `.env`:
     ```env
     RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
     ```

2. **Configure Recipients**:
   ```env
   FROM_EMAIL=noreply@yourdomain.com
   TO_EMAIL=contact@yourdomain.com
   ```

### Testing

1. Visit `/contact`
2. Fill out form
3. Submit
4. Check email inbox

## Deployment

> **Detailed Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions.

### Cloudflare Pages (GitHub Actions)

The project includes automatic deployment to Cloudflare Pages via GitHub Actions.

#### Setup Instructions

1. **Get Cloudflare Credentials**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to "My Profile" → "API Tokens"
   - Create a new token with these permissions:
     - `Cloudflare Pages:Edit`
     - Read access to your account

2. **Add GitHub Secrets**:
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
     - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID (found in dashboard)
     - `CLOUDFLARE_PROJECT_NAME`: Your Cloudflare Pages project name

3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Monitor Deployment**:
   - Check the "Actions" tab in your GitHub repository
   - The workflow will automatically build and deploy on push to main
   - View deployment status in Cloudflare Dashboard

5. **Add Environment Variables**:
   - In Cloudflare Dashboard → Pages → Your Project → Settings
   - Add all variables from `.env`:
     - `RESEND_API_KEY`
     - `FROM_EMAIL`
     - `TO_EMAIL`
     - Any other required variables

6. **Custom Domain** (optional):
   - In Cloudflare Pages settings, add custom domain
   - Update DNS records as instructed

### Alternative: Direct Cloudflare Pages Integration

You can also use Cloudflare Pages' native Git integration:

1. **Connect to Cloudflare**:
   - Go to Cloudflare Dashboard → Pages
   - Create new project from Git
   - Connect your GitHub repository

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Build output: `dist`
   - Node version: 18

3. **Add Environment Variables**:
   - Go to project settings
   - Add all variables from `.env`

4. **Custom Domain** (optional):
   - In Pages settings, add custom domain
   - Update DNS records as instructed

### Build Process

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
astro-agency/
├── templates/              # Template system
│   ├── base/              # Base template
│   ├── modern/            # Modern bright template
│   ├── minimal/           # Minimal typography template
│   ├── gradient/          # Gradient & glassmorphism template
│   ├── dark/             # Dark mode with neon accents
│   ├── playful/           # Playful rounded template
│   ├── professional/      # Professional corporate template
│   ├── portfolio/         # Creative portfolio template
│   └── tech/             # Tech-forward modern template
├── src/
│   ├── components/        # Shared components
│   ├── config/           # Site & template config
│   ├── content/          # Content (blog posts)
│   ├── lib/              # Utilities
│   └── pages/            # Routes
├── public/               # Static assets
│   ├── admin/           # Decap CMS UI and config
│   └── assets/          # Images, logos, uploads
├── wrangler.toml        # Cloudflare Pages configuration
├── vercel.json          # Vercel deployment config (optional)
├── netlify.toml         # Netlify deployment config (optional)
└── package.json
```

## Templates

### Base Template
- Clean, professional design
- Balanced layout
- Suitable for most businesses

### Modern Template
- Vibrant colors, gradients
- Large hero sections
- Bold typography
- Best for creative agencies

### Minimal Template
- Typography-focused
- Lots of whitespace
- Muted colors
- Perfect for portfolios

### Gradient Template
- Bold gradient backgrounds
- Glassmorphism effects
- Floating animations
- Best for modern creative brands

### Dark Template
- Dark mode design
- Neon accent colors
- Glow effects
- Sleek and professional

### Playful Template
- Rounded corners everywhere
- Fun animations
- Colorful and energetic
- Friendly and approachable

### Professional Template
- Clean, corporate aesthetic
- Navy blue, slate, and gold palette
- Professional typography (Playfair Display)
- Suitable for business and consulting

### Portfolio Template
- Modern, creative showcase design
- Purple, teal, and coral colors
- Bold typography (Outfit)
- Perfect for creative portfolios

### Tech Template
- Sleek, futuristic design
- Electric blue, cyan, and purple accents
- Monospace fonts (JetBrains Mono)
- Tech-forward aesthetic

## Development

### Adding a New Template

1. Create folder in `templates/your-template`
2. Add `theme.config.ts` with colors
3. Create `layouts/BaseLayout.astro`
4. Create components: `Header`, `Footer`, `Hero`, `Services`, `About`
5. Add styles in `styles/your-template.css`
6. Update `src/config/site.config.ts` to add template option

### Adding Pages

Create new `.astro` files in `src/pages/`:
- `about.astro` → `/about`
- `services.astro` → `/services`
- `team.astro` → `/team`

### Styling

- Global styles: Import template CSS in layout
- Component styles: Use Tailwind classes
- Custom styles: Add to template CSS file
- Responsive: Mobile-first approach

## Troubleshooting

### Decap CMS Not Loading

- Check `public/admin/config.yml` configuration
- Verify DecapBridge or authentication setup
- Ensure repo is accessible
- Check browser console for errors
- See [CMS_SETUP.md](./CMS_SETUP.md) for troubleshooting

### Contact Form Not Sending

- Verify Resend API key in Cloudflare Pages environment variables
- Check that TO_EMAIL, FROM_EMAIL, and RESEND_API_KEY are all set
- Review Cloudflare Pages function logs for errors
- Ensure your Resend domain is verified

### Build Errors

- Run `npm run build` to see full errors
- Check for TypeScript errors
- Verify all imports
- Ensure content files exist

### Template Not Switching

- Clear `.astro` cache
- Rebuild project
- Check template path in config
- Verify template files exist

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - feel free to use for client projects.

## Support

For issues and questions:
- GitHub Issues: [your-repo]/issues
- Documentation: [your-docs-site]

---

Built with [Astro](https://astro.build) and [Decap CMS](https://decapcms.org)

