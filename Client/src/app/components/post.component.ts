import {ApplicationRef, Component, Input, OnInit} from '@angular/core';
import {ChangeDetectorRef} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PostService} from '../services/post.service';
import {LanguageService} from '../services/language.service';

@Component({
  selector: 'app-post',
  template: `
    <ng-container *ngIf="!post.deleted">

      <div class="media">

        <app-user-avatar class="mr-3 img-sz-3" [user]="post.user"></app-user-avatar>
        <div class="media-body">

          <div *ngIf="authService.identity && (post.user.id===authService.identity.id)" class="float-left">
            <div class="dropdown">
              <button type="button" class="btn btn-xs btn-primary dropdown-toggle"
                      data-toggle="dropdown"></button>
              <div class="dropdown-menu dropdown-menu-left">
                <a class="dropdown-item" href="javascript:;" (click)="deletePost()">{{L('Delete')}}</a>
              </div>
            </div>
          </div>

          <h6 class="mt-0 mb-0">
            <a class="small font-weight-bold" [routerLink]="['/user/'+post.user.id]">
              {{post.user.name}}
            </a>

            <span class="small" *ngIf="post.group">
                <i class="fa fa-caret-right mr-1 ml-1"></i>
                <a href="javascript:;" [routerLink]="['/group/'+post.group.id]">{{post.group.name}}</a>
            </span>
          </h6>
          <h6 class="mt-0 text-muted">
            <a [routerLink]="['/post/' + post.id]">
              <small class="text-muted">
                <time title="{{post.dateCreated | date}}">{{post.dateCreated | timeAgo}}</time>
              </small>
            </a>
          </h6>

          <div>
            <span [innerHTML]="postBody()"></span>
            <a class="text-nowrap small" href="javascript:;" (click)="extendTextView()"
               *ngIf="!postPageMode && post.body.length>200"> {{L('Read More')}}...</a>
          </div>


          <div class="row mt-3">
            <div class="col-6">
              <a class="btn btn-sm btn-outline-info" href="javascript:;">
                <i class="fa fa-thumbs-up fa-flip-horizontal mr-2"></i>
                <span class="small">2,312</span>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="javascript:;">25 תגובות</a>
            </div>
          </div>

          <hr/>

          <ng-container *ngIf="!post.comments; else fullComments">
            <div *ngIf="post.commentCount>1" class="mt-3 small">
              <a href="javascript:;" (click)="showComments()">
                {{post.commentCount - 1}} More Comment<span *ngIf="post.commentCount>2">s</span>...
              </a>
            </div>
            <app-comment *ngIf="post.lastComment" [post]="post" (deleteEvent)="refreshPost()"
                         [comment]="post.lastComment"></app-comment>
          </ng-container>

          <ng-template #fullComments>
            <app-comment *ngFor="let comment of post.comments" [post]="post" [comment]="comment"></app-comment>
          </ng-template>

          <div class="media mt-4" *ngIf="authService.identity; else loginToComment">
            <app-user-avatar class="img-sz-2" [user]="authService.identity" [link]="false"></app-user-avatar>
            <div class="media-body">
              <input (keyup)="postComment($event)" class="form-control"/>
            </div>
          </div>
          <ng-template #loginToComment>
            <div class="alert alert-info mt-4">{{L('Login to comment')}}</div>
          </ng-template>

        </div>


      </div>
    </ng-container>
  `,
})
export class PostComponent implements OnInit {
  L;
  extended: any;
  comments: Object = null;

  @Input() post;
  @Input() postPageMode?: boolean;
  private fullTextView: boolean;
  private extendTextViewClicked: boolean;

  constructor(private authService: AuthService, private cd: ChangeDetectorRef, private postService: PostService, private languageService: LanguageService) {
    this.L = languageService.get;
  }

  extendTextView() {
    this.postPageMode = true;
  }

  postBody() {
    if (this.postPageMode || this.post.body.length < 200) {
      return this.post.body;
    } else {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = this.post.body.substring(0, 200);
      return tmp.textContent || tmp.innerText || '';
    }
  }

  ngOnInit() {
    if (this.extended || this.postPageMode) {
      this.getExtendedComments();
    }
  }

  showComments() {
    this.extended = true;
    this.getExtendedComments();
  }

  async refreshPost() {
    this.post = await this.postService.get(this.post.id);
    this.post.deleted = true;
    this.cd.detectChanges();
    this.post.deleted = false;
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
    this.post.deleted = true;
  }

  async getExtendedComments() {
    this.post.comments = await this.postService.getComments(this.post.id);
  }

}
