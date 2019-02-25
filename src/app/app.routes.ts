import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ItemViewComponent } from './pages/item-view/item-view.component';
import { CartReviewComponent } from './pages/cart-review/cart-review.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';


const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'catalog/:id', component: CatalogComponent },
  { path: 'item/:id', component: ItemViewComponent },
  { path: 'cart/:id', component: CartReviewComponent },
  { path: 'checkout/:qty/:id', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirect/:id', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);
