import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/authservice';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  resetForm: FormGroup;

  constructor(protected formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      resetEmail: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  get resetEmail () {
    return this.resetForm.get('resetEmail');
  }

  sendPasswordReset() {
    this.authService.passwordReset(this.resetEmail.value);
  }

}
