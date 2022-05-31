import { Component, OnInit } from '@angular/core';
import {Appointment, Offer} from "../shared/offer";
import {TutoringService} from "../shared/tutoring.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {TutoringFactory} from "../shared/tutoring-factory";

@Component({
  selector: 'bs-my-space',
  templateUrl: './my-space.component.html',
  styles: [
  ]
})
export class MySpaceComponent implements OnInit {

  offers: Offer[] = [] ;
  offer: Offer = TutoringFactory.empty();
  offersOfTut: Offer [] = [];
  historyOfTut: Appointment [] = [];
  bookedAppoints: Appointment [] = [];
  bookedAppointsOfTut: Appointment [] = [];
  studentHistory: Appointment [] = [];

  constructor(private service:TutoringService, private router:Router, private route:ActivatedRoute,
  private toastr: ToastrService) { }

  ngOnInit(): void {
   this.service.getAll().subscribe(res=> this.offers = res);
   this.service.getAllAppointments().subscribe(res=> this.bookedAppoints = res);
  }

  isTutor(){
    let storage = sessionStorage;
    if(storage['isTutor'] == "1")
      return true;
    else return false;
  }

  /**
   * the init function loads
   * the content of the site
   **/
  init(){
    this.offersOfTutor();
    this.historyOfTutor();
    this.bookedAppointments();
    this.appointmentsOfTut();
    return sessionStorage['firstname'];
  }

  /**
   * all Offers of a Tutor
   **/
  offersOfTutor() {
    this.offersOfTut = [];
    for(let offer of this.offers){
      if(offer.user_id == sessionStorage['user_id']){
        this.offersOfTut.push(offer);
      }
    }
  }

  /**
   * all booked appointments
   * of a tutor which are a available
   **/
  appointmentsOfTut(){
    this.bookedAppointsOfTut = [];
    for(let offer of this.offersOfTut){
      for(let app of offer.appointments) {
        if (app?.isAvailable == false) {
          this.bookedAppointsOfTut.push(app);
        }
      }
    }
  }

  /**
   * looks which appointments are already booked from the logged in User
   * and pushes the appointment in the correct history wheter it is a
   * bygone appointment or not
   **/
  bookedAppointments(){
   let arr = [];
    for (let appoint of this.bookedAppoints){
      if(appoint.user[0]?.id == sessionStorage['user_id']){
        if(new Date(appoint.date)>new Date())
        arr.push(appoint);
        else if(new Date(appoint.date)<new Date())
          this.studentHistory.push(appoint);
      }
    }
    this.bookedAppoints = arr;
  }

  /**
   * return to the message
   * not implemented yet
   **/
  returnMessage(){
    this.toastr.info("Vielleicht im nächsten Leben", "Nice Try, das funktioniert leider nicht");
  }

  /**
   * creates the history of a tutor
   * this describes all appointments which are goneby
   **/
  historyOfTutor(){
    this.historyOfTut = [];
    for(let offer of this.offersOfTut){
      for(let appointment of offer.appointments){
        let date = new Date(appointment.date);
        if(date < new Date()){
          this.historyOfTut.push(appointment)
        }
      }
    }
  }
}
