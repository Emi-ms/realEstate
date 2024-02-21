import { Component, Input } from '@angular/core';
import { HousingLocation } from '../../models/housing-location';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  template: `
    <!-- <p>
      housing-location works!
      {{housingLocationChild.name}}
    </p> -->

    <section class="listing">
      <img class="listing-photo" [src]="housingLocationChild.photo" alt="Exterior photo of {{housingLocationChild.name}}">
      <h2 class="listing-heading">{{ housingLocationChild.name }}</h2>
      <p class="listing-location">{{ housingLocationChild.city}}, {{housingLocationChild.state }}</p>
      @if(housingLocationChild.score < 5){
        <p class="listing-rating">Rating: 😫</p>
      }@else if (housingLocationChild.score >= 5 && housingLocationChild.score <=9 ) {
        <p class="listing-rating">Rating: 😎</p>
      }@else{
        <p class="listing-rating">Rating: 🤩</p>
      }

      <a id="see-more" [routerLink]="['/details',housingLocationChild.id]">See more</a>
    </section>
      
  `,
  styles: ``
})

export class HousingLocationComponent {

  @Input() housingLocationChild!: HousingLocation;
}
