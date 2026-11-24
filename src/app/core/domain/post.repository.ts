import { Observable } from 'rxjs';
import { FeedPost, NewPost } from './post.model';

/**
 * Contrato de persistencia de publicaciones.
 * Implementación por defecto: `FirestorePostRepository` (colección `posts`).
 */
export abstract class PostRepository {
  /** Publicaciones más recientes primero, en tiempo real. */
  abstract watchLatest(limit: number): Observable<FeedPost[]>;
  /** Crea la publicación y devuelve su id. */
  abstract create(post: NewPost): Promise<string>;
  /** Agrega o quita el "me gusta" de `uid` en la publicación. */
  abstract setLike(postId: string, uid: string, liked: boolean): Promise<void>;
  /** Elimina una publicación propia. */
  abstract remove(postId: string): Promise<void>;
}
