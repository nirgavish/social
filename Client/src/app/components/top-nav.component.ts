import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-top-nav',
  template: `

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top mb-3">
      <div class="container">
        <a class="navbar-brand" [routerLink]="['']">
          <img class="position-absolute ml-2" style="margin-top:-0.3em;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAmCAYAAABH/4KQAAACyElEQVR42u2YTYiNURjH7x0Z3x+jhhExiyk1NyOmSTMZWSpdLCwspAxZiEg0Gwqr2Qil7IjbWNggFsICiZURkyghsfCVGfkczPv6nTpXt3ee877nvB9zFzz169zuPc9z/u/5eN7n3Fzuv1XZfN+vgS3wAL7BTxiEm9BaTWG1nucdpvV8s60ZbVEFOA8f/WgbgKasBY2BlVAyiBjUQgb08v41ZvcCTT6TpYMOBnhfOR4M8d0L2h6YKvh1Qb/u94m2Lk1RE2AjgR8Ls3QX2mC8RZxmYtyh7U1D1EzYDU8EUV9hb4yYk/TBmR1XVB3sCdnYSlgh4YOPjbPR6+FpiLBfUDTNCiyHDdCe6sYn2Prg6QoaS3LG4Nsl9FWbv1s9dBriXkbkqe/QGPDJw9YIP3VSa5OK+xExSEnwmadfU2E2DGezFKcG6BB8lvn2Vowtjj3yLiTwELQI4koO4i4nmbnTIQfhM02D8EAPfTdbHFfcQlNVocXNEnyOOoq7HjvF4HjEIO6LlNX5bomjOPW2GSftXduC8Y0QVJ3IRUL/RkdxamVmCHEOWOVDZumKIWinEDSvK18Xk8QdZNw+m9lrMQQ9aejf5iBs2CDumv69EPfkqqWtMfTvsVpTz3tFM1GY/XIiP2Qjrt0Qf5uhf73lzJ0QfDdXvo+tShp4JgS/F+LTEKiSR/jCNGGP91X0uWSbVpbCb2GQUxF+x/SFp5wz1edzweXUfXfACpjrXN8FnqpsqqxqtqiiVQ5slZJ3WjXeJsMSva3qRblCYH/IFbDJdIJHS9zOsGqFpb/qEKsTtsMuOA63E/0ToPdPVP76ABf1g6zWIhTrYB/cClwBXutX1pws956rPddip6S5tJN1dk9iq9QFPau91xtD0A1Ym/iCYyFuuqGcGlGYqkMi3TmyFliMEKb+RZpfzdSyAPbDfXik67luXebnc/+K/QEe6Lt7HhJd6gAAAABJRU5ErkJggg=="/>
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
                <app-user-avatar class="ml-1 mr-1 img-sz-1" [user]="authService.identity"></app-user-avatar>
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
