import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthRepository, SignUpData } from '@core/domain/auth.repository';
import { FeedPost, NewPost } from '@core/domain/post.model';
import { PostRepository } from '@core/domain/post.repository';
import { ProfileRepository } from '@core/domain/profile.repository';
import { createDefaultProfile } from '@core/domain/profile.defaults';
import { AppUser, ProfileCollection, ProfileUpdate, UserProfile } from '@core/domain/user.model';

/**
 * Implementaciones en memoria de los contratos del dominio. Permiten probar servicios y
 * componentes sin Firebase: es el beneficio directo de depender de abstracciones (DIP/LSP).
 */
export class InMemoryAuthRepository extends AuthRepository {
  readonly state = new BehaviorSubject<AppUser | null>(null);

  authState(): Observable<AppUser | null> {
    return this.state;
  }
  async signInWithEmail(email: string): Promise<AppUser> {
    return this.emit({ uid: `uid-${email}`, email, displayName: null, photoURL: null });
  }
  async signUpWithEmail({ name, email }: SignUpData): Promise<AppUser> {
    return this.emit({ uid: `uid-${email}`, email, displayName: name, photoURL: null });
  }
  async signInWithGoogle(): Promise<AppUser> {
    return this.emit({ uid: 'uid-google', email: 'g@lared.dev', displayName: 'G', photoURL: null });
  }
  sendPasswordReset(): Promise<void> {
    return Promise.resolve();
  }
  async signOut(): Promise<void> {
    this.state.next(null);
  }
  private emit(user: AppUser): AppUser {
    this.state.next(user);
    return user;
  }
}

export class InMemoryPostRepository extends PostRepository {
  readonly posts = new BehaviorSubject<FeedPost[]>([]);
  private seq = 0;

  watchLatest(limit: number): Observable<FeedPost[]> {
    return this.posts.pipe(map((posts) => posts.slice(0, limit)));
  }
  async create(post: NewPost): Promise<string> {
    const id = `post-${++this.seq}`;
    this.posts.next([{ ...post, id, likedBy: [], createdAt: new Date() }, ...this.posts.value]);
    return id;
  }
  async setLike(postId: string, uid: string, liked: boolean): Promise<void> {
    this.posts.next(
      this.posts.value.map((p) =>
        p.id !== postId
          ? p
          : { ...p, likedBy: liked ? [...p.likedBy, uid] : p.likedBy.filter((u) => u !== uid) },
      ),
    );
  }
  async remove(postId: string): Promise<void> {
    this.posts.next(this.posts.value.filter((p) => p.id !== postId));
  }
}

export class InMemoryProfileRepository extends ProfileRepository {
  readonly profiles = new BehaviorSubject<Record<string, UserProfile>>({});

  async ensure(user: AppUser): Promise<void> {
    if (!this.profiles.value[user.uid]) this.put(createDefaultProfile(user));
  }
  watch(uid: string): Observable<UserProfile | null> {
    return this.profiles.pipe(map((all) => all[uid] ?? null));
  }
  async update(uid: string, changes: ProfileUpdate): Promise<void> {
    this.put({ ...this.profiles.value[uid], ...changes });
  }
  async setMembership(
    uid: string,
    collection: ProfileCollection,
    id: string,
    member: boolean,
  ): Promise<void> {
    const profile = this.profiles.value[uid];
    const values = profile[collection].filter((v) => v !== id);
    this.put({ ...profile, [collection]: member ? [...values, id] : values });
  }
  private put(profile: UserProfile): void {
    this.profiles.next({ ...this.profiles.value, [profile.uid]: profile });
  }
}

/** Sustituye `provideFirebase()` en pruebas. */
export function provideInMemoryBackend(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: AuthRepository, useClass: InMemoryAuthRepository },
    { provide: PostRepository, useClass: InMemoryPostRepository },
    { provide: ProfileRepository, useClass: InMemoryProfileRepository },
  ]);
}
