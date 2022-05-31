import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Appointment, Offer} from "../shared/offer";
export { Offer } from "../shared/offer";
import {ActivatedRoute, Router} from "@angular/router";
import {TutoringService} from "../shared/tutoring.service";
import {TutoringFactory} from "../shared/tutoring-factory";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppointmentUser} from "../shared/appointment-user";

@Component({
  selector: 'bs-offer-detail',
  templateUrl: './offer-detail.component.html',
  styles: [
  ]
})
export class OfferDetailComponent{
  offer: Offer = TutoringFactory.empty();
  messageForm: FormGroup;



  constructor(
    private service: TutoringService,
    private route: ActivatedRoute,
  private router: Router,
    private toastr: ToastrService,
    private fb:FormBuilder
  ) {
    this.messageForm = this.fb.group({
      message:""
    });
  }


  ngOnInit() {
    const params = this.route.snapshot.params;
    this.service.getSingle(params['id'])
      .subscribe(o => this.offer = o);
  }



  removeOffer() {
    this.toastr.success("hat alles funktioniert", "Dein Angebot wurde erfolgreich gelöscht");
    if (confirm('Angebot wirklich löschen?')) {
      this.service.remove(this.offer.id.toString())
        .subscribe(res => this.router.navigate(['../'], { relativeTo:
          this.route }));
    }
  }

  notLoggedIn(){
    let storage = sessionStorage;
    if(storage['isTutor'] == null)
      return false;
    else if(storage['isTutor'] == "1")
      return false;
    else{
      return true;
    }
  }

  canDelete(){
    let storage = sessionStorage;
    if(storage['isTutor'] == "1"){
      if(this.offer.user_id == storage['user_id'])
        return true;
      return false;
    }
    else{
      return false;
    }
  }

  /**
   * the user (role: Student) is able to book an appointment of an offer
   * @param appointment_id: describes the id of the appointment which changes the state isAvailable into false.
   */
  bookAppointment(appointment_id: string){
    //get current User
    let user_id = sessionStorage['user_id']
    //make a new Objekt AppintmentUser, which includes the userId and the AppointmentId
    //reason is: that the obj has to be provided for the service/backend to update the elemente in the DB
    let obj = new AppointmentUser(user_id, Number(appointment_id));
     if (confirm('Termin wirklich buchen?')) {
       //update the Obj
        this.service.book(obj).subscribe(res =>
          this.router.navigate(['../'], { relativeTo: this.route }));
       this.toastr.success("hat alles funktioniert", "Dein Angebot wurde erfolgreich gebucht");
      }
  }

  submitForm(){
    const id = this.route.snapshot.params["id"];
    if(id){
      //get single offer
      this.service.getSingle(id.toString()).subscribe(offer=>{
        this.offer = offer;
      });
      //add message
      this.offer.message = this.messageForm.value.message;
      //update in DB
     this.service.updateMessage(this.offer).subscribe(res=>{
        this.router.navigate(["../../offers", this.offer.id], {relativeTo:this.route});
       this.toastr.success("Der Tutor meldet sich bei dir", "Deine Nachricht wurde gesendet!");
       this.messageForm.reset();
      })

    }
  }

  bookedUp(){
    this.toastr.info("Leider ist der Termin bereits ausgebucht, sende den Tutor eine Nachricht, vielleicht kann er dir weiterhelfen", "Tut uns leid!");
  }
}




