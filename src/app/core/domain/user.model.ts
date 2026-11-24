/** Usuario autenticado tal como lo expone el proveedor de identidad. */
export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

/** Perfil público y preferencias del usuario dentro de LA RED (`users/{uid}`). */
export interface UserProfile {
  uid: string;
  displayName: string;
  handle: string;
  bio: string;
  hue: number;
  connectedAgents: string[];
  connectedIntegrations: string[];
  joinedCommunities: string[];
  savedPosts: string[];
  createdAt: Date | null;
}

/** Campos del perfil que el usuario puede editar directamente. */
export type ProfileUpdate = Partial<Pick<UserProfile, 'displayName' | 'handle' | 'bio' | 'hue'>>;

/** Colecciones del perfil que funcionan como conjuntos de ids (conectar/desconectar, unirse/salir). */
export type ProfileCollection =
  'connectedAgents' | 'connectedIntegrations' | 'joinedCommunities' | 'savedPosts';
