import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PostService} from '../services/post.service';
import {LanguageService} from "../services/language.service";

@Component({
  selector: 'app-post-textarea',
  template: `
    <div class="mb-2 shadow p-2 card" *ngIf="authService.identity">
      <div class="card">
        <medium-editor
          [(editorModel)]="postValue"
          [editorOptions]="{'toolbar': {'buttons': ['bold', 'italic', 'underline', 'h1', 'h2', 'h3']}}"
          [editorPlaceholder]="L('What do you want to say?')"
          class="p-1"
        >
        </medium-editor>
      </div>
      <div>
        <button (click)="submitPost()" class="container btn btn-primary">{{L('Publish')}}</button>
      </div>
    </div>
  `,
})
export class PostTextareaComponent implements OnInit {
  L;
  postValue: any = '';

  @Input() groupId;
  @Output() postEvent = new EventEmitter<any>();

  async submitPost() {
    await this.postService.create({body: this.postValue, group: this.groupId});
    this.postValue = '';
    this.postEvent.emit();
  }

  constructor(private authService: AuthService, private postService: PostService, private languageService: LanguageService) {
    this.L = languageService.get;
  }

  ngOnInit() {
  }

}
