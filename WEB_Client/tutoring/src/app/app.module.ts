import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferListItemComponent } from './offer-list-item/offer-list-item.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import {TutoringService} from "./shared/tutoring.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MySpaceComponent } from './my-space/my-space.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {LoginInterceptorService} from "./shared/login-interceptor.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { AppointmentListComponent } from './appointment-list/appointment-list.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferListComponent,
    OfferListItemComponent,
    OfferDetailComponent,
    HomeComponent,
    SearchComponent,
    MySpaceComponent,
    OfferFormComponent,
    LoginComponent,
    AppointmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [TutoringService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
