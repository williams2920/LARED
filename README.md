# LA RED

Red social de tecnología en **Angular 22** + **Firebase** (Auth, Firestore y Analytics).

Documentación completa en [`docs/`](./docs/README.md): [contrato de interfaces](./docs/contrato-de-interfaces.md), [arquitectura](./docs/arquitectura.md), [Firebase](./docs/firebase.md) y [sistema de diseño](./docs/sistema-de-diseno.md).

## Requisitos

- Node.js 22 LTS o superior
- npm 11+

## Comandos

| Comando          | Descripción                                     |
| ---------------- | ----------------------------------------------- |
| `npm install`    | Instala dependencias                            |
| `npm start`      | Servidor de desarrollo en http://localhost:4200 |
| `npm run build`  | Build de producción en `dist/lared`             |
| `npm test`       | Pruebas unitarias (Vitest)                      |
| `npm run lint`   | ESLint (angular-eslint)                         |
| `npm run format` | Formatea el código con Prettier                 |

Generar un componente nuevo: `npx ng g c features/mi-pagina`

## Experiencia (UX/UI)

LA RED es una red social de tecnología donde personas, **agentes de IA** e **integraciones** conviven en un solo núcleo.

- **Identidad**: minimalismo estilo Apple. Neutros grafito/plata y un único acento sólido (Índigo RED, `--brand-accent`); tema oscuro por defecto y claro opcional.
- **Login**: acceso con correo o Google sobre un fondo animado de nodos conectados.
- **Navegación de app social**: barra lateral (iconos en tablet, completa desde 1200 px), barra superior con buscador y barra inferior en móvil con botón central de crear.
- **Paleta de comandos (`Ctrl/⌘ + K`)**: busca páginas, agentes e integraciones o “pregunta a Nexus”; se navega con teclado.
- **Módulos funcionales**: Feed en tiempo real (publicar, me gusta, guardar, eliminar), Comunidades, Agentes e Integraciones (persistidos por usuario), Perfil editable y Ajustes. Mensajes y Notificaciones: próximamente.

## Qué incluye

- **Angular moderno**: componentes standalone, signals, zoneless, control flow (`@if`, `@for`, `@let`) y rutas lazy con títulos.
- **Estilos SCSS con design tokens** (`src/styles/`):
  - `_tokens.scss` – paleta, tipografía, espaciados, radios, sombras y tema claro/oscuro.
  - `_variables.scss` / `_mixins.scss` – breakpoints y mixins (`up()`, `down()`, `glass`, `truncate`, `focus-ring`…).
  - `_utilities.scss` – `.btn`, `.card`, `.chip`, `.badge`, `.kbd`, `.status-dot`, `.page`, `.grid`…
  - Los componentes pueden usar `@use 'mixins' as *;` directamente (configurado en `angular.json`).
- **Fuentes locales** con `@fontsource`: _Inter_ (texto), _Montserrat_ (títulos) y _JetBrains Mono_ (código). Sin CDN.
- **Iconos** [Lucide](https://lucide.dev) vía `<app-icon name="bot" />`; se registran en `shared/ui/icon/icons.ts`.
- **Firebase con arquitectura limpia**: contratos en `core/domain`, implementación en `core/infrastructure/firebase` y backend en memoria para pruebas (`src/testing`). Reglas en `firestore.rules`.
- **Alias de rutas**: `@core/*`, `@shared/*`, `@features/*`, `@env/*`.

## Estructura

```
docs/                          # Contrato de interfaces, arquitectura, Firebase, diseño
firestore.rules                # Reglas de seguridad
src/
├── environments/              # Configuración de Firebase
├── testing/                   # Backend en memoria para pruebas
├── styles/                    # Tokens, mixins, reset, tipografía, utilidades
└── app/
    ├── core/
    │   ├── domain/            # Modelos y contratos (AuthRepository, PostRepository, ProfileRepository)
    │   ├── infrastructure/    # firebase/: providers e implementaciones de los contratos
    │   ├── services/          # AuthService, ProfileService, FeedService, EcosystemService, Theme…
    │   ├── guards/            # authGuard, guestGuard
    │   ├── layout/            # shell, sidebar, topbar, bottom-nav, command-palette
    │   ├── navigation/        # NAV_SECTIONS: definición única del menú
    │   └── data/              # Catálogo estático (agentes, integraciones, comunidades)
    ├── shared/
    │   ├── ui/                # icon, logo, avatar, network-background
    │   ├── pipes/             # timeAgo
    │   └── components/        # page-header
    ├── features/              # auth, feed, explore, communities, agents, integrations, profile, settings…
    ├── app.routes.ts
    └── app.config.ts
```

## Personalizar

- **Colores / fuentes**: edita `src/styles/_tokens.scss`.
- **Menú**: edita `NAV_SECTIONS` en `src/app/core/navigation/navigation.ts` (`mobile: true` lo muestra en la barra inferior).
- **Páginas**: agrega una carpeta en `src/app/features/` y su ruta en `app.routes.ts`.
- **Backend**: implementa los contratos de `core/domain` y enlázalos en `provideFirebase()` (ver [arquitectura](./docs/arquitectura.md)).
