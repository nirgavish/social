import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from "../services/post.service";

@Component({
  template: `
    <div class="row">

      <div class="col-3">
      </div>

      <div class="col-6">
        <div class="mb-2 card p-2 shadow-sm" *ngIf="post">
          <app-post [postPageMode]="true" [post]="post"></app-post>
        </div>
      </div>

    </div>
`
})

export class PostPageComponent implements OnInit {
  postId: any;
  res: Object;
  private post: Object;

  constructor(private postService: PostService, private titleService: Title, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.getPost(params.id)
    });
  }

  async getPost(postId) {
    this.post = await this.postService.get(postId);
  }

}
