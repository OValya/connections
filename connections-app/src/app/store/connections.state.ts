import { Profile } from "../models/profile.model";

export interface UserState{
  profile:Profile|null;
  token:string|null;
  loading: boolean
}