import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPasswordPage } from './login-password';

@NgModule({
  declarations: [
    LoginPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPasswordPage),
  ],
  exports: [
    LoginPasswordPage
  ]
})
export class LoginPasswordPageModule {}
