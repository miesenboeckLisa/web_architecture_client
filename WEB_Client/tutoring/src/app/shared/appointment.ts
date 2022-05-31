import {User} from "./user";
import {Offer} from "./offer";

export class Appointment {
  constructor(public id:number,
              public date:Date,
              public begin:Date,
              public end:Date,
              public offer_id:number,
              public user: User[],
              public isAvailable?:boolean,
             ) {
  }

}
