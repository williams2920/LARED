# LA RED

Plantilla base en **Angular 22** (última versión) con estilos, fuentes, tema y menú ya configurados.

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

- **Identidad**: isotipo de nodos conectados a un núcleo, tema oscuro por defecto (claro opcional) y degradado violeta → azul → cian.
- **Navegación de app social**: barra lateral (iconos en tablet, completa desde 1200 px), barra superior con buscador y barra inferior en móvil con botón central de crear.
- **Paleta de comandos (`Ctrl/⌘ + K`)**: busca páginas, agentes e integraciones o “pregunta a Nexus”; se navega con teclado.
- **Páginas de ejemplo**: Feed (composer, pestañas, posts de personas y agentes, columna “Tu núcleo”), Explorar, Agentes, Integraciones y marcadores “Próximamente” para el resto.

## Qué incluye

- **Angular moderno**: componentes standalone, signals, zoneless, control flow (`@if`, `@for`, `@let`) y rutas lazy con títulos.
- **Estilos SCSS con design tokens** (`src/styles/`):
  - `_tokens.scss` – paleta, tipografía, espaciados, radios, sombras y tema claro/oscuro.
  - `_variables.scss` / `_mixins.scss` – breakpoints y mixins (`up()`, `down()`, `glass`, `truncate`, `focus-ring`…).
  - `_utilities.scss` – `.btn`, `.card`, `.chip`, `.badge`, `.kbd`, `.status-dot`, `.page`, `.grid`…
  - Los componentes pueden usar `@use 'mixins' as *;` directamente (configurado en `angular.json`).
- **Fuentes locales** con `@fontsource`: _Inter_ (texto), _Montserrat_ (títulos) y _JetBrains Mono_ (código). Sin CDN.
- **Iconos** [Lucide](https://lucide.dev) vía `<app-icon name="bot" />`; se registran en `shared/ui/icon/icons.ts`.
- **Datos mock** en `core/data/mock-data.ts` con tipos en `models.ts`, listos para sustituir por llamadas a API.
- **Alias de rutas**: `@core/*`, `@shared/*`, `@features/*`.

## Estructura

```
src/
├── styles/                    # Tokens, mixins, reset, tipografía, utilidades
└── app/
    ├── core/
    │   ├── layout/            # sidebar, topbar, bottom-nav, command-palette
    │   ├── navigation/        # NAV_SECTIONS: definición única del menú
    │   ├── data/              # Modelos y datos mock
    │   └── services/          # ThemeService, CommandPaletteService, EcosystemService
    ├── shared/
    │   ├── ui/                # icon, logo, avatar
    │   └── components/        # page-header
    ├── features/              # feed, explore, agents, integrations, coming-soon, not-found
    ├── app.routes.ts
    └── app.config.ts
```

## Personalizar

- **Colores / fuentes**: edita `src/styles/_tokens.scss`.
- **Menú**: edita `NAV_SECTIONS` en `src/app/core/navigation/navigation.ts` (`mobile: true` lo muestra en la barra inferior).
- **Páginas**: agrega una carpeta en `src/app/features/` y su ruta en `app.routes.ts`.
- **Datos**: reemplaza `core/data/mock-data.ts` por servicios HTTP.
