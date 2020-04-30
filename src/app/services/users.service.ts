import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private firestore: AngularFirestore) { }
  getSnapshotChanges() {
    return this.firestore.collection('usuario').snapshotChanges();
  }
}
