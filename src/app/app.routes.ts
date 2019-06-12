import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/login/register.component";
import { CatalogComponent } from "./pages/catalog/catalog.component";
import { ItemViewComponent } from "./pages/item-view/item-view.component";
import { CartReviewComponent } from "./pages/cart-review/cart-review.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { InventoryComponent } from "./pages/admin/inventory/inventory.component";

import { AdminGuardGuard } from "./services/admin-guard.guard";
import { InventoryDetailComponent } from "./pages/admin/inventory/inventory-detail.component";
import { VerifyTokenGuard } from "./services/guards/verify-token.guard";
import { CategoriesComponent } from "./pages/admin/categories/categories.component";
import { CategoryDetailComponent } from "./pages/admin/categories/category-detail.component";
import { SubcategoriesComponent } from "./pages/admin/subcategories/subcategories.component";
import { SubcategoryDetailComponent } from "./pages/admin/subcategories/subcategory-detail.component";
import { CheckoutConfirmComponent } from "./pages/checkout/checkout-confirm.component";
import { UsersComponent } from "./pages/admin/users/users.component";
import { UsersDetailComponent } from "./pages/admin/users/users-detail.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { PwdChangeComponent } from "./pages/profile/pwd-change.component";
import { SearchComponent } from "./pages/search/search.component";

const app_routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "catalog/:id", component: CatalogComponent },
  { path: "search/:term", component: SearchComponent },
  { path: "item/:id", component: ItemViewComponent },
  { path: "cart/:id", component: CartReviewComponent },
  { path: "checkout/:qty/:id", component: CheckoutComponent },
  { path: "login", component: LoginComponent },
  { path: "login/:redirect/:id", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "inventory",
    component: InventoryComponent,
    canActivate: [AdminGuardGuard, VerifyTokenGuard]
  },
  {
    path: "inventoryDetail/:id",
    component: InventoryDetailComponent,
    canActivate: [AdminGuardGuard, VerifyTokenGuard]
  },
  {
    path: "category",
    component: CategoriesComponent,
    canActivate: [AdminGuardGuard, VerifyTokenGuard]
  },
  {
    path: "categoryDetail/:id",
    component: CategoryDetailComponent,
    canActivate: [AdminGuardGuard, VerifyTokenGuard]
  },
  {
    path: "subcategory",
    component: SubcategoriesComponent,
    canActivate: [AdminGuardGuard, VerifyTokenGuard]
  },
  {
    path: "subcategoryDetail/:id",
    component: SubcategoryDetailComponent,
    canActivate: [AdminGuardGuard, VerifyTokenGuard]
  },
  {
    path: "user",
    component: UsersComponent,
    canActivate: [AdminGuardGuard, VerifyTokenGuard]
  },
  {
    path: "userDetail/:id",
    component: UsersDetailComponent,
    canActivate: [AdminGuardGuard, VerifyTokenGuard]
  },
  {
    path: "checkoutConfirm",
    component: CheckoutConfirmComponent,
    canActivate: [VerifyTokenGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [VerifyTokenGuard]
  },
  {
    path: "pwdChange",
    component: PwdChangeComponent,
    canActivate: [VerifyTokenGuard]
  },

  { path: "**", pathMatch: "full", redirectTo: "home" }
];

export const app_routing = RouterModule.forRoot(app_routes);
