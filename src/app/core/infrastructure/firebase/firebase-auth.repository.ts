import { inject, Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthRepository, SignUpData } from '@core/domain/auth.repository';
import { AppUser } from '@core/domain/user.model';
import { FIREBASE_AUTH } from './firebase.tokens';

/** `AuthRepository` sobre Firebase Authentication (correo/contraseña y Google). */
@Injectable()
export class FirebaseAuthRepository extends AuthRepository {
  private readonly auth = inject(FIREBASE_AUTH);

  authState(): Observable<AppUser | null> {
    return new Observable((subscriber) =>
      onAuthStateChanged(
        this.auth,
        (user) => subscriber.next(user ? toAppUser(user) : null),
        (error) => subscriber.error(error),
      ),
    );
  }

  async signInWithEmail(email: string, password: string): Promise<AppUser> {
    const { user } = await signInWithEmailAndPassword(this.auth, email, password);
    return toAppUser(user);
  }

  async signUpWithEmail({ name, email, password }: SignUpData): Promise<AppUser> {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(user, { displayName: name });
    return { ...toAppUser(user), displayName: name };
  }

  async signInWithGoogle(): Promise<AppUser> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const { user } = await signInWithPopup(this.auth, provider);
    return toAppUser(user);
  }

  sendPasswordReset(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }
}

function toAppUser(user: User): AppUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}
