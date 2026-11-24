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

## Qué incluye

- **Angular moderno**: componentes standalone, signals, zoneless, control flow (`@if`, `@for`) y rutas lazy con títulos.
- **Estilos SCSS con design tokens** (`src/styles/`):
  - `_tokens.scss` – paleta (rojo/azul de LA RED), tipografía, espaciados, radios, sombras y tema oscuro.
  - `_variables.scss` / `_mixins.scss` – breakpoints y mixins (`up()`, `down()`, `container`, `focus-ring`…).
  - `_reset.scss`, `_typography.scss`, `_base.scss`, `_utilities.scss` (`.container`, `.btn`, `.card`, `.grid`…).
  - Los componentes pueden usar `@use 'mixins' as *;` directamente (configurado en `angular.json`).
- **Fuentes locales** con `@fontsource`: _Inter_ (texto) y _Montserrat_ (títulos). Sin CDN.
- **Tema claro/oscuro** (`ThemeService`): respeta la preferencia del sistema y se guarda en `localStorage`.
- **Menú responsive y accesible**: desplegables por hover/foco/clic en escritorio y menú hamburguesa en móvil; se cierra con `Esc` o al navegar.
- **Alias de rutas**: `@core/*`, `@shared/*`, `@features/*`.

## Estructura

```
src/
├── styles/                  # Tokens, mixins, reset, tipografía, utilidades
├── styles.scss              # Punto de entrada de estilos globales
└── app/
    ├── core/
    │   ├── layout/          # Header (marca + menú) y footer
    │   ├── navigation/      # MAIN_MENU: definición única del menú
    │   └── services/        # ThemeService
    ├── shared/components/   # Componentes reutilizables (PageHeader)
    ├── features/            # Páginas: home, section, not-found
    ├── app.routes.ts
    └── app.config.ts
public/images/               # Recursos estáticos (logo chapulín)
```

## Personalizar

- **Colores / fuentes**: edita `src/styles/_tokens.scss`.
- **Menú**: edita `MAIN_MENU` en `src/app/core/navigation/menu.ts`.
- **Páginas**: agrega una carpeta en `src/app/features/` y su ruta en `app.routes.ts`.
