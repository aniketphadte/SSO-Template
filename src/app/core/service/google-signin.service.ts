import { AppSettingsService } from './../../shared/app-settings.service';

import { HttpClientService } from './http-client.service';
import { LoginDetails } from './../../shared/models/login-details.model';
import { HashGeneratorService } from './hash-generator.service';
import { IHashGeneratorService } from './../interfaces/ihash-generator-service';
import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, timestamp } from 'rxjs';
import { TokenDetails } from 'src/app/shared/models/token-details.model';
import { AppSettings } from 'src/app/shared/app-settings';

@Injectable({
  providedIn: 'root'
})

export class GoogleSigninService {

  private auth2: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  private appSettings: AppSettings;

  constructor(private appSettingsService: AppSettingsService, @Inject(HashGeneratorService) private  hashService: IHashGeneratorService, private httpClientService: HttpClientService ) { 
    this.appSettingsService.getSetting().subscribe(settings => this.appSettings = settings);

    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: this.appSettings.GoogleSettings.clientId//'953957970538-lvlb6rm2u93chd3p3ba1skecho6j2el7.apps.googleusercontent.com'
      })
    })
  }

  public signin(){
    this.auth2.signIn({
      scope: this.appSettings.GoogleSettings.scope//'https://www.googleapis.com/auth/userinfo.email'
    }).then(user => {
      this.subject.next(user);
      var googleResponse = JSON.stringify(user);
      var tokenDetails = this.getTokenDetails(googleResponse);
      var hash = this.hashService.CreateHash<TokenDetails>(tokenDetails,"salt");
      var loginDetails = new LoginDetails(tokenDetails, hash);
      var baseUri: string = this.appSettings.endpointUri;
      var x = this.httpClientService.post<LoginDetails, any>(baseUri+'api/auth/signin', loginDetails).subscribe();
    }).catch(() =>{
      //Catch error
      //this.subject.next(null)
    })
  }

  public signOut(){
    this.auth2.signOut().then(()=>{
      //this.subject.next(null)
    })
  }

  public observable() : Observable<gapi.auth2.GoogleUser>{
    return this.subject.asObservable();
  }

  private getTokenDetails(googleResponse : string): TokenDetails{
    var parsedJsonResponse = JSON.parse(googleResponse);
      
      var userId = parsedJsonResponse.it.Tt;
      var idToken = parsedJsonResponse.Zb.id_token;
      var issueTimestamp = parsedJsonResponse.Zb.first_issued_at;
      var timestampNow = Math.floor((new Date()).getTime() / 1000);
      var tokenDetails = new TokenDetails(userId,idToken,issueTimestamp, timestampNow);

      return tokenDetails;
  }
  
}
