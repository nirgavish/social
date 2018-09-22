import {Component, Input, OnInit} from '@angular/core';
import * as md5 from 'md5';

@Component({
  selector: 'app-user-avatar',
  template: `
    <a
      *ngIf="link!==false; else bareImage"
      [routerLink]="['/user/'+user.id]"
      title="{{user.name}}">
      <img
        *ngIf="user"
        class="{{class}}"
        src="https://www.gravatar.com/avatar/{{md5(user.id)}}?d=retro"
        title="{{user.name}}"
      >
    </a>

    <ng-template #bareImage>
      <img
        *ngIf="user"
        class="{{class}}"
        src="https://www.gravatar.com/avatar/{{md5(user.id)}}?d=retro"
        title="{{user.name}}"
      >
    </ng-template>
  `,
  styles: [`
  `]
})
export class UserAvatarComponent implements OnInit {
  md5: any;

  @Input() user;
  @Input() class;
  @Input() link: boolean;

  constructor() {
    this.md5 = md5;
  }

  ngOnInit() {
  }

}
