import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    RouterLink,
  NavBarComponent],
  template: `
    <main>
    <app-nav-bar/>
      <section class="content">
        <!-- <app-home></app-home> -->
        <router-outlet />
      </section>

    
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = 'realEstate';
}
