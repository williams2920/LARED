/**
 * Configuración de entorno.
 *
 * La configuración web de Firebase es pública por diseño: identifica el proyecto, no lo protege.
 * La seguridad real vive en las reglas de Firestore (`firestore.rules`) y en las restricciones
 * de la API key en Google Cloud Console.
 */
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyARq4m3CHGwd3I2mNEOBAHlg8VEVSHotCA',
    authDomain: 'lared-540f8.firebaseapp.com',
    projectId: 'lared-540f8',
    storageBucket: 'lared-540f8.firebasestorage.app',
    messagingSenderId: '52036973009',
    appId: '1:52036973009:web:1d6fff20ea2faada2af0f0',
    measurementId: 'G-B2FJPNVVLL',
  },
};
