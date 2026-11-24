import { Observable } from 'rxjs';
import { AppUser } from './user.model';

/** Datos de registro con correo. */
export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

/**
 * Contrato de autenticación.
 *
 * Las features y servicios dependen de esta abstracción, nunca del SDK de Firebase (DIP).
 * Implementación por defecto: `FirebaseAuthRepository`.
 * Los métodos rechazan con un `AuthError` cuyo `code` sigue el formato `auth/<motivo>`.
 */
export abstract class AuthRepository {
  /** Emite el usuario actual (o `null`) en cuanto se resuelve la sesión y en cada cambio. */
  abstract authState(): Observable<AppUser | null>;
  abstract signInWithEmail(email: string, password: string): Promise<AppUser>;
  abstract signUpWithEmail(data: SignUpData): Promise<AppUser>;
  abstract signInWithGoogle(): Promise<AppUser>;
  abstract sendPasswordReset(email: string): Promise<void>;
  abstract signOut(): Promise<void>;
}
