import { Component,inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../../models/housing-location';
import { CommonModule } from '@angular/common';
import { HousingService } from '../../services/housing-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule],
  template: `
    <section>
      <form id="filter-form">
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location  
      *ngFor='let housingLocation of housingLocationFiltered'
      [housingLocationChild]='housingLocation'>
    
    </app-housing-location>
    </section>
  `,
})
export class HomeComponent {


  housingLocationsParetValue: HousingLocation[] = []
  housingLocationFiltered: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocations:HousingLocation[]) => { 
      this.housingLocationsParetValue = housingLocations;
      this.housingLocationFiltered = this.housingLocationsParetValue;
    });
  
  }
  
  filterResults(filter: string) {
    if(filter){
      this.housingLocationFiltered = this.housingLocationsParetValue.filter((housingLocation) => {
        return housingLocation.city.toLowerCase().includes(filter.toLowerCase());
      });
    }else{
      this.housingLocationFiltered = this.housingLocationsParetValue;
    }
    }
}

