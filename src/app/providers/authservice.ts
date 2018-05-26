import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface User {
  uid: string;
  email: string;
  username?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  loading = of(false);
  success = of(false);
  wrongPassword = of(false);
  usedEmail = of(false);
  duplicateUsername = of(false);
  wrongEmail = of(false);

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  register(username: string, email: string, password: string) {
    this.resetAll(); // Reset all potential errors
    this.loading = of(true); // Loadingspinner
    if (username) { // Check if username was given
      const userRef = this.afs.collection('users'); // Get a Reference to the users collection
      const resultSet = userRef.ref.where('username', '==', username); // Get resultset of all docs where username == username
      resultSet.get().then(result => {
        if (result.empty) { // if empty (true): No duplicate username
          firebase.auth().createUserWithEmailAndPassword(email, password).then((credential) => { // Create user
            this.updateUserData(credential.user, username); // Set document
            console.log('Authenticated');
            this.user = of(credential.user); // Set user to authenticated User
          }).then(() => {
            this.loading = of(false); // Loading done
            this.success = of(true); // Succeeded
            setTimeout(() => {
              this.success = of(false);
              this.router.navigate(['/home']); // Navigate to home after 1.5s
            }, 1500);
          }).catch(error => {
            this.handleError(error); // handle error
          });
        } else {
          this.duplicateUsername = of(true); // if result is not emtpy, the username is already taken
          this.loading = of(false);
        }
      });
    }
  }

  login(email: string, password: string) {
    this.resetAll(); // Reset all potential errors
    this.loading = of(true); // Set loadingSpinner

    firebase.auth().signInWithEmailAndPassword(email, password).then((credential) => { // Signin with email and password
      this.user = of(credential.user); // Set user to loggedIn User
    }).then(() => {
      this.loading = of(false); // Loading done
      this.success = of(true); // Succeeded
      setTimeout(() => {
        this.router.navigate(['/home']); // Navigate to home after 1.5 seconds
      }, 1500);
    }).catch(error => {
      this.handleError(error); // handleerror
    });
  }

  private handleError(error) {
    console.log(error.code);
    switch (error.code) {
      case 'auth/email-already-in-use': this.loading = of(false); this.usedEmail = of(true); break;
      case 'auth/wrong-password': this.loading = of(false); this.wrongPassword = of(true); break;
      case 'auth/user-not-found': this.loading = of(false); this.wrongEmail = of(true); break;
    }
  }

  public resetAll() {
    this.loading = of(false);
    this.success = of(false);
    this.wrongPassword = of(false);
    this.usedEmail = of(false);
    this.duplicateUsername = of(false);
    this.wrongEmail = of(false);
  }

  updateUserData(user, username?) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      username: username
    };
    return userRef.set(data, { merge: true });
  }

  logout() {
    this.afAuth.auth.signOut().then(el => window.alert('Logged out! ')).then(() => {
      this.router.navigate(['/']);
      this.user = of(null);
    });
  }

  passwordReset(email: string) {
    this.loading = of(true);
    this.success = of(false);
    this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
      this.success = of(true);
      this.loading = of(false);
      setTimeout(() => {
        this.success = of(false);
      }, 2000);
    }).catch(error => {
      this.handleError(error);
    });
  }
}
