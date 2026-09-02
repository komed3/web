export interface Config {
  projects: Array< {
    id: string;
    title?: string;
    type: string;
    desc?: string;
    tags?: string[];
    link?: string;
    github?: string;
    content?: string;
    status?: string;
    meta?: {
      stars?: number;
      license?: string;
      langs?: string[];
      year?: number;
      version?: string;
    };
  } >;
}

export interface Org {
  title: string;
  desc: string;
  tags: string[];
  link?: string;
  meta: {
    stars: number;
    langs: string[];
    repos: number;
  };
}

export interface Repo {
  title: string;
  desc: string;
  tags: string[];
  link?: string;
  content?: string;
  meta: {
    stars: number;
    license?: string;
    langs: string[];
    year: number;
    version?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  type: string;
  desc?: string;
  tags?: string[];
  link?: string;
  github?: string;
  content?: string;
  status?: string;
  meta: {
    stars?: number;
    license?: string;
    langs?: string[];
    year?: number;
    version?: string;
    repos?: number;
  };
}
