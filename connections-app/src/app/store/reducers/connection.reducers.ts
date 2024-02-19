import { createReducer, on } from "@ngrx/store";
import * as ConnectionActions from "../actions/connection.actions";
import {GroupChatState, GroupState} from "../connections.state";
import {setGroupTimer} from "../actions/connection.actions";

const initialState:GroupState = {
  timerGroups:0,
  timerPeople:0,
  groups:[],
  people:[]
}

export const GroupsReducer = createReducer(initialState,
  on(ConnectionActions.loadGroupList, (state, action)=>({...state, groups:action.groups})),
  on(ConnectionActions.addGroup, (state, action)=> ({...state, groups:[...state.groups, action.group]})),
  on(ConnectionActions.deleteGroup, (state, action)=> ({...state, groups:state.groups.filter(it => it.id.S != action.id)})),
  on(ConnectionActions.loadPeopleList, (state, action)=> ({...state, people:action.people})),
  on(ConnectionActions.setGroupTimer, (state, action)=> ({...state, timerGroups:action.timer}))
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
