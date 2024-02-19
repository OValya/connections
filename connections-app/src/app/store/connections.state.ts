import {Group, GroupMessage, Profile} from "../models/profile.model";

export interface AppState {
  groups: GroupState;
  chats: GroupChatState;
  users: UserState;
}

export interface GroupState{
  timerGroups:number;
  timerPeople:number;
  groups: Group[],
  people: Profile[],
}

export interface GroupChatState {
  chats: {[groupId:string]:GroupMessage[]}
  since: {[groupId:string]:string},
  activeChatID:string,
}

export interface UserState{
  profile:Profile|null;
  token:string|null;
  loading: boolean,
  loaded:boolean
}
