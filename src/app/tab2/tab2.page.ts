import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { User } from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public myForm: FormGroup;
  public product: Product;
  ingredients: Array<string> = Array();
  constructor(private productService: ProductService, private fb: FormBuilder) { }


  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])]],
      coste: [0, [Validators.compose([Validators.required])]],
      ingredient: [''],
      toggle: [false]//Pone en falso el toggle, lo desactiva
    });
  }

  guardar() {
    if (this.ingredients.length == 0) {
      this.product = {
        name: this.myForm.controls.name.value,
        coste: this.myForm.controls.coste.value
      };
    } else {
    this.product = {
      name: this.myForm.controls.name.value,
      coste: this.myForm.controls.coste.value,
      ingredient: this.ingredients
    };
  }
    this.productService.createProduct(this.product);
    this.myForm.get('name').setValue('');
    this.myForm.get('coste').setValue('');
    this.myForm.get('ingredient').setValue('');
    this.ingredients = Array();
  }
    addIngredient() {
      let addIngredient = this.myForm.get('ingredient').value;
      if (addIngredient !== '') {
        this.ingredients.push(addIngredient);
        this.myForm.get('ingredient').setValue('');
      }
    }

    deleteIngredient(i) {
      const ingredientsT = Array();
    let indice = 0;
    for (const ing of this.ingredients) {
      if (indice !== i) {
        ingredientsT.push(ing);
      }
      indice++;
    }
    this.ingredients = ingredientsT;
    }
}
