import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { FeedPost, POST_MAX_LENGTH } from '@core/domain/post.model';
import { PostRepository } from '@core/domain/post.repository';
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';

const FEED_SIZE = 50;

type FeedState =
  | { status: 'loading'; posts: FeedPost[] }
  | { status: 'ready'; posts: FeedPost[] }
  | { status: 'error'; posts: FeedPost[] };

/** Feed en tiempo real: lectura, publicación y "me gusta". */
@Injectable({ providedIn: 'root' })
export class FeedService {
  private readonly auth = inject(AuthService);
  private readonly profiles = inject(ProfileService);
  private readonly repository = inject(PostRepository);

  private readonly state = toSignal(
    this.auth.user$.pipe(
      switchMap((user) =>
        user
          ? this.repository.watchLatest(FEED_SIZE).pipe(
              map((posts): FeedState => ({ status: 'ready', posts })),
              startWith<FeedState>({ status: 'loading', posts: [] }),
              catchError(() => of<FeedState>({ status: 'error', posts: [] })),
            )
          : of<FeedState>({ status: 'ready', posts: [] }),
      ),
    ),
    { initialValue: { status: 'loading', posts: [] } as FeedState },
  );

  readonly posts = computed(() => this.state().posts);
  readonly status = computed(() => this.state().status);
  readonly publishing = signal(false);

  /** Publica `content` como el usuario actual. Extrae los #hashtags como etiquetas. */
  async publish(content: string): Promise<void> {
    const text = content.trim();
    const profile = this.profiles.profile();
    if (!text || !profile) return;
    if (text.length > POST_MAX_LENGTH) throw new Error(`Máximo ${POST_MAX_LENGTH} caracteres.`);
    this.publishing.set(true);
    try {
      await this.repository.create({
        authorId: profile.uid,
        author: { name: profile.displayName, handle: profile.handle, hue: profile.hue },
        content: text,
        tags: extractTags(text),
      });
    } finally {
      this.publishing.set(false);
    }
  }

  isLiked(post: FeedPost): boolean {
    const uid = this.auth.user()?.uid;
    return !!uid && post.likedBy.includes(uid);
  }

  toggleLike(post: FeedPost): Promise<void> {
    const uid = this.auth.user()?.uid;
    if (!uid) return Promise.resolve();
    return this.repository.setLike(post.id, uid, !post.likedBy.includes(uid));
  }

  remove(post: FeedPost): Promise<void> {
    return this.repository.remove(post.id);
  }
}

/** Devuelve los hashtags únicos (sin `#`, en minúsculas) presentes en el texto. */
export function extractTags(text: string): string[] {
  const tags = text.match(/#[\p{L}\p{N}_]+/gu) ?? [];
  return [...new Set(tags.map((t) => t.slice(1).toLowerCase()))].slice(0, 10);
}
