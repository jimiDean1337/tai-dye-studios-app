import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FashionTwoComponent } from './fashion/fashion-two/fashion-two.component';

const routes: Routes = [

  {
    path: '',
    component: FashionTwoComponent
  },
  {
    path: 'fashion-2',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
