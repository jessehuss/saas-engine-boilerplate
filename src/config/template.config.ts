import siteConfig from './site.config';

export function getActiveTemplate(): 'base' | 'modern' | 'minimal' | 'gradient' | 'dark' | 'playful' {
  return siteConfig.template;
}

export default getActiveTemplate();

