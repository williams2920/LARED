import { Observable } from 'rxjs';
import { AppUser, ProfileCollection, ProfileUpdate, UserProfile } from './user.model';

/**
 * Contrato de persistencia de perfiles.
 * Implementación por defecto: `FirestoreProfileRepository` (colección `users`).
 */
export abstract class ProfileRepository {
  /** Crea el perfil con valores por defecto si aún no existe. Idempotente. */
  abstract ensure(user: AppUser): Promise<void>;
  /** Perfil en tiempo real; `null` si no existe. */
  abstract watch(uid: string): Observable<UserProfile | null>;
  abstract update(uid: string, changes: ProfileUpdate): Promise<void>;
  /** Agrega (`member = true`) o quita un id de una colección del perfil. */
  abstract setMembership(
    uid: string,
    collection: ProfileCollection,
    id: string,
    member: boolean,
  ): Promise<void>;
}
