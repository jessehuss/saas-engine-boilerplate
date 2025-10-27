import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import siteConfig from '../config/site.config';

export async function loadLayout(layoutName: string): Promise<AstroComponentFactory> {
  const template = siteConfig.template;
  const module = await import(`../../templates/${template}/layouts/${layoutName}.astro`);
  return module.default;
}

export async function loadComponent(componentName: string): Promise<AstroComponentFactory> {
  const template = siteConfig.template;
  const module = await import(`../../templates/${template}/components/${componentName}.astro`);
  return module.default;
}

export function getTemplatePath(): string {
  return `../../templates/${siteConfig.template}`;
}

