import {Component, Input, OnInit} from '@angular/core';
import * as md5 from 'md5';

@Component({
  selector: 'app-group-avatar',
  template: `<img *ngIf="group" class="{{class}}" src="https://www.gravatar.com/avatar/{{md5(group.id)}}?d=retro" title="{{group.name}}">`,
  styles: [`
  `]
})
export class GroupAvatarComponent implements OnInit {
  md5: any;

  @Input() group;
  @Input() class;

  constructor() {
    this.md5 = md5;
  }

  ngOnInit() {
  }

}
