import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from '../Models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private afs: AngularFirestore) { }

  collectionName = 'Comments';

  create(comment: Comment) {
    comment.id = this.afs.createId();
    return this.afs.collection<Comment>(this.collectionName).doc(comment.id).set(comment);
  }

  getAll() {
    return this.afs.collection<Comment>(this.collectionName).valueChanges();
  }

  update() {

  }

  delete() {

  }
}
