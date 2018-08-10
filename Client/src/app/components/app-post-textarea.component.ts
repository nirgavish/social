import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-post-textarea',
  template: `
    <div class="mb-4" *ngIf="authService.identity">
      <textarea [(ngModel)]="postValue" class="container"></textarea>
      <div>
        <button (click)="submitPost()" class="container btn btn-primary">Publish</button>
      </div>
    </div>
  `,
})
export class PostTextareaComponent implements OnInit {
  postValue: any;

  @Input() groupId;

  @Output() postEvent = new EventEmitter<any>();

  async submitPost() {
    console.log({body: this.postValue, group: this.groupId});
    await this.postService.create({body: this.postValue, group: this.groupId});
    this.postValue = '';
    this.postEvent.emit();
  }

  constructor(private authService: AuthService, private postService: PostService) {
  }

  ngOnInit() {
  }

}
