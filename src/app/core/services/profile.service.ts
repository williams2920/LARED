import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, concat, defer, ignoreElements, of, switchMap } from 'rxjs';
import { ProfileRepository } from '@core/domain/profile.repository';
import { createDefaultProfile } from '@core/domain/profile.defaults';
import { ProfileCollection, ProfileUpdate, UserProfile } from '@core/domain/user.model';
import { AuthService } from './auth.service';

/**
 * Perfil del usuario en sesión. Crea el documento la primera vez, lo escucha en tiempo real
 * y ofrece las operaciones de conjunto (agentes, integraciones, comunidades, guardados).
 */
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly auth = inject(AuthService);
  private readonly repository = inject(ProfileRepository);

  private readonly stored = toSignal(
    this.auth.user$.pipe(
      switchMap((user) => {
        if (!user) return of(null);
        const fallback = createDefaultProfile(user);
        return concat(
          of(fallback),
          defer(() => this.repository.ensure(user)).pipe(ignoreElements()),
          this.repository.watch(user.uid),
        ).pipe(catchError(() => of(fallback)));
      }),
    ),
    { initialValue: null },
  );

  /** Perfil actual; `null` sin sesión. Mientras carga se usa un perfil por defecto del usuario. */
  readonly profile = computed<UserProfile | null>(() => this.stored());
  readonly displayName = computed(() => this.profile()?.displayName ?? '');

  has(collection: ProfileCollection, id: string): boolean {
    return this.profile()?.[collection].includes(id) ?? false;
  }

  /** Invierte la pertenencia de `id` en la colección y la persiste. */
  toggle(collection: ProfileCollection, id: string): Promise<void> {
    const profile = this.requireProfile();
    return this.repository.setMembership(profile.uid, collection, id, !this.has(collection, id));
  }

  update(changes: ProfileUpdate): Promise<void> {
    return this.repository.update(this.requireProfile().uid, changes);
  }

  private requireProfile(): UserProfile {
    const profile = this.profile();
    if (!profile) throw new Error('No hay una sesión activa.');
    return profile;
  }
}
