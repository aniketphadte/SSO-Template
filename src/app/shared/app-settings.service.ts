import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSettings } from './app-settings';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  constructor() { }

  getSetting(): Observable<AppSettings>{
    let settings = new AppSettings();
    return  of<AppSettings>(settings);
  }
}
