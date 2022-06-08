import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Different Links
import { AboutComponent } from '../pages/about/about.component';
import { StoreComponent } from '../pages/store/store.component';
import { ProductComponent } from '../pages/product/product.component';
import { CartComponent } from '../pages/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full'},
  { path: 'about', component: AboutComponent},
  { path: 'shop', component: StoreComponent},
  { path: 'cart', component: CartComponent},
  { path: 'shop/:id', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}