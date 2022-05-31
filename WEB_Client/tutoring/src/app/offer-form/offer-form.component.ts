import { Component, OnInit } from '@angular/core';
import {FormArray, FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {TutoringFactory} from "../shared/tutoring-factory";
import {TutoringService} from "../shared/tutoring.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../shared/offer";
import {OfferFormErrorMessages} from "./offer-form-error-messages";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";
import {formatDate} from "@angular/common";

@Component({
  selector: 'bs-offer-form',
  templateUrl: './offer-form.component.html',
  styles: [
  ]
})
export class OfferFormComponent implements OnInit {
  offerForm: FormGroup;
  offer = TutoringFactory.empty();
  errors: {[key:string]:string} = {};
  isUpdatingOffer = false;
  appointments: FormArray;

  constructor(private fb:FormBuilder, private service:TutoringService,
              private route: ActivatedRoute, private router: Router) {
    this.offerForm = this.fb.group({});
    this.appointments = this.fb.array([]);
  }

  ngOnInit(): void {

    const id = this.route.snapshot.params["id"];

    if(id){
      //update
      this.isUpdatingOffer = true;
      this.service.getSingle(id.toString()).subscribe(offer=>{
        this.offer = offer;
        this.initOffer();
      });
    }
    this.initOffer();
  }

  initOffer(){
   this.buildAppointmentArray();

    this.offerForm = this.fb.group({
      appointments:this.appointments,
      id: this.offer.id,
      title:[this.offer.title, Validators.required],
      description: this.offer.description,
      category: this.offer.category.title,
      price: this.offer.price,

    });

    this.offerForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    });
  }

  updateErrorMessages(){
    this.errors = {};
    for (const message of OfferFormErrorMessages){
      const control = this.offerForm.get(message.forControl);
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }

  buildAppointmentArray(){
    if(this.offer.appointments){
      this.appointments = this.fb.array([]);
      for(let appointment of this.offer.appointments){
        let fg = this.fb.group({
          id: new FormControl(appointment.id),
          date: new FormControl(formatDate(new Date (appointment.date), 'yyyy-MM-dd', 'en'), [Validators.required]),
          begin: new FormControl(formatDate(new Date (appointment.begin), 'yyyy-MM-dd HH:mm:ss', 'en'), [Validators.required]),
          end: new FormControl(formatDate(new Date (appointment.end), 'yyyy-MM-dd HH:mm:ss', 'en'), [Validators.required]),
          isAvailable: "1",
        });
        this.appointments.push(fg);
      }
    }
  }

  addAppointmentControl(){
    this.appointments.push(this.fb.group({id: 0, date:null, begin:null, end:null, isAvailable:"1"}));
  }

  submitForm(){
   this.offerForm.value.appointments = this.offerForm.value.appointments.filter(
      (appointment:{date: string})=>appointment.date,
      (appointment:{begin: string})=> appointment.begin,
      (appointment:{end: string})=>appointment.end,
      (appointment:{isAvailable: string})=>appointment.isAvailable
   )

    console.log(this.offerForm.value.appointments);
    const offer:Offer = TutoringFactory.fromObject(this.offerForm.value);
    offer.user = this.offer.user;
    if(this.isUpdatingOffer){
        this.service.update(offer).subscribe(res=>{
        this.router.navigate(["../../../offers", offer.id], {relativeTo:this.route});
      })

    }else{
      offer.user_id = sessionStorage['user_id'];
      this.service.create(offer).subscribe(res=>{
        this.offer = TutoringFactory.empty();
        this.offerForm.reset(offer);
        this.router.navigate(["../"], {relativeTo:this.route});
      });
    }
  }


}
