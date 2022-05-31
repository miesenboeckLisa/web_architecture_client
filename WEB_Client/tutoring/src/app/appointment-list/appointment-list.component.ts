import {Component, Input, OnInit} from '@angular/core';
import {Appointment, Offer} from "../shared/offer";

@Component({
  selector: 'a.bs-appointment-list',
  templateUrl: './appointment-list.component.html',
  styles: [
  ]
})
export class AppointmentListComponent implements OnInit {

  @Input() appointment: Appointment | undefined
  @Input() offers: Offer[] | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
