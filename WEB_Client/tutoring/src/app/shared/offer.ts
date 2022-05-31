import { Category } from "./category";
export { Category } from "./category";
import { User } from "./user";
export { User } from "./user";
import { Appointment } from "./appointment";
export { Appointment } from "./appointment";


export class Offer {

  constructor(public id:number,
              public title:string,
              public price:number,
              public user_id:number,
              public user: User,
              public category: Category,
              public appointments: Appointment[],
              public category_id:number,
              public description?:string,
              public message?:string) {
  }

}
