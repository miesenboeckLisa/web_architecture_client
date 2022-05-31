export class User {

  constructor(public id:number,
              public firstname:string,
              public lastname:string,
              public email:string,
              public password:string,
              public number:string,
              public isTutor:boolean,
              public picture?:string,
              public qualification?:string,
              public slogan?:string,
              public level?:string) {
  }
}
