import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { app_routing } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register.component';

import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { InventoryService } from './services/inventory.service';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ItemViewComponent } from './pages/item-view/item-view.component';
import { CartReviewComponent } from './pages/cart-review/cart-review.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { TransactionService } from './services/transaction.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CatalogComponent,
    ItemViewComponent,
    CartReviewComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    app_routing,
    FormsModule,
    HttpClientModule,
    NgxPayPalModule
  ],
  providers: [
    UserService,
    AlertService,
    InventoryService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
