import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwtDecode from "jwt-decode";


interface Token {
  exp: number,
  user: {
    id:string
    isTutor:string
    firstname:string
  }
}


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private api:string = "http://tutoring.s1910456020.student.kwmhgb.at/api/auth";


  constructor(private http:HttpClient) { }

  login(email:string, password:string){
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    })
  }

  public setSessionStorage(token:string){
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user_id", decodedToken.user.id)
    sessionStorage.setItem("isTutor", decodedToken.user.isTutor)
    sessionStorage.setItem("firstname", decodedToken.user.firstname)
  }

  public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("user_id"));
  }

  logout(){
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("isTutor");
    sessionStorage.removeItem("firstname");
    console.log("Logged Out");
  }

  public isLoggedIn(){
    if(sessionStorage.getItem("token")){
      let token:string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCDate(decodedToken.exp);
      if(expirationDate < new Date()){
        console.info("token expired");
        sessionStorage.removeItem("token");
        return false;
      } else{
        return true;
      }
    }
    return false;
  }

  public isLogout(){
    return !this.isLoggedIn();
  }

}
