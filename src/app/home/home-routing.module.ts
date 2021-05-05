import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { FashionOneComponent } from './fashion/fashion-one/fashion-one.component';
import { FashionTwoComponent } from './fashion/fashion-two/fashion-two.component';
// import { FashionThreeComponent } from './fashion/fashion-three/fashion-three.component';
// import { BagsComponent } from './bags/bags.component';

const routes: Routes = [
  // {
  //   path: 'fashion',
  //   component: FashionOneComponent
  // },
  {
    path: '',
    component: FashionTwoComponent
  },
  // {
  //   path: 'fashion-3',
  //   component: FashionThreeComponent
  // },
  // {
  //   path: 'bags',
  //   component: BagsComponent
  // },
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
