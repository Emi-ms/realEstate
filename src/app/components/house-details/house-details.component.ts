import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../../models/housing-location';
import { HousingService } from '../../services/housing-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { RouterLink } from '@angular/router';
import { Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [ReactiveFormsModule,
    MapComponent,
    RouterLink,
    NgClass],
  template: `
  <article id="detail-card">
    <img class="listing-photo-detail" [src]="housingLocation?.photo">
    <section class="listing-description">
      <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
      <p class="listing-location">{{ housingLocation?.city}}, {{housingLocation?.state }}</p>
    </section>
    <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Available units: {{ housingLocation?.availableUnits }}</li>
          <li>Wifi available: {{ housingLocation?.wifi ? 'Yes' : 'No' }}</li>
          <li >Laundry facilities available: {{housingLocation?.laundry?'Yes':'No'}}</li>
        </ul>
        <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" [ngClass]="{'invalid-input': applyForm.controls.firstName.invalid && applyForm.controls.firstName.touched}">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName"  [ngClass]="{'invalid-input': applyForm.controls.lastName.invalid && applyForm.controls.lastName.touched }">

          <label for="email">Email</label>
          <input id="email" type="text" formControlName="email" [ngClass]="{'invalid-input': applyForm.controls.email.invalid && applyForm.controls.email.touched}">
   
          <button type="submit" class="primary">Apply now</button>
          <button type="reset" class="secondary" (click)="forgetData()">Forget data</button>
        </form>
      </section>
    </section>
    <button class="primary" routerLink="/map/{{housingLocation?.id}}">See geolocation</button>
  </article>
    
  `,
  styles: ``
})
export class HouseDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  housingService: HousingService = inject(HousingService);
  housingLocationId: number = -1;
  housingLocation: HousingLocation | null | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
  })

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id']);

    this.housingService.getHousingLocationById(this.housingLocationId).then((housingLocation: HousingLocation) => {
      this.housingLocation = housingLocation;
    });

    const formDataLocalStorage = localStorage.getItem('formDataLocalStorage');
    if (formDataLocalStorage) {
      const formData = JSON.parse(formDataLocalStorage);
      this.applyForm.setValue(formData);
    }

  }

  submitApplication() {
    if (this.applyForm.invalid) {
      console.log('Form is invalid');
      alert("The form has invalid data, please check the fields and try again.")


    } else {
      localStorage.setItem('formDataLocalStorage', JSON.stringify(this.applyForm.value));

      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
      );
      alert("Application submitted successfully!");
      this.router.navigate(['/']);

    }
  }

  forgetData() {
    localStorage.removeItem('formDataLocalStorage');
    location.reload();
  }
}

