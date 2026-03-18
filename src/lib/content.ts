import yaml from 'js-yaml';

export interface SiteData {
  hero: {
    firstName: string;
    lastName: string;
    role: string;
    location: string;
    resumeUrl: string;
    status: string;
    statement: string;
    tags: Array<{ label: string; val: string }>;
  };
  approach: {
    headline: string;
    body: string;
  };
  projects: Array<{
    title: string;
    description: string;
    tags: string[];
    image: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    location: string;
    description: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    duration: string;
    location: string;
    details?: string;
  }>;
  skills: Array<{
    name: string;
    iconType: string;
    lib: 'si' | 'fa' | 'io5';
    color: string;
  }>;
}

export const fetchSiteData = async (): Promise<SiteData> => {
  const response = await fetch('/site-content.md');
  const text = await response.text();
  const parts = text.split('---').filter(Boolean);
  const yamlContent = parts[0]; // First significant block should be our YAML
  return yaml.load(yamlContent) as SiteData;
};

