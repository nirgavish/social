import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-top-nav',
  template: `

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top mb-3">
      <div class="container">
        <a class="navbar-brand" [routerLink]="['']">
          <img class="position-absolute ml-2" style="margin-top:-0.3em;" src="assets/logo.png"/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar01"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbar01">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="javascript:;" [routerLink]="['']">Home</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="javascript:;" [routerLink]="['/groups']">Groups</a>
            </li>
          </ul>
          <ng-container *ngIf="authService.isLoggedIn; else loginWidget">

            <div class="dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                <app-user-avatar class="ml-1 mr-1 img-sz-1" [user]="authService.identity" [link]="false"></app-user-avatar>
                <b>{{authService.identity.name}}</b>
              </button>
              <div class="dropdown-menu">
                <a (click)="logout()" class="dropdown-item" href="javascript:;">Logout</a>
              </div>
            </div>
          </ng-container>

          <ng-template #loginWidget>
            <div class="form-inline">
              <input type="text" class="form-control" [(ngModel)]="email" placeholder="Email">
              <input type="password" class="form-control" [(ngModel)]="password" placeholder="Password">
              <button (click)="login();" class="btn btn-primary">Login</button>
            </div>
          </ng-template>

        </div>
      </div>
    </nav>

    <nav class="navbar mb-3"><button class="btn">&nbsp;</button></nav>
  `,
})
export class TopNavComponent implements OnInit {

  private email;
  private password;

  login() {
    this.authService.login(this.email, this.password);
  }

  logout() {
    this.authService.logout();
  }

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

}
