import {Component, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-comment',
  template: `
    <div class="media mt-4 mb-4" *ngIf="!deleted">
      <app-user-avatar class="mr-3 img-sz-2" [user]="comment.user"></app-user-avatar>
      <div class="media-body">
        <a class="small d-block font-weight-bold"
           [routerLink]="['/user/'+comment.user?.id]">{{comment.user?.name}}</a>
        <div title="{{comment.dateCreated}}" class="small text-muted">{{comment.dateCreated | timeAgo}}</div>
        {{comment.body}}
      </div>
      <div *ngIf="authService.identity && comment.user.id===authService.identity.id">
        <div class="dropdown">
          <button type="button" class="btn btn-xs btn-primary dropdown-toggle float-right"
                  data-toggle="dropdown"></button>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" href="javascript:;" (click)="deleteComment(comment.id)">Delete</a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CommentComponent implements OnInit {
  deleted: boolean;

  @Input() comment;
  @Input() post;
  @Output() deleteEvent = new EventEmitter<any>();

  async deleteComment() {
    this.deleted = true;
    await this.postService.deleteComment(this.post.id, this.comment.id);
    this.deleteEvent.emit();
  }

  constructor(private authService: AuthService, private postService: PostService) {}

  ngOnInit() {}

}
