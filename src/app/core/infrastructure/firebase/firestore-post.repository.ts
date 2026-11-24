import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  limit as limitTo,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { FeedPost, NewPost } from '@core/domain/post.model';
import { PostRepository } from '@core/domain/post.repository';
import { FIRESTORE } from './firebase.tokens';

const POSTS = 'posts';

/** `PostRepository` sobre Cloud Firestore. Esquema documentado en `docs/contrato-de-interfaces.md`. */
@Injectable()
export class FirestorePostRepository extends PostRepository {
  private readonly db = inject(FIRESTORE);

  watchLatest(limit: number): Observable<FeedPost[]> {
    const q = query(collection(this.db, POSTS), orderBy('createdAt', 'desc'), limitTo(limit));
    return new Observable((subscriber) =>
      onSnapshot(
        q,
        (snapshot) => subscriber.next(snapshot.docs.map(toFeedPost)),
        (error) => subscriber.error(error),
      ),
    );
  }

  async create(post: NewPost): Promise<string> {
    const ref = await addDoc(collection(this.db, POSTS), {
      ...post,
      likedBy: [],
      createdAt: serverTimestamp(),
    });
    return ref.id;
  }

  setLike(postId: string, uid: string, liked: boolean): Promise<void> {
    return updateDoc(doc(this.db, POSTS, postId), {
      likedBy: liked ? arrayUnion(uid) : arrayRemove(uid),
    });
  }

  remove(postId: string): Promise<void> {
    return deleteDoc(doc(this.db, POSTS, postId));
  }
}

function toFeedPost(snapshot: QueryDocumentSnapshot): FeedPost {
  // 'estimate' evita createdAt = null mientras el servidor confirma una escritura local.
  const data = snapshot.data({ serverTimestamps: 'estimate' });
  return {
    id: snapshot.id,
    authorId: data['authorId'],
    author: data['author'],
    content: data['content'],
    tags: data['tags'] ?? [],
    likedBy: data['likedBy'] ?? [],
    createdAt: data['createdAt'] instanceof Timestamp ? data['createdAt'].toDate() : null,
  };
}
