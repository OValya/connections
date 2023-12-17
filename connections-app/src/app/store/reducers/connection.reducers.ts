import { createReducer, on } from "@ngrx/store";
import {  Group, GroupList, GroupMessage, PeopleList, Profile } from "src/app/models/profile.model"
import * as ConnectionActions from "../actions/connection.actions";
import * as ConnectionAPIActions from "../actions/connection-api.actions";

// interface State {
//   groups:GroupList;
//   people:PeopleList;
//   conversations:ChatList;
//   selectedGroupId:string;
// }

// const initialState:State = {
//   groups:{Count:0,Items:[]},
//   people:{Count:0, Items:[]},
//   conversations:{Count:0, Items:[]},
//   selectedGroupId:'',
// }

export interface GroupState{
  count:number,
  groups: Group[],
  people: Profile[],


}

const initialState:GroupState = {
  count:0,
  groups:[],
  people:[]
}

export const GroupsReducer = createReducer(initialState,
  on(ConnectionActions.loadGroupList, (state, action)=>({...state, groups:action.groups})),
)

export interface GroupChatState {
  selectedGroupID:string,
  messages:GroupMessage[],
  since: {[id:string]:string}
}

const initialStateGroupChat:GroupChatState = {
messages:[],
selectedGroupID:'',
since:{}
}

export const GroupChatReducer = createReducer(initialStateGroupChat,
  on(ConnectionActions.loadGroupById, (state, action)=>({...state, messages:action.messages})))