import { Agent, Integration, Person, Post, Trend } from './models';

// Datos de ejemplo para la plantilla. Sustitúyelos por llamadas a tu API.

export const CURRENT_USER: Person = { name: 'Alex Rivera', handle: 'alex', hue: 262 };

export const AGENTS: Agent[] = [
  {
    id: 'nexus',
    name: 'Nexus',
    handle: 'nexus',
    icon: 'network',
    hue: 258,
    category: 'Productividad',
    description: 'Orquestador central: entiende tu intención y coordina al resto de agentes.',
    skills: ['Orquestación', 'Memoria', 'Planificación'],
    users: '128k',
    online: true,
  },
  {
    id: 'forja',
    name: 'Forja',
    handle: 'forja',
    icon: 'code',
    hue: 200,
    category: 'Código',
    description: 'Revisa PRs, genera tests y propone refactors en tus repositorios.',
    skills: ['TypeScript', 'Code review', 'CI/CD'],
    users: '94k',
    online: true,
  },
  {
    id: 'prisma',
    name: 'Prisma',
    handle: 'prisma',
    icon: 'palette',
    hue: 320,
    category: 'Diseño',
    description: 'Convierte ideas en interfaces, sistemas de diseño y prototipos.',
    skills: ['UI', 'Design tokens', 'Figma'],
    users: '61k',
    online: true,
  },
  {
    id: 'atlas',
    name: 'Atlas',
    handle: 'atlas',
    icon: 'database',
    hue: 160,
    category: 'Datos',
    description: 'Consulta tus fuentes de datos en lenguaje natural y crea dashboards.',
    skills: ['SQL', 'Visualización', 'ETL'],
    users: '47k',
    online: false,
  },
  {
    id: 'eco',
    name: 'Eco',
    handle: 'eco',
    icon: 'globe',
    hue: 30,
    category: 'Investigación',
    description: 'Investiga, resume papers y mantiene al día a tu comunidad.',
    skills: ['Búsqueda', 'Resúmenes', 'Citas'],
    users: '39k',
    online: true,
  },
  {
    id: 'pulso',
    name: 'Pulso',
    handle: 'pulso',
    icon: 'zap',
    hue: 50,
    category: 'Productividad',
    description: 'Automatiza flujos entre tus herramientas y te avisa de lo importante.',
    skills: ['Automatización', 'Alertas', 'Workflows'],
    users: '33k',
    online: false,
  },
];

export const INTEGRATIONS: Integration[] = [
  {
    id: 'github',
    name: 'GitHub',
    category: 'Desarrollo',
    description: 'Repos, PRs e issues en tu feed.',
    color: '#6e5494',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'Desarrollo',
    description: 'Pipelines y merge requests.',
    color: '#fc6d26',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Desarrollo',
    description: 'Despliegues y previews al instante.',
    color: '#111111',
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Comunicación',
    description: 'Comparte y recibe desde tus canales.',
    color: '#4a154b',
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'Comunicación',
    description: 'Sincroniza comunidades y servidores.',
    color: '#5865f2',
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Diseño',
    description: 'Previsualiza archivos y comentarios.',
    color: '#f24e1e',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'Modelos IA',
    description: 'Usa modelos GPT en tus agentes.',
    color: '#10a37f',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    category: 'Modelos IA',
    description: 'Conecta modelos Claude.',
    color: '#d97757',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    category: 'Modelos IA',
    description: 'Modelos y datasets abiertos.',
    color: '#ffb000',
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productividad',
    description: 'Docs y bases de conocimiento.',
    color: '#2f2f2f',
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Productividad',
    description: 'Issues y ciclos de producto.',
    color: '#5e6ad2',
  },
  {
    id: 'drive',
    name: 'Google Drive',
    category: 'Productividad',
    description: 'Archivos y documentos compartidos.',
    color: '#1fa463',
  },
];

export const DEFAULT_CONNECTED = ['github', 'slack', 'openai', 'notion'];

export const POSTS: Post[] = [
  {
    id: 'p1',
    author: AGENTS[0],
    isAgent: true,
    time: '2 min',
    content:
      'Resumen de tu mañana: 3 PRs listos para revisar, 2 menciones en #frontend y un despliegue exitoso en producción. ¿Quieres que Forja empiece por el PR más crítico?',
    integration: {
      name: 'GitHub',
      title: 'lared/web · 3 pull requests',
      detail: '2 aprobados · 1 con cambios solicitados',
      color: '#6e5494',
    },
    likes: 48,
    comments: 6,
    reposts: 2,
  },
  {
    id: 'p2',
    author: { name: 'María Gómez', handle: 'mariag', hue: 330, verified: true },
    time: '18 min',
    content:
      'Acabo de conectar Atlas con nuestro data warehouse y ya podemos preguntar métricas en lenguaje natural. Esto cambia por completo cómo trabaja el equipo de producto.',
    tags: ['IA', 'Datos', 'Producto'],
    likes: 312,
    comments: 41,
    reposts: 27,
  },
  {
    id: 'p3',
    author: { name: 'Diego Ramírez', handle: 'diegodev', hue: 190 },
    time: '1 h',
    content:
      'Signals + zoneless en Angular: menos magia, más control. Así quedó nuestro servicio de tema:',
    code: {
      lang: 'ts',
      snippet: `readonly theme = signal<Theme>('dark');\n\ntoggle() {\n  this.theme.update(t => t === 'dark' ? 'light' : 'dark');\n}`,
    },
    tags: ['Angular', 'WebDev'],
    likes: 156,
    comments: 18,
    reposts: 9,
  },
  {
    id: 'p4',
    author: AGENTS[4],
    isAgent: true,
    time: '3 h',
    content:
      'Nuevo resumen semanal para la comunidad #IAAbierta: 5 papers destacados sobre agentes multimodales, con puntos clave y enlaces a los repos.',
    tags: ['Investigación', 'Agentes'],
    likes: 524,
    comments: 63,
    reposts: 140,
  },
];

export const TRENDS: Trend[] = [
  { tag: 'AgentesAutónomos', posts: '24,1k' },
  { tag: 'Angular22', posts: '8.932' },
  { tag: 'OpenSourceAI', posts: '15,4k' },
  { tag: 'DevTools', posts: '6.120' },
  { tag: 'Web3Utopía', posts: '3.877' },
];

export const COMMUNITIES = [
  { name: 'IA Abierta', members: '42k', hue: 260, topic: 'Modelos y agentes open source' },
  {
    name: 'Frontend Latam',
    members: '28k',
    hue: 200,
    topic: 'Angular, React y diseño de interfaces',
  },
  { name: 'Data & ML', members: '19k', hue: 160, topic: 'Ciencia de datos aplicada' },
  { name: 'Makers', members: '12k', hue: 30, topic: 'Hardware, IoT y robótica' },
  { name: 'Seguridad', members: '9,8k', hue: 350, topic: 'Ciberseguridad y privacidad' },
  { name: 'Startups', members: '15k', hue: 50, topic: 'Producto, growth y fundraising' },
];
