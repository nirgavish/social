import {Injectable} from '@angular/core';

import {he} from './languages/he.language';
import {environment} from '../../environments/environment';

const allLanguages = {
  he,
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() {
  }

  get(key) {
    return (allLanguages[environment.language]) ? allLanguages[environment.language][key] || key : key;
  }
}
