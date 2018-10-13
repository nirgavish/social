import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {TopNavComponent} from './components/top-nav.component';
import {PostComponent} from './components/post.component';
import {HomePageComponent} from './pages/home-page.component';
import {UserPageComponent} from './pages/user-page.component';
import {PostTextareaComponent} from './components/post-textarea.component';
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
import {ConfigService} from './services/config.service';

import {TimeAgoPipe} from 'time-ago-pipe';

import { MediumEditorDirective } from 'angular2-medium-editor';
import {GroupAvatarComponent} from './components/group-avatar.component';
import {ApiInterceptor} from './interceptors/api.interceptor';
import { WalledGardenWelcomeScreenComponent } from './pages/walled-garden-welcome-screen.component';
import { FeedComponent } from './components/feed.component';

import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he';
import {LanguageService} from "./services/language.service";
registerLocaleData(localeHe, 'he');

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
    TimeAgoPipe,
    WalledGardenWelcomeScreenComponent,
    FeedComponent,
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
    LanguageService,
    PostService,
    GroupService,
    UserService,
    ConfigService,
    { provide: LOCALE_ID, useValue: 'he-IL' },
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
