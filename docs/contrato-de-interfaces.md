# Contrato de interfaces

Versión **1.0** · Este documento define qué ofrece cada módulo de LA RED, qué datos intercambia y
qué garantías da el backend (Firebase). El código fuente de los contratos vive en
`src/app/core/domain/`.

## 1. Mapa de módulos

| Módulo         | Ruta              | Acceso                        | Componente                           | Depende de                                          | Estado                          |
| -------------- | ----------------- | ----------------------------- | ------------------------------------ | --------------------------------------------------- | ------------------------------- |
| Autenticación  | `/login`          | Solo invitados (`guestGuard`) | `features/auth/login`                | `AuthService`                                       | Funcional                       |
| Inicio (feed)  | `/`               | Sesión (`authGuard`)          | `features/feed/feed`                 | `FeedService`, `ProfileService`, `EcosystemService` | Funcional                       |
| Explorar       | `/explorar`       | Sesión                        | `features/explore/explore`           | `EcosystemService`, `CommandPaletteService`         | Funcional                       |
| Comunidades    | `/comunidades`    | Sesión                        | `features/communities/communities`   | `EcosystemService`                                  | Funcional                       |
| Agentes IA     | `/agentes`        | Sesión                        | `features/agents/agents`             | `EcosystemService`                                  | Funcional (conexión persistida) |
| Integraciones  | `/integraciones`  | Sesión                        | `features/integrations/integrations` | `EcosystemService`                                  | Funcional (conexión persistida) |
| Perfil         | `/perfil`         | Sesión                        | `features/profile/profile`           | `ProfileService`, `FeedService`, `AuthService`      | Funcional                       |
| Ajustes        | `/ajustes`        | Sesión                        | `features/settings/settings`         | `AuthService`, `ThemeService`                       | Funcional                       |
| Mensajes       | `/mensajes`       | Sesión                        | `features/coming-soon`               | —                                                   | Próximamente                    |
| Notificaciones | `/notificaciones` | Sesión                        | `features/coming-soon`               | —                                                   | Próximamente                    |
| 404            | `**`              | Sesión                        | `features/not-found`                 | —                                                   | Funcional                       |

Todas las rutas con sesión se renderizan dentro de `core/layout/shell` (sidebar, topbar, barra
inferior móvil y paleta de comandos `Ctrl/⌘ + K`).

### Funcionalidades por módulo

**Autenticación**

- Iniciar sesión con correo y contraseña.
- Crear cuenta (nombre, correo, contraseña de 6 caracteres o más).
- Continuar con Google (popup).
- Recuperar contraseña por correo.
- Redirección tras login a `?redirect=<ruta interna>`; se ignoran URLs externas.
- Errores traducidos al español (`core/services/auth-errors.ts`).

**Inicio (feed)**

- Timeline en tiempo real de las últimas 50 publicaciones (`posts`, `createdAt desc`).
- Publicar (1–1000 caracteres, `Ctrl/⌘ + Enter`); los `#hashtags` se guardan como `tags`.
- "Me gusta" por usuario, guardar publicaciones y eliminar las propias.
- Pestañas: _Para ti_, _Mis publicaciones_, _Guardadas_.
- Panel "Tu núcleo": agentes activos e integraciones conectadas del perfil.

**Comunidades / Agentes / Integraciones**

- Catálogo estático (`core/data/catalog.ts`).
- Unirse/salir y conectar/desconectar se guardan en el perfil del usuario.

**Perfil**

- Ver y editar nombre, usuario (`^[a-z0-9_]{3,20}$`) y biografía (≤ 160).
- Métricas: publicaciones, agentes, integraciones y comunidades.

**Ajustes**

- Tema claro/oscuro (persistido en `localStorage`).
- Enviar enlace de cambio de contraseña y cerrar sesión.

## 2. Modelos de dominio

