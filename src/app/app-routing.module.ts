import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AboutComponent } from './components/about/about.component';
import { RulesComponent } from './components/rules/rules.component';
import { FaqComponent } from './components/faq/faq.component';

const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'passwordReset', component: PasswordResetComponent },
  { path: 'user/:index', component: UserprofileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'faq', component: FaqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
