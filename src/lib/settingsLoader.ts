import heroRaw from '../content/settings/hero.yml';
import aboutRaw from '../content/settings/about.yml';
import navigationRaw from '../content/settings/navigation.yml';
import socialRaw from '../content/settings/social.yml';
import yaml from 'js-yaml';

// Parse YAML content (already loaded as string by Vite plugin)
function parseYaml(raw: string): any {
  if (!raw) return null;
  try {
    return yaml.load(raw);
  } catch (error) {
    console.error('Error parsing YAML:', error);
    return null;
  }
}

export function getHeroSettings() {
  return parseYaml(heroRaw);
}

export function getAboutSettings() {
  return parseYaml(aboutRaw);
}

export function getNavigationSettings() {
  return parseYaml(navigationRaw);
}

export function getSocialSettings() {
  return parseYaml(socialRaw);
}
