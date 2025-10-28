import siteConfig from './site.config';

export function getActiveTemplate(): 'base' | 'modern' | 'minimal' | 'gradient' | 'dark' | 'playful' | 'professional' | 'portfolio' | 'tech' {
  return siteConfig.template;
}

export default getActiveTemplate();

