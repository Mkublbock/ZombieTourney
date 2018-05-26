import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './providers/authservice';

import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { User } from '@firebase/auth-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup;
  success;
  user: User;

  constructor(protected formBuilder: FormBuilder, public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.maxLength(12), Validators.required]]
    });
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(' User is signed in ' + '\n' + user.email);
        this.user = user;
      } else {
        console.log(' No User is logged in');
      }
    });
  }

  goToProfile() {
    const uid = firebase.auth().currentUser.uid;
    this.router.navigate(['/user', uid]);
  }
}
