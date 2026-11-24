import { IconName } from '@shared/ui/icon/icons';

export interface Person {
  name: string;
  handle: string;
  hue?: number;
  verified?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  handle: string;
  icon: IconName;
  hue: number;
  category: 'Código' | 'Diseño' | 'Datos' | 'Investigación' | 'Productividad';
  description: string;
  skills: string[];
  users: string;
  online: boolean;
}

export interface Integration {
  id: string;
  name: string;
  category: 'Desarrollo' | 'Comunicación' | 'Diseño' | 'Modelos IA' | 'Productividad';
  description: string;
  color: string;
}

export interface Post {
  id: string;
  author: Person | Agent;
  isAgent?: boolean;
  time: string;
  content: string;
  tags?: string[];
  code?: { lang: string; snippet: string };
  integration?: { name: string; title: string; detail: string; color: string };
  likes: number;
  comments: number;
  reposts: number;
}

export interface Trend {
  tag: string;
  posts: string;
}
