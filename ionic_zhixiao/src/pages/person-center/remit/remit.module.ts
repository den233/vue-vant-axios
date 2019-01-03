import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemitPage } from './remit';

@NgModule({
  declarations: [
    RemitPage,
  ],
  imports: [
    IonicPageModule.forChild(RemitPage),
  ],
  exports: [
    RemitPage
  ]
})
export class RemitPageModule {}
