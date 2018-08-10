import {ApplicationRef, Component, Input, OnInit} from '@angular/core';
import {ChangeDetectorRef} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-post',
  template: `
    <ng-container *ngIf="!deleted">
      <div class="media">

        <app-user-avatar class="mr-3 img-sz-4" [user]="post.user"></app-user-avatar>
        <div class="media-body">
          <a class="small font-weight-bold" [routerLink]="['/user/'+post.user.id]">{{post.user.name}}</a>
          <span class="small" *ngIf="post.group">
          <i class="fa fa-caret-right mr-1 ml-1"></i>
          <a href="javascript:;" [routerLink]="['/group/'+post.group.id]">{{post.group.name}}</a>
        </span>

          <a [routerLink]="['/post/' + post.id]">
            <div class="small text-muted">{{post.dateCreated}}</div>
          </a>
          {{post.body}}

          <ng-container *ngIf="!post.comments; else fullComments">
            <div *ngIf="post.commentCount>1" class="mt-3 small">
              <a href="javascript:;" (click)="showComments()">
                {{post.commentCount - 1}} More Comment<span *ngIf="post.commentCount>2">s</span>...
              </a>
            </div>
            <app-comment *ngIf="post.lastComment" [post]="post" (deleteEvent)="refreshPost()" [comment]="post.lastComment"></app-comment>
          </ng-container>

          <ng-template #fullComments>
            <app-comment *ngFor="let comment of post.comments" [post]="post" [comment]="comment"></app-comment>
          </ng-template>

          <div class="media mt-4" *ngIf="authService.identity; else loginToComment">
            <app-user-avatar class="mr-3 img-sz-2" [user]="authService.identity"></app-user-avatar>
            <div class="media-body">
              <input (keyup)="postComment($event)" class="form-control"/>
            </div>
          </div>
          <ng-template #loginToComment>
            <div class="alert alert-secondary mt-4">Login to comment</div>
          </ng-template>

        </div>
        <div *ngIf="authService.identity && (post.user.id===authService.identity.id)" class="mr-2">
          <div class="dropdown">
            <button type="button" class="btn btn-sm btn-basic dropdown-toggle float-right"
                    data-toggle="dropdown"></button>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="javascript:;" (click)="deletePost()">Delete</a>
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-5"/>
    </ng-container>
  `,
})
export class PostComponent implements OnInit {
  deleted: boolean;
  comments: Object = null;

  @Input() post;
  @Input() extended?: boolean;

  constructor(private authService: AuthService, private cd: ChangeDetectorRef, private postService: PostService) {
  }

  ngOnInit() {
    if (this.extended) {
      this.getExtendedComments();
    }
  }

  showComments() {
    this.extended = true;
    this.getExtendedComments();
  }

  async refreshPost() {
    console.warn('REFRESH POST')
    this.post = await this.postService.get(this.post.id);
    this.deleted = true;
    this.cd.detectChanges();
    this.deleted = false;
  }

  async postComment(event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      this.post = await this.postService.postComment(this.post.id, event.target.value);
      event.target.value = '';
      if (this.extended) {
        this.getExtendedComments();
      }
    }
  }

  async deletePost() {
    await this.postService.delete(this.post.id);
    this.deleted = true;
  }

  async getExtendedComments() {
    this.post.comments = await this.postService.getComments(this.post.id);
  }

}
