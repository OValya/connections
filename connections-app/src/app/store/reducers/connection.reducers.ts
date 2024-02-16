import { createReducer, on } from "@ngrx/store";
import * as ConnectionActions from "../actions/connection.actions";
import {GroupChatState, GroupState} from "../connections.state";

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

const initialStateGroupChat:GroupChatState = {
  activeChatID:'',
  chats: {},
  since:{}
}

export const GroupChatReducer = createReducer(initialStateGroupChat,
  on(ConnectionActions.loadGroupById, (state, action)=>({...state, chats:{...state.chats, [action.groupID]:action.messages}})),
  on(ConnectionActions.setActiveChatId, (state, action)=>({...state, activeChatID:action.groupID }))
  )
