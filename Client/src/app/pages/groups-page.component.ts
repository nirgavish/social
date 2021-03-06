import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GroupService} from '../services/group.service';

@Component({
  template: `
    <ng-container>

      <div class="row">

        <div class="col-4">
        </div>

        <div class="col-4">
          <input (keyup)="createGroup($event)" placeholder="New Group" class="form-control"/>

          <h1>Groups</h1>
          <ul class="list-group">
            <li *ngFor="let group of groups" class="list-group-item">
              <a [routerLink]="['/group/'+group.id]">
                <app-group-avatar class="mr-1 img-sz-1" [group]="group"></app-group-avatar>
                {{group.name}}
              </a>
            </li>
          </ul>

        </div>

      </div>

    </ng-container>
  `
})

export class GroupsPageComponent implements OnInit {
  groupFeed: Object;
  private groups: Object;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title, private groupService: GroupService) {
  }

  ngOnInit() {
    this.refreshGroups();
    this.titleService.setTitle('Groups');
  }

  async createGroup(event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      const newGroup = await this.groupService.create({name: event.target.value});
      this.router.navigateByUrl(`/group/${newGroup['id']}`);
/*
      event.target.value = '';
      this.refreshGroups();
*/
    }
  }

  async refreshGroups() {
    this.groups = this.groups = await this.groupService.list();
  }

}
