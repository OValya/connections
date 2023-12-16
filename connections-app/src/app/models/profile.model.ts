export interface User {
  name: string|null;
  email:string|null;
  password:string|null;
}

export interface Group {
  name:string;
  createdAt:string;
}


export interface Message {
  authorID: string,
  message: string,
  createdAt: string
}

export interface Profile {
  email: {
    S:string},
  name:{
    S:string};
  uid: {
    S:string};
  createdAt: {
    S:string}; // unix timestamp in milliseconds
}

