import { inject, Injectable } from '@angular/core';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ProfileRepository } from '@core/domain/profile.repository';
import { AppUser, ProfileCollection, ProfileUpdate, UserProfile } from '@core/domain/user.model';
import { createDefaultProfile } from '@core/domain/profile.defaults';
import { FIRESTORE } from './firebase.tokens';

const USERS = 'users';

/** `ProfileRepository` sobre Cloud Firestore (documento `users/{uid}`). */
@Injectable()
export class FirestoreProfileRepository extends ProfileRepository {
  private readonly db = inject(FIRESTORE);

  async ensure(user: AppUser): Promise<void> {
    const ref = doc(this.db, USERS, user.uid);
    if ((await getDoc(ref)).exists()) return;
    await setDoc(ref, { ...createDefaultProfile(user), createdAt: serverTimestamp() });
  }

  watch(uid: string): Observable<UserProfile | null> {
    return new Observable((subscriber) =>
      onSnapshot(
        doc(this.db, USERS, uid),
        (snapshot) => {
          const data = snapshot.data({ serverTimestamps: 'estimate' });
          subscriber.next(
            data
              ? ({
                  ...data,
                  uid,
                  createdAt:
                    data['createdAt'] instanceof Timestamp ? data['createdAt'].toDate() : null,
                } as UserProfile)
              : null,
          );
        },
        (error) => subscriber.error(error),
      ),
    );
  }

  update(uid: string, changes: ProfileUpdate): Promise<void> {
    return updateDoc(doc(this.db, USERS, uid), changes);
  }

  setMembership(
    uid: string,
    collection: ProfileCollection,
    id: string,
    member: boolean,
  ): Promise<void> {
    return updateDoc(doc(this.db, USERS, uid), {
      [collection]: member ? arrayUnion(id) : arrayRemove(id),
    });
  }
}
