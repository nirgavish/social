import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  styles: [`
  `],
  template: `
    <ng-container *ngIf="authService.isLoggedIn!==undefined">
      <app-top-nav></app-top-nav>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
      <!--<app-style-switcher></app-style-switcher>-->
    </ng-container>
  `
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  // TODO: Handle walled garden on the application level (login screen)
}
