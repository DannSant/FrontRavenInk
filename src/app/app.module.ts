//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { app_routing } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ItemViewComponent } from './pages/item-view/item-view.component';
import { CartReviewComponent } from './pages/cart-review/cart-review.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { InventoryComponent } from './pages/admin/inventory/inventory.component';
import { InventoryDetailComponent } from './pages/admin/inventory/inventory-detail.component';

//Services
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { InventoryService } from './services/inventory.service';
import { TransactionService } from './services/transaction.service';
import {AdminGuardGuard} from './services/admin-guard.guard';
import { CategoryService } from './services/category.service';
import { SubcategoryService } from './services/subcategory.service';
import { VerifyTokenGuard } from './services/guards/verify-token.guard';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { SubcategoriesComponent } from './pages/admin/subcategories/subcategories.component';
import { SubcategoryDetailComponent } from './pages/admin/subcategories/subcategory-detail.component';
import { CategoryDetailComponent } from './pages/admin/categories/category-detail.component';


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
    CheckoutComponent,
    InventoryComponent,
    InventoryDetailComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    SubcategoriesComponent,
    SubcategoryDetailComponent
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
    TransactionService,
    CategoryService,
    SubcategoryService,
    AdminGuardGuard,
    VerifyTokenGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
