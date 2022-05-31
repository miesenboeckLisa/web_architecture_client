import {Appointment, Category, Offer, User} from "./offer";


export class TutoringFactory {

  static empty(): Offer {
    return  new Offer(0,
      '',
      0,
      0,
      new User(0, "", "", "", "", "", true,
        "", "", "", ""),
      new Category(0, "", "", ""),
      [new Appointment(0, new Date(), new Date(), new Date(),0,
        [new User(0, 'max', 'mustermann','m@m.com', 'muster','00', false)])],
      0,
      ""
    )
  }

  static fromObject(rawOffer: any): Offer {
    return new Offer(
      rawOffer.id,
      rawOffer.title,
      rawOffer.price,
      rawOffer.user_id,
      rawOffer.user,
      rawOffer.category,
      rawOffer.appointments,
      rawOffer.category_id,
      rawOffer.description,
      rawOffer.message
    );
  }


}
