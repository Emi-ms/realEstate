import { Component, OnInit, inject } from '@angular/core';
import { icon, Map, marker, tileLayer } from 'leaflet';
import { HousingService } from '../../services/housing-service';
import { HousingLocation } from '../../models/housing-location';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  template: `
  <div class="map-container">
    <h1 class="titulo">Map of the house</h1>
  <div class="mt-3">
    <button class="btn btn-secondary" (click)="reloadLocation()">Reload Map</button>
  </div>
  <hr>
  <div id="map"></div>
  <div>
  `,
  styles: ``
})
export class MapComponent implements OnInit {

  map: any;
  house?: HousingLocation;
  route?: ActivatedRoute = inject(ActivatedRoute);
  latitude?: number;
  longitude?: number;

  constructor(private housingService: HousingService) { }

  ngOnInit(): void {
    this.housingService.getHousingLocationById(this.route?.snapshot.params['id']).then((house: HousingLocation) => {
      this.house = house;
      console.log(this.house);
    });

  setTimeout(() => {

      this.latitude = this.house?.coordinate.latitude;
      this.longitude = this.house?.coordinate.longitude;


    }, 2000);

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.latitude);
      console.log(this.longitude);
      if (this.latitude !== undefined && this.longitude !== undefined) {
        this.map = new Map('map').setView([this.latitude, this.longitude], 13);
        const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(this.map);

        marker([this.latitude, this.longitude]).addTo(this.map).bindPopup(`<h5>This is the geolocation of <br><b> ${this.house?.name}</b></h5>`).openPopup();
      }
    }, 2000);
    
  }

  getLocation() {

  }

  reloadLocation() {
    location.reload();
  }
}
