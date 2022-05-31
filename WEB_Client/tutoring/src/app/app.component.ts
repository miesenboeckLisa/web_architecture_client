import { Component } from '@angular/core';
import {Offer} from "./shared/offer";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl:'./app.component.html'

})
export class AppComponent {
  listOn = true;
  detailsOn = false;

  offer: Offer | undefined;

  constructor(private authService: AuthenticationService) { }

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(offer: Offer) {
    this.offer = offer;
    this.listOn = false;
    this.detailsOn = true;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }


}
