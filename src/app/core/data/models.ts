import { IconName } from '@shared/ui/icon/icons';

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

export interface Trend {
  tag: string;
  posts: string;
}

export interface Community {
  id: string;
  name: string;
  members: string;
  hue: number;
  topic: string;
}
