import { createReducer, on } from "@ngrx/store";
import {  Group, GroupList, GroupMessage, PeopleList, Profile } from "src/app/models/profile.model"
import * as ConnectionActions from "../actions/connection.actions";
import * as ConnectionAPIActions from "../actions/connection-api.actions";
import {group, state} from "@angular/animations";

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
  on(ConnectionActions.addGroup, (state, action)=> ({...state, groups:[...state.groups, action.group]})),
  on(ConnectionActions.deleteGroup, (state, action)=> ({...state, groups:state.groups.filter(it => it.id.S != action.id)})),

  on(ConnectionActions.loadPeopleList, (state, action)=> ({...state, people:action.people}))


)

export interface GroupChatState {
  // groupID:string,
  // messages:GroupMessage[],
  chats: {[groupId:string]:GroupMessage[]}
  since: {[groupId:string]:string},
  activeChatID:string,
}

const initialStateGroupChat:GroupChatState = {
  activeChatID:'',
  chats: {},
  since:{}
}

export const GroupChatReducer = createReducer(initialStateGroupChat,
  on(ConnectionActions.loadGroupById, (state, action)=>({...state, chats:{...state.chats, [action.groupID]:action.messages}})),
  //on(ConnectionActions.addMessageToGroup, (state, action)=>({...state, chats:{...state.chats, [action.groupID]:state.chats[action.groupID].push({message:action.message, createdAt:Date.now().toString(),  })),
  on(ConnectionActions.setActiveChatId, (state, action)=>({...state, activeChatID:action.groupID }))
  )
