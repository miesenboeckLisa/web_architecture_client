import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Appointment, Offer} from "../shared/offer";
import {TutoringService} from "../shared/tutoring.service";
import {Category} from "../shared/category";
import {User} from "../shared/user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-offer-list',
  templateUrl: './offer-list.component.html',
  styles: [
  ]
})
export class OfferListComponent implements OnInit {

  offers: Offer[] = [] ;
  @Output() showDetailsEvent = new EventEmitter<Offer>();

  constructor(private service:TutoringService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(res=> this.offers = res);

  }
  showDetails(offer: Offer) {
    this.showDetailsEvent.emit(offer);
  }

 offerSelected(offer:Offer){
    this.router.navigate(['../offers', offer.id], {relativeTo: this.route});
  }

}
