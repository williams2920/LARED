# Documentación de LA RED

| Documento                                             | Contenido                                                                                                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [Contrato de interfaces](./contrato-de-interfaces.md) | Módulos, rutas, servicios, contratos de repositorio, modelos, esquema de Firestore y reglas. **Fuente de verdad** entre frontend y backend. |
| [Arquitectura](./arquitectura.md)                     | Capas, flujo de datos, principios SOLID aplicados y cómo extender la app.                                                                   |
| [Firebase](./firebase.md)                             | Configuración del proyecto, consola, reglas, despliegue y troubleshooting.                                                                  |
| [Sistema de diseño](./sistema-de-diseno.md)           | Paleta, tipografía, tokens y componentes base.                                                                                              |

Regla de mantenimiento: cualquier cambio en un contrato (`src/app/core/domain`), en el esquema de
Firestore o en `firestore.rules` debe actualizar el contrato de interfaces en el mismo PR.
