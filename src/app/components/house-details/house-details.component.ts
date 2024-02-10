import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../../models/housing-location';
import { HousingService } from '../../services/housing-service';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <article id="detail-card">
    <img class="listing-photo-detail" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
    <section class="listing-description">
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>
      
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Available units: {{ housingLocation.availableUnits }}</li>
        <li>Wifi available: {{ housingLocation.wifi ? 'Yes' : 'No' }}</li>
        <li >Laundry facilities available: {{housingLocation.laundry?'Yes':'No'}}</li>
      </ul>
      <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">
        <button type="submit" class="primary">Apply now</button>
      </form>
    </section>
    </section>


  </article>
    
  `,
  styles: ``
})
export class HouseDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocationId: number = -1;
  housingLocation!: HousingLocation;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id']);

    this.housingService.getHousingLocationById(this.housingLocationId).then((housingLocation: HousingLocation) => {
    this.housingLocation = housingLocation;
    });

  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
