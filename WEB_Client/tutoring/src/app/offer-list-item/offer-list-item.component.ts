import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../shared/offer";

@Component({
  selector: 'a.bs-offer-list-item',
  templateUrl: './offer-list-item.component.html',
  styles: [
  ]
})
export class OfferListItemComponent implements OnInit {

  @Input() offer: Offer | undefined
  constructor() { }

  ngOnInit(): void {
  }

  getCounter(){

  }

}
