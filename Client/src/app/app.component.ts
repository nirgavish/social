import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ConfigService} from './services/config.service';

@Component({
  selector: 'app-root',
  styles: [`
  `],
  template: `
    <ng-container *ngIf="configService.config!==undefined && authService.isLoggedIn!==undefined">

      <ng-container *ngIf="(authService.isLoggedIn || configService.config.walledGarden==='false') ; else walledGarden">
        <app-top-nav></app-top-nav>
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </ng-container>

      <ng-template #walledGarden>
        <app-walled-garden-welcome-screen></app-walled-garden-welcome-screen>
      </ng-template>

    </ng-container>

    <!--<pre style="position:fixed;bottom:0;left:0;background-color:#fff;">{{configService.config | json}}<hr/>{{authService | json}}</pre>-->
  `
})
export class AppComponent {
  constructor(private authService: AuthService, private configService: ConfigService) {
  }

  // TODO: Handle walled garden with login/register screen
}
