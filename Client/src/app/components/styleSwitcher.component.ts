import {Component} from '@angular/core';

export const StyleSwitcherId = 'styleSwitcherEmbeddedStylesheet';

export const Themes = [
  {name: 'cerulean', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/cerulean/bootstrap.min.css'},
  {name: 'cosmo', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/cosmo/bootstrap.min.css'},
  {name: 'cyborg', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/cyborg/bootstrap.min.css'},
  {name: 'darkly', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/darkly/bootstrap.min.css'},
  {name: 'flatly', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/flatly/bootstrap.min.css'},
  {name: 'journal', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/journal/bootstrap.min.css'},
  {name: 'litera', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/litera/bootstrap.min.css'},
  {name: 'lumen', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/lumen/bootstrap.min.css'},
  {name: 'lux', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/lux/bootstrap.min.css'},
  {name: 'materia', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/materia/bootstrap.min.css'},
  {name: 'minty', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/minty/bootstrap.min.css'},
  {name: 'pulse', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/pulse/bootstrap.min.css'},
  {name: 'sandstone', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/sandstone/bootstrap.min.css'},
  {name: 'simplex', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/simplex/bootstrap.min.css'},
  {name: 'sketchy', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/sketchy/bootstrap.min.css'},
  {name: 'slate', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/slate/bootstrap.min.css'},
  {name: 'solar', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/solar/bootstrap.min.css'},
  {name: 'spacelab', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/spacelab/bootstrap.min.css'},
  {name: 'superhero', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/superhero/bootstrap.min.css'},
  {name: 'united', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/united/bootstrap.min.css'},
  {name: 'yeti', url: '//stackpath.bootstrapcdn.com/bootswatch/4.1.0/yeti/bootstrap.min.css'}
];

@Component({
  selector: 'app-style-switcher',
  template: `
    <div class="widget">

      <div class="dropup">
        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
          <i class="fa fa-cog"></i>
        </button>
        <div class="dropdown-menu">
          <a *ngFor="let theme of themes" class="dropdown-item" (click)="setTheme(theme.name)">{{theme.name}}</a>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .widget {
      position: fixed;
      bottom: 1em;
      right: 1em;
      z-index: 999999999999999;
    }

  `]
})
export class StyleSwitcherComponent {
  themes: typeof Themes;

  attachTheme(url) {

    const element = document.querySelectorAll(`link[id=${StyleSwitcherId}]`)[0];
    if (element) {
      element.parentNode.removeChild(element);
    }

    const head = document.head;
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = StyleSwitcherId;
    link.href = url;
    head.appendChild(link);
  }

  setTheme(id) {
    localStorage.setItem('_theme', id);
    const currentTheme = this.getThemeByName(this.getTheme());
    // document.getElementById(StyleSwitcherId).setAttribute('url', currentTheme.url);
    this.attachTheme(currentTheme.url);
  }

  getTheme() {
    return localStorage.getItem('_theme') || 'yeti';
  }

  constructor() {
    this.themes = Themes;

    const currentTheme = this.getThemeByName(this.getTheme());
    this.attachTheme(currentTheme.url);
  }

  getThemeByName(name) {
    return this.themes.filter((_t) => _t.name === name)[0];
  }
}
