import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs";
import {TutoringService} from "../shared/tutoring.service";
import {Offer} from "../shared/offer";

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  keyup = new EventEmitter<string>();
  foundOffers : Offer[] = [];
  isLoading = false;
  @Output() offerSelected = new EventEmitter<Offer>();

  constructor(private bs : TutoringService) {
  }

  ngOnInit(): void {
    this.keyup.pipe(filter (term=> term!=""))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(()=>this.isLoading = true))
      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .pipe(tap(()=>this.isLoading = false))
      .subscribe((offers)=>{
        console.log(offers);
        this.foundOffers = offers;
      });
  }

}
