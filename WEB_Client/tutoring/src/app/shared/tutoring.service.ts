import { Injectable } from '@angular/core';
import {Appointment, Category, Offer, User} from "./offer";
import {HttpClient} from "@angular/common/http";
import {Observable,throwError } from "rxjs";
import {catchError, retry} from 'rxjs/operators';
import {AppointmentUser} from "./appointment-user";

@Injectable({
  providedIn: 'root'
})
export class TutoringService {

  private api = 'http://tutoring.s1910456020.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {

  }

  getAll():Observable<Array<Offer>>{
    return this.http.get<Array<Offer>>(`${this.api}/offers`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: string):Observable<Offer>{
    return this.http.get<Offer>(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error:Error | any):Observable<any>{
    return throwError(error);
  }


  create(offer: Offer): Observable<any> {
    return this.http.post(`${this.api}/offers`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  update(offer: Offer): Observable<any> {
    return this.http.put(`${this.api}/offers/${offer.id}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateMessage(offer: Offer): Observable<any> {
    return this.http.put(`${this.api}/offers/updateMessage/${offer.id}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm : string):Observable<Array<Offer>>{
    return this.http.get<Array<Offer>>(`${this.api}/offers/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  //return the obj with the current appointment_id for changing the state
 book(obj: AppointmentUser): Observable<any>{
    return this.http.put(`${this.api}/appointments/update/${obj.appointment_id}`, obj)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllAppointments():Observable<Array<Appointment>>{
    return this.http.get<Array<Appointment>>(`${this.api}/appointments`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }



}
