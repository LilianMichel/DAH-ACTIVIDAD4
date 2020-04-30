import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm: FormGroup;
  submitted = false;
  users: Users[] = [];


  constructor(private router: Router, private fb: FormBuilder, private service: UsersService, public alerta: AlertController) {
    this.getUsers();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      });
  }


 view(users) {
  this.submitted = true;
}

getUsers() {
  const snapshotChanges = this.service.getSnapshotChanges();
  snapshotChanges.subscribe(resultQueryUsers => {
    resultQueryUsers.forEach(data => {
      this.users.push({
        email: data.payload.doc.get('email'),
        password: data.payload.doc.get('password')
      });
    });
  });
}

userFound(email: string, password: string): {bol: boolean, usuario?: Users} {
  for (const u of this.users) {
    if (u.email === email && u.password === password) {
      return {bol: true, usuario: u};
    }
  }
  return { bol: false };
}

login() {
  if (this.myForm.valid) {
    const existeEmail = this.userFound(this.myForm.get('email').value.toString(),
    this.myForm.get('password').value.toString());
    if (existeEmail.bol) {
      this.router.navigate(['tabs']);

    } else {
      window.confirm('Usuario y/o contraseña incorrecto/s, intentelo de nuevo...');
    }
  }
}
}

