const MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/invalid-login-credentials': 'Correo o contraseña incorrectos.',
  'auth/wrong-password': 'Correo o contraseña incorrectos.',
  'auth/user-not-found': 'No existe una cuenta con ese correo.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
  'auth/invalid-email': 'El correo no es válido.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.',
  'auth/network-request-failed': 'Sin conexión. Revisa tu red e inténtalo de nuevo.',
  'auth/popup-blocked':
    'El navegador bloqueó la ventana de Google. Permite las ventanas emergentes.',
  'auth/operation-not-allowed': 'Este método de acceso no está habilitado en Firebase.',
  'auth/unauthorized-domain': 'Este dominio no está autorizado en Firebase Authentication.',
};

/** Códigos que significan que el usuario canceló a propósito; no se muestran como error. */
const SILENT = new Set(['auth/popup-closed-by-user', 'auth/cancelled-popup-request']);

/** Traduce un error del proveedor de identidad a un mensaje para el usuario (o `null` si es silencioso). */
export function authErrorMessage(error: unknown): string | null {
  const code = (error as { code?: string } | null)?.code ?? '';
  if (SILENT.has(code)) return null;
  return MESSAGES[code] ?? 'Algo salió mal. Inténtalo de nuevo.';
}
