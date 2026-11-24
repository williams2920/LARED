# Firebase

Proyecto: **`lared-540f8`**. La configuración web está en `src/environments/environment.ts`.

> La configuración web de Firebase (incluida la `apiKey`) es pública por diseño. La seguridad
> depende de las **reglas de Firestore** y de restringir la API key por dominio en
> Google Cloud Console → APIs y servicios → Credenciales.

## Servicios usados

| Servicio        | Uso                        | Inicialización                                                      |
| --------------- | -------------------------- | ------------------------------------------------------------------- |
| Authentication  | Correo/contraseña y Google | `getAuth` + persistencia local, idioma `es`                         |
| Cloud Firestore | `users`, `posts`           | `initializeFirestore` con caché persistente multi-pestaña (offline) |
| Analytics       | Métricas de uso            | Solo si `isSupported()` y hay `measurementId`                       |

Todo se configura en `core/infrastructure/firebase/firebase.providers.ts`.

## Puesta en marcha (consola)

1. **Authentication → Método de acceso**: habilitar _Correo electrónico/contraseña_ y _Google_.
2. **Authentication → Configuración → Dominios autorizados**: `localhost` viene por defecto;
   agrega tu dominio de producción.
3. **Firestore Database**: crear la base (modo producción) y publicar el contenido de
   `firestore.rules` en la pestaña _Reglas_.

## Con Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules      # publica firestore.rules
npm run build && firebase deploy --only hosting   # publica dist/lared/browser
```

`firebase.json` y `.firebaserc` ya apuntan al proyecto y configuran la SPA (rewrite a `index.html`).

## Troubleshooting

| Síntoma                                           | Causa                     | Solución                         |
| ------------------------------------------------- | ------------------------- | -------------------------------- |
| "No pudimos cargar el feed" / `permission-denied` | Reglas sin publicar       | Publica `firestore.rules`        |
| "Este método de acceso no está habilitado"        | Proveedor apagado         | Habilítalo en Authentication     |
| "Este dominio no está autorizado"                 | Dominio fuera de la lista | Agrégalo en dominios autorizados |
| Popup de Google se cierra solo                    | Bloqueador de ventanas    | Permite popups para el sitio     |
