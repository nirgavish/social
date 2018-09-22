import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

// TODO: Layout and visuals for walled garden screen
// TODO: Encapsulate login form in a component and replace it in walled garden AND navbar

@Component({
  selector: 'app-walled-garden-welcome-screen',
  template: `
    <h1>Walled Garden</h1>
    <div class="form-inline">
      <input type="text" class="form-control" [(ngModel)]="email" placeholder="Email">
      <input type="password" class="form-control" [(ngModel)]="password" placeholder="Password">
      <button (click)="login();" class="btn btn-primary">Login</button>
    </div>
  `,
  styles: [``]
})
export class WalledGardenWelcomeScreenComponent implements OnInit {
  private email;
  private password;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password);
  }

}
