import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {TopNavComponent} from './components/top-nav.component';
import {PostComponent} from './components/post.component';
import {HomePageComponent} from './pages/home-page.component';
import {UserPageComponent} from './pages/user-page.component';
import {PostTextareaComponent} from './components/app-post-textarea.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {GroupPageComponent} from './pages/group-page.component';
import {UserAvatarComponent} from './components/user-avatar.component';
import {PostPageComponent} from './pages/post-page-component';
import {GroupsPageComponent} from './pages/groups-page.component';
import {StyleSwitcherComponent} from './components/styleSwitcher.component';
import {CommentComponent} from './components/comment.component';
import {PostService} from './services/post.service';
import {GroupService} from './services/group.service';
import {UserService} from './services/user.service';

import { MediumEditorDirective } from 'angular2-medium-editor';
import {GroupAvatarComponent} from "./components/group-avatar.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomePageComponent},
  {path: 'user/:id', pathMatch: 'full', component: UserPageComponent},
  {path: 'groups', pathMatch: 'full', component: GroupsPageComponent},
  {path: 'group/:id', pathMatch: 'full', component: GroupPageComponent},
  {path: 'post/:id', pathMatch: 'full', component: PostPageComponent}
];

@NgModule({
  declarations: [
    StyleSwitcherComponent,
    AppComponent,
    TopNavComponent,
    PostComponent,
    CommentComponent,
    PostTextareaComponent,
    HomePageComponent,
    UserPageComponent,
    GroupPageComponent,
    GroupsPageComponent,
    PostPageComponent,
    UserAvatarComponent,
    GroupAvatarComponent,
    MediumEditorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    PostService,
    GroupService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
