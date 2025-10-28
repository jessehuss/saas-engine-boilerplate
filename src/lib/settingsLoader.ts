import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

function loadYamlFile(filename: string): any {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'settings', filename);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return yaml.load(fileContents);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return null;
  }
}

export function getHeroSettings() {
  return loadYamlFile('hero.yml');
}

export function getAboutSettings() {
  return loadYamlFile('about.yml');
}

export function getNavigationSettings() {
  return loadYamlFile('navigation.yml');
}

export function getSocialSettings() {
  return loadYamlFile('social.yml');
}

