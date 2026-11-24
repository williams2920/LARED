import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { AuthRepository } from '@core/domain/auth.repository';
import { PostRepository } from '@core/domain/post.repository';
import { ProfileRepository } from '@core/domain/profile.repository';
import { FirebaseAuthRepository } from './firebase-auth.repository';
import { FirestorePostRepository } from './firestore-post.repository';
import { FirestoreProfileRepository } from './firestore-profile.repository';
import { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE } from './firebase.tokens';

/**
 * Inicializa Firebase (App, Auth, Firestore y Analytics) y enlaza los contratos del dominio
 * con sus implementaciones de Firebase. Es el único punto de la app que conoce ambos lados:
 * cambiar de backend significa reemplazar esta función.
 */
export function provideFirebase(options: FirebaseOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: FIREBASE_APP, useFactory: () => initializeApp(options) },
    {
      provide: FIREBASE_AUTH,
      useFactory: () => {
        const auth = getAuth(inject(FIREBASE_APP));
        auth.languageCode = 'es';
        void setPersistence(auth, browserLocalPersistence);
        return auth;
      },
    },
    {
      provide: FIRESTORE,
      useFactory: () =>
        initializeFirestore(inject(FIREBASE_APP), {
          localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
        }),
    },
    { provide: AuthRepository, useClass: FirebaseAuthRepository },
    { provide: PostRepository, useClass: FirestorePostRepository },
    { provide: ProfileRepository, useClass: FirestoreProfileRepository },
    provideAppInitializer(() => {
      const app = inject(FIREBASE_APP);
      if (options.measurementId) {
        void isSupported().then((supported) => supported && getAnalytics(app));
      }
    }),
  ]);
}
