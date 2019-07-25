//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { app_routing } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
import { RatingModule } from 'ng-starrating';
import { ReCaptchaModule } from 'angular2-recaptcha';

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
import { UsersComponent } from './pages/admin/users/users.component';
import { UsersDetailComponent } from './pages/admin/users/users-detail.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { SubcategoriesComponent } from './pages/admin/subcategories/subcategories.component';
import { SubcategoryDetailComponent } from './pages/admin/subcategories/subcategory-detail.component';
import { CategoryDetailComponent } from './pages/admin/categories/category-detail.component';
import { CheckoutConfirmComponent } from './pages/checkout/checkout-confirm.component';

//Services
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { InventoryService } from './services/inventory.service';
import { TransactionService } from './services/transaction.service';
import {AdminGuardGuard} from './services/admin-guard.guard';
import { CategoryService } from './services/category.service';
import { SubcategoryService } from './services/subcategory.service';
import { VerifyTokenGuard } from './services/guards/verify-token.guard';
import { UserRoleService } from './services/user-role.service';
import { InventoryListsService } from './services/inventory-lists.service';
import { LanguageConfigService } from './services/language-config.service';

//Pipes
import { UserRolePipe } from './pipes/user-role.pipe';
import { UserTypePipe } from './pipes/user-type.pipe';
import { UserWholesalePipe } from './pipes/user-wholesale.pipe';
import { ProfileComponent } from './pages/profile/profile.component';
import { PwdChangeComponent } from './pages/profile/pwd-change.component';
import { BannerComponent } from './shared/banner/banner.component';
import { FirstWordPipe } from './pipes/first-word.pipe';
import { SearchComponent } from './pages/search/search.component';
import { FirstImagePipe } from './pipes/first-image.pipe';
import { ArrayImagePipe } from './pipes/array-image.pipe';
import { FooterComponent } from './shared/footer/footer.component';
import { ListDisplayComponent } from './shared/list-display/list-display.component';
import { InventoryListsComponent } from './pages/admin/inventory-lists/inventory-lists.component';
import { InventoryListsDetailComponent } from './pages/admin/inventory-lists/inventory-lists-detail.component';
import { ItemSelectorComponent } from './shared/item-selector/item-selector.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LanguagePipe } from './pipes/language.pipe';
import { LanguageDatabasePipe } from './pipes/language-database.pipe';
import { RatingService } from './services/rating.service';
import { ContactComponent } from './pages/contact/contact.component';
import { EmailService } from './services/email.service';





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
    SubcategoryDetailComponent,
    CheckoutConfirmComponent,
    UsersComponent,
    UsersDetailComponent,
    UserRolePipe,
    UserTypePipe,
    UserWholesalePipe,
    ProfileComponent,
    PwdChangeComponent,
    BannerComponent,
    FirstWordPipe,
    SearchComponent,
    FirstImagePipe,
    ArrayImagePipe,
    FooterComponent,
    ListDisplayComponent,
    InventoryListsComponent,
    InventoryListsDetailComponent,
    ItemSelectorComponent,
    LanguagePipe,
    LanguageDatabasePipe,
    ContactComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    app_routing,
    FormsModule,
    HttpClientModule,
    NgxPayPalModule,
    RatingModule,
    ReCaptchaModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    UserService,
    AlertService,
    InventoryService,
    TransactionService,
    CategoryService,
    SubcategoryService,
    AdminGuardGuard,
    VerifyTokenGuard,
    UserRoleService,
    InventoryListsService,
    LanguageConfigService,
    RatingService,
    EmailService
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
