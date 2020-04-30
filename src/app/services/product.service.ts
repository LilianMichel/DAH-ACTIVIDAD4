import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: AngularFirestore) { }

  getProducts() {
    return this.firestore.collection('product').snapshotChanges();
  }
  createProduct(product: Product) {
    return this.firestore.collection('product').add(product);
  }
}
