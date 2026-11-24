import { AppUser, UserProfile } from './user.model';

/** Agentes e integraciones con los que arranca una cuenta nueva. */
export const DEFAULT_AGENTS = ['nexus'];
export const DEFAULT_INTEGRATIONS: string[] = [];

/** Construye el perfil inicial de un usuario recién registrado. Función pura. */
export function createDefaultProfile(user: AppUser): UserProfile {
  const displayName = user.displayName?.trim() || user.email?.split('@')[0] || 'Nuevo miembro';
  return {
    uid: user.uid,
    displayName,
    handle: toHandle(user.email ?? displayName),
    bio: '',
    hue: hueFrom(user.uid),
    connectedAgents: [...DEFAULT_AGENTS],
    connectedIntegrations: [...DEFAULT_INTEGRATIONS],
    joinedCommunities: [],
    savedPosts: [],
    createdAt: null,
  };
}

export function toHandle(source: string): string {
  const base = source
    .split('@')[0]
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, 20);
  return base || 'miembro';
}

export function hueFrom(seed: string): number {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash % 360;
}
