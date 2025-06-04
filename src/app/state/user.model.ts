export interface User {
  id?: number,
  name : string,
  password : string,
  role : string,
  email : string,
  avatar ? : string,
  username? : any ,
  createdBy : any,
  expiresInMins?:string
}
