import {Component, Input, OnInit} from '@angular/core';
import * as md5 from 'md5';

@Component({
  selector: 'app-user-avatar',
  template: `<img *ngIf="user" class="{{class}}" src="https://www.gravatar.com/avatar/{{md5(user.id)}}?d=retro" alt="{{user.name}}">`,
  styles: [`
  `]
})
export class UserAvatarComponent implements OnInit {
  md5: any;

  @Input() user;
  @Input() class;

  constructor() {
    this.md5 = md5;
  }

  ngOnInit() {
  }

}