```ts
// src/app/core/domain/user.model.ts
interface AppUser {
  // Identidad del proveedor
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface UserProfile {
  // users/{uid}
  uid: string;
  displayName: string; // ≤ 50
  handle: string; // ^[a-z0-9_]{3,20}$
  bio: string; // ≤ 160
  hue: number; // 0–359, color del avatar
  connectedAgents: string[]; // ids de AGENTS
  connectedIntegrations: string[]; // ids de INTEGRATIONS
  joinedCommunities: string[]; // ids de COMMUNITIES
  savedPosts: string[]; // ids de posts
  createdAt: Date | null;
}

type ProfileUpdate = Partial<Pick<UserProfile, 'displayName' | 'handle' | 'bio' | 'hue'>>;
type ProfileCollection =
  'connectedAgents' | 'connectedIntegrations' | 'joinedCommunities' | 'savedPosts';

// src/app/core/domain/post.model.ts
interface PostAuthor {
  name: string;
  handle: string;
  hue: number;
}

interface FeedPost {
  // posts/{postId}
  id: string;
  authorId: string; // == uid del autor
  author: PostAuthor; // desnormalizado al publicar
  content: string; // 1–1000
  tags: string[]; // ≤ 10, minúsculas, sin '#'
  likedBy: string[]; // uids
  createdAt: Date | null;
}

interface NewPost {
  authorId: string;
  author: PostAuthor;
  content: string;
  tags: string[];
}
```

## 3. Contratos de repositorio (puertos)

Son clases abstractas usadas como tokens de inyección. Las features **nunca** importan
`firebase/*`; solo la carpeta `core/infrastructure/firebase` lo hace.

### `AuthRepository`

| Método                             | Entrada                     | Salida                                                           | Errores (`code`)                                                                             |
| ---------------------------------- | --------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `authState()`                      | —                           | `Observable<AppUser \| null>`; primera emisión = sesión resuelta | —                                                                                            |
| `signInWithEmail(email, password)` | `string, string`            | `Promise<AppUser>`                                               | `auth/invalid-credential`, `auth/too-many-requests`, `auth/network-request-failed`           |
| `signUpWithEmail(data)`            | `{ name, email, password }` | `Promise<AppUser>`                                               | `auth/email-already-in-use`, `auth/weak-password`, `auth/invalid-email`                      |
| `signInWithGoogle()`               | —                           | `Promise<AppUser>`                                               | `auth/popup-closed-by-user` (silencioso), `auth/popup-blocked`, `auth/operation-not-allowed` |
| `sendPasswordReset(email)`         | `string`                    | `Promise<void>`                                                  | `auth/invalid-email`                                                                         |
| `signOut()`                        | —                           | `Promise<void>`                                                  | —                                                                                            |

### `PostRepository`

| Método                        | Entrada                   | Salida                   | Notas                                           |
| ----------------------------- | ------------------------- | ------------------------ | ----------------------------------------------- |
| `watchLatest(limit)`          | `number`                  | `Observable<FeedPost[]>` | Tiempo real, más recientes primero              |
| `create(post)`                | `NewPost`                 | `Promise<string>` (id)   | `likedBy = []`, `createdAt = serverTimestamp()` |
| `setLike(postId, uid, liked)` | `string, string, boolean` | `Promise<void>`          | `arrayUnion` / `arrayRemove`                    |
| `remove(postId)`              | `string`                  | `Promise<void>`          | Solo el autor                                   |

### `ProfileRepository`

| Método                                       | Entrada                                      | Salida                            | Notas                                        |
| -------------------------------------------- | -------------------------------------------- | --------------------------------- | -------------------------------------------- |
| `ensure(user)`                               | `AppUser`                                    | `Promise<void>`                   | Idempotente; crea con `createDefaultProfile` |
| `watch(uid)`                                 | `string`                                     | `Observable<UserProfile \| null>` | Tiempo real                                  |
| `update(uid, changes)`                       | `string, ProfileUpdate`                      | `Promise<void>`                   |                                              |
| `setMembership(uid, collection, id, member)` | `string, ProfileCollection, string, boolean` | `Promise<void>`                   | Operación de conjunto                        |

