import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import {
	Auth,
	user,
	signInWithEmailAndPassword,
	signOut,
	updatePassword,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FirebaseService {
	private firestore = inject(Firestore);
	private auth = inject(Auth);

	// Auth
	user$ = user(this.auth);

	async login(email: string, pass: string) {
		return signInWithEmailAndPassword(this.auth, email, pass);
	}

	async logout() {
		return signOut(this.auth);
	}

	updatePassword(newPassword: string): Observable<void> {
		const currentUser = this.auth.currentUser;
		if (!currentUser) {
			throw new Error('errors.noUser');
		}
		return from(updatePassword(currentUser, newPassword));
	}

	// Firestore generic methods
	getCollection<T>(path: string): Observable<T[]> {
		const col = collection(this.firestore, path);
		return collectionData(col, { idField: 'id' }) as Observable<T[]>;
	}

	async setDocument(path: string, id: string, data: Record<string, unknown>) {
		const docRef = doc(this.firestore, path, id);
		return setDoc(docRef, data, { merge: true });
	}
}
