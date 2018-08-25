import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GroupService} from '../services/group.service';

@Component({
  template: `
    <ng-container>

      <div class="row">

        <div class="col-4">
        </div>

        <div class="col-8">
          <input (keyup)="createGroup($event)" placeholder="New Group" class="form-control"/>

          <h1>Groups</h1>
          <ul class="list-group">
            <li *ngFor="let group of groups" class="list-group-item"><a [routerLink]="['/group/'+group.id]">{{group.name}}</a></li>
          </ul>

        </div>

      </div>

    </ng-container>
  `
})

export class GroupsPageComponent implements OnInit {
  groupFeed: Object;
  private groups: Object;

  constructor(private route: ActivatedRoute, private titleService: Title, private groupService: GroupService) {
  }

  ngOnInit() {
    this.refreshGroups();
    this.titleService.setTitle('Groups');
  }

  async createGroup(event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      await this.groupService.create({name: event.target.value});
      event.target.value = '';
      this.refreshGroups();
    }
  }

  async refreshGroups() {
    this.groups = this.groups = await this.groupService.list();
  }

}
