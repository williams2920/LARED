import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, map, shareReplay } from 'rxjs';
import { AuthRepository, SignUpData } from '@core/domain/auth.repository';
import { AppUser } from '@core/domain/user.model';

/**
 * Sesión de la aplicación. Expone el usuario como signal y delega las operaciones en
 * `AuthRepository`, por lo que no conoce al proveedor concreto.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly repository = inject(AuthRepository);

  /** Estado de sesión compartido; la primera emisión indica que la sesión ya se resolvió. */
  readonly user$ = this.repository
    .authState()
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  /** `undefined` mientras se resuelve la sesión, `null` sin sesión. */
  readonly user = toSignal<AppUser | null | undefined>(this.user$, { initialValue: undefined });
  readonly isAuthenticated = computed(() => !!this.user());

  /** Resuelve con `true` cuando hay sesión. Útil para guards. */
  isSignedIn(): Promise<boolean> {
    return firstValueFrom(this.user$.pipe(map((user) => !!user)));
  }

  signIn(email: string, password: string): Promise<AppUser> {
    return this.repository.signInWithEmail(email.trim(), password);
  }

  signUp(data: SignUpData): Promise<AppUser> {
    return this.repository.signUpWithEmail({
      ...data,
      email: data.email.trim(),
      name: data.name.trim(),
    });
  }

  signInWithGoogle(): Promise<AppUser> {
    return this.repository.signInWithGoogle();
  }

  resetPassword(email: string): Promise<void> {
    return this.repository.sendPasswordReset(email.trim());
  }

  signOut(): Promise<void> {
    return this.repository.signOut();
  }
}
