import siteConfig from './site.config';

export function getActiveTemplate(): 'base' | 'modern' | 'minimal' {
  return siteConfig.template;
}

export default getActiveTemplate();