Implementaciones disponibles:

| Contrato            | Producción                   | Pruebas                     |
| ------------------- | ---------------------------- | --------------------------- |
| `AuthRepository`    | `FirebaseAuthRepository`     | `InMemoryAuthRepository`    |
| `PostRepository`    | `FirestorePostRepository`    | `InMemoryPostRepository`    |
| `ProfileRepository` | `FirestoreProfileRepository` | `InMemoryProfileRepository` |

El enlace se hace en `provideFirebase()` (producción) y `provideInMemoryBackend()` (`src/testing`).

## 4. Servicios de aplicación (API para las features)

| Servicio                | API pública                                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AuthService`           | `user: Signal<AppUser \| null \| undefined>` (`undefined` = resolviendo), `user$`, `isAuthenticated`, `isSignedIn()`, `signIn()`, `signUp()`, `signInWithGoogle()`, `resetPassword()`, `signOut()`                       |
| `ProfileService`        | `profile: Signal<UserProfile \| null>`, `displayName`, `has(collection, id)`, `toggle(collection, id)`, `update(changes)`                                                                                                |
| `FeedService`           | `posts`, `status: 'loading' \| 'ready' \| 'error'`, `publishing`, `publish(content)`, `isLiked(post)`, `toggleLike(post)`, `remove(post)`                                                                                |
| `EcosystemService`      | `agents`, `integrations`, `communities`, `connectedAgents`, `connectedIntegrations`, `joinedCommunities`, `activeAgents`, `connectedIntegrationCount`, `toggleAgent(id)`, `toggleIntegration(id)`, `toggleCommunity(id)` |
| `ThemeService`          | `theme: Signal<'light' \| 'dark'>`, `toggle()`                                                                                                                                                                           |
| `CommandPaletteService` | `isOpen`, `open()`, `close()`, `toggle()`                                                                                                                                                                                |

Guards (`core/guards/auth.guards.ts`): `authGuard` → `/login?redirect=…` sin sesión;
`guestGuard` → `/` con sesión.

## 5. Esquema de Firestore

```
users/{uid}
  uid: string
  displayName: string
  handle: string
  bio: string
  hue: number
  connectedAgents: string[]
  connectedIntegrations: string[]
  joinedCommunities: string[]
  savedPosts: string[]
  createdAt: timestamp (server)

posts/{postId}
  authorId: string
  author: { name: string, handle: string, hue: number }
  content: string
  tags: string[]
  likedBy: string[]
  createdAt: timestamp (server)
```

Índices: no se requieren compuestos (solo `orderBy createdAt`).

## 6. Reglas de seguridad (`firestore.rules`)

| Colección     | Leer       | Crear                                                                                  | Actualizar                                                                            | Borrar        |
| ------------- | ---------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------- |
| `users/{uid}` | Con sesión | Solo el dueño (`uid == auth.uid`)                                                      | Solo el dueño; no puede cambiar `uid` ni `createdAt`; `displayName ≤ 50`, `bio ≤ 160` | Nunca         |
| `posts/{id}`  | Con sesión | `authorId == auth.uid`, contenido 1–1000, `likedBy` vacío, `createdAt == request.time` | Solo `likedBy`, y solo agregando/quitando el propio uid                               | Solo el autor |

## 7. Limitaciones conocidas y siguiente versión

- `likedBy` como arreglo escala hasta miles de likes por post; para más, migrar a subcolección
  `posts/{id}/likes/{uid}` + contador con Cloud Functions.
- El autor está desnormalizado: si el usuario cambia su nombre, los posts antiguos conservan el anterior.
- "Preguntar" e "Invocar agente" aún no llaman a un modelo; el contrato previsto es
  `AgentRepository.ask(agentId, prompt, context): Observable<AgentMessage>` (Cloud Functions).
- Mensajes y Notificaciones están pendientes de diseño de datos.
