export type SiteConfig = {
  siteName: string;
  tagline?: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  contactEmail: string;
  domain: string;
  showBlog: boolean;
  template: 'base' | 'modern' | 'minimal' | 'gradient' | 'dark' | 'playful' | 'professional' | 'portfolio' | 'tech';
  nav: Array<{ label: string; href: string }>;
  social?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  hero?: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
  };
  services?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  about?: {
    title: string;
    description: string;
    image?: string;
  };
};

const siteConfig: SiteConfig = {
  siteName: "Acme Landscaping",
  tagline: "Beautiful landscapes that grow with you",
  logo: "/assets/logos/acme.svg",
  primaryColor: "#2F855A",
  secondaryColor: "#38B2AC",
  accentColor: "#ED8936",
  contactEmail: "info@acmelandscaping.ca",
  domain: "acmelandscaping.ca",
  showBlog: true,
  template: "base",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" }
  ],
  social: {
    twitter: "https://twitter.com/acmelandscaping",
    facebook: "https://facebook.com/acmelandscaping",
    instagram: "https://instagram.com/acmelandscaping"
  },
  hero: {
    headline: "Transform Your Outdoor Space",
    subheadline: "Professional landscaping services that enhance your property's beauty and value",
    ctaText: "Get Started",
    ctaLink: "/contact"
  },
  services: [
    {
      title: "Lawn Care",
      description: "Regular maintenance to keep your lawn looking pristine all year round",
      icon: "🌱"
    },
    {
      title: "Garden Design",
      description: "Custom garden designs tailored to your space and preferences",
      icon: "🌿"
    },
    {
      title: "Tree Services",
      description: "Tree planting, trimming, and removal services by certified arborists",
      icon: "🌳"
    },
    {
      title: "Hardscaping",
      description: "Patios, walkways, and retaining walls to complete your landscape",
      icon: "🪨"
    }
  ],
  about: {
    title: "Your Trusted Landscaping Partners",
    description: "With over 15 years of experience, Acme Landscaping has been transforming outdoor spaces across the region. We combine expertise, quality materials, and attention to detail to deliver results that exceed expectations.",
    image: "/assets/images/about.jpg"
  }
};

export default siteConfig;

