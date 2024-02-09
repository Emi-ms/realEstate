import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HouseDetailsComponent } from './components/house-details/house-details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, title: 'Home page'},
    {path: 'details/:id', component: HouseDetailsComponent, title: 'Details page'}
];
