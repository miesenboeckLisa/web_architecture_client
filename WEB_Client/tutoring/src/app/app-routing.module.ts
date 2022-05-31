import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OfferListComponent} from "./offer-list/offer-list.component";
import {OfferDetailComponent} from "./offer-detail/offer-detail.component";
import {HomeComponent} from "./home/home.component";
import {MySpaceComponent} from "./my-space/my-space.component"
import {OfferFormComponent} from "./offer-form/offer-form.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '' , redirectTo:'home', pathMatch: 'full' },
  {path: 'home' , component: HomeComponent },
  {path: 'offers' , component: OfferListComponent },
  {path: 'offers/:id' , component: OfferDetailComponent },
  {path: 'myspace' , component: MySpaceComponent },
  {path: 'myspace/offer-form' , component: OfferFormComponent },
  {path: 'offers/offer-form/:id' , component: OfferFormComponent },
  {path: 'offer-form/offers/:id' , component: OfferDetailComponent},
  {path: 'login' , component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
