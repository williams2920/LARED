# Sistema de diseño

Inspirado en la sobriedad de Apple: neutros grafito/plata, mucho espacio, superficies de vidrio y
**un único acento sólido**. Sin degradados ni neón.

## Paleta

| Token                                | Oscuro    | Claro     | Uso                                                            |
| ------------------------------------ | --------- | --------- | -------------------------------------------------------------- |
| `--brand-accent` / `--color-primary` | `#5e5ce6` | `#5856d6` | Acento "Índigo RED": botones primarios, estado activo, enlaces |
| `--color-bg`                         | `#000000` | `#f5f5f7` | Fondo                                                          |
| `--color-surface`                    | `#161617` | `#ffffff` | Tarjetas                                                       |
| `--color-text`                       | `#f5f5f7` | `#1d1d1f` | Texto principal                                                |
| `--color-text-muted`                 | `#a1a1a6` | `#6e6e73` | Texto secundario                                               |
| `--color-success`                    | `#30d158` | `#248a3d` | Estados positivos                                              |
| `--color-danger`                     | `#ff453a` | `#d70015` | Errores                                                        |

Para cambiar la identidad basta con editar `--brand-accent` en `src/styles/_tokens.scss`.

## Tipografía

- **Inter** para texto (`--font-sans`).
- **Montserrat** para títulos (`--font-display`).
- **JetBrains Mono** para código (`--font-mono`).

Las fuentes se sirven localmente con `@fontsource-variable`.

## Componentes base

- **Utilidades** (`src/styles/_utilities.scss`): `.btn` (`--primary`, `--secondary`, `--soft`, `--ghost`, `--outline`, `--icon`, `--sm`, `--lg`), `.card`, `.chip`, `.badge`, `.kbd`, `.page`, `.grid`.
- **UI compartida** (`src/app/shared/ui`): `app-icon` (Lucide), `app-logo`, `app-avatar`, `app-network-background` (fondo animado del login, respeta `prefers-reduced-motion`).
