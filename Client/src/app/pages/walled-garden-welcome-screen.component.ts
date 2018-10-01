import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {ConfigService} from '../services/config.service';

// TODO: Layout and visuals for walled garden screen
// TODO: Encapsulate login form in a component and replace it in walled garden AND navbar

@Component({
  selector: 'app-walled-garden-welcome-screen',
  template: `
    <h1>Walled Garden</h1>

    <h2>Login</h2>
    <div class="form-inline">
      <input type="text" class="form-control" [(ngModel)]="model.login_email" placeholder="Email">
      <input type="password" class="form-control" [(ngModel)]="model.login_password" placeholder="Password">
      <button (click)="login();" class="btn btn-primary">Login</button>
    </div>

    <h2>Register</h2>
    <div class="form-inline" *ngIf="configService.config.usersMayRegister">
      <input type="text" class="form-control" [(ngModel)]="model.register_name" placeholder="Name">
      <input type="text" class="form-control" [(ngModel)]="model.register_email" placeholder="Email">
      <input type="password" class="form-control" [(ngModel)]="model.register_password" placeholder="Password">
      <button (click)="register();" class="btn btn-default">Register</button>
    </div>


  `,
  styles: [``]
})
export class WalledGardenWelcomeScreenComponent implements OnInit {
  model: any = {};
/*
  private name;
  private email;
  private password;
*/

  constructor(private authService: AuthService, private userService: UserService, private configService: ConfigService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model.login_email, this.model.login_password);
  }

  register() {
    this.userService.create({name: this.model.register_name, email: this.model.register_email, password: this.model.register_password});
  }

}
