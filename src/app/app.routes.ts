import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HouseDetailsComponent } from './components/house-details/house-details.component';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, title: 'Home page'},
    {path: 'details/:id', component: HouseDetailsComponent, title: 'Details page'},
    {path: 'map/:id', component: MapComponent, title: 'Map page'}
];
