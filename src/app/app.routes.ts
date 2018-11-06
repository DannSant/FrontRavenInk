import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';


const app_routes: Routes = [
  { path: 'home', component: HomeComponent },  
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);