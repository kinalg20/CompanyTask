export interface User {
  id?: number,
  name : string,
  password : string,
  role : string,
  email : string,
  avatar ? : string,
  expiresInMins?:string
}
