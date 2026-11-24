/** Autor desnormalizado dentro de cada publicación para pintar el feed sin lecturas extra. */
export interface PostAuthor {
  name: string;
  handle: string;
  hue: number;
}

/** Publicación del feed (`posts/{postId}`). */
export interface FeedPost {
  id: string;
  authorId: string;
  author: PostAuthor;
  content: string;
  tags: string[];
  likedBy: string[];
  createdAt: Date | null;
}

/** Datos necesarios para crear una publicación. */
export interface NewPost {
  authorId: string;
  author: PostAuthor;
  content: string;
  tags: string[];
}

/** Longitud máxima de una publicación; debe coincidir con `firestore.rules`. */
export const POST_MAX_LENGTH = 1000;
