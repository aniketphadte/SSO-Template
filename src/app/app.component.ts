import { GoogleSigninService } from './core/service/google-signin.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers :[GoogleSigninService]
})
export class AppComponent implements OnInit{
  title = 'sso-template';

  user : gapi.auth2.GoogleUser;

  constructor(private signinservice: GoogleSigninService, private ref: ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.signinservice.observable().subscribe( user => {
      this.user =  user;
      this.ref.detectChanges();
    })
  }

  signIn(type: string) {
    if(type == 'google'){
      this.signinservice.signin();
    }
  }

  signOut(){
    this.signinservice.signOut();
  }
}
