export interface Profile {
  name: string|null;
  email:string|null;
  password:string|null;
  createdAt?:string;
}

export interface Group {
  name:string;
  createdAt:string;
}