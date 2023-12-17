export interface User {
  name: string|null;
  email:string|null;
  password:string|null;
}

export interface Group {
      id: {
        S: string // group id
      },
      name: {
        S: string // group name
      },
      createdAt: {
        S: string // unix timestamp when group was created
      },
      createdBy: {
        S: string // user id who created this group
      }
}

export interface GroupList {
  Count: number;
  Items: Group[]
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

