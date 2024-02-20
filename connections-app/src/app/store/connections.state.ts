import {Group, GroupMessage, PrivateChat, Profile} from "../models/profile.model";

export interface AppState {
  groups: GroupState;  //group chats and private conversation
  chats: GroupChatState;
  user: UserState;
}

export interface GroupState{
  timerGroups:number;
  timerPeople:number;
  groups: Group[],
  people: Profile[],
  conversations: PrivateChat[]
}

export interface GroupChatState {
  chats: {[groupId:string]:GroupMessage[]}
  since: {[groupId:string]:string},
  activeChatID:string,
}

export interface UserState{  //for user login
  profile:Profile|null;
  token:string|null;
  loading: boolean,
  loaded:boolean
}
