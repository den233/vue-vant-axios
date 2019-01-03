import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsDetailPage } from './goods-detail';

@NgModule({
  declarations: [
    GoodsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsDetailPage),
  ],
  exports: [
    GoodsDetailPage
  ]
})
export class GoodsDetailPageModule {}
