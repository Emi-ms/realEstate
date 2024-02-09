import { Component } from '@angular/core';
import{ RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  template: `<div class="nav-bar">
     <a [routerLink] = "['/']">
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
      </header>
      </a>
      <div>
  `,
  styles: ``
})
export class NavBarComponent {

}
