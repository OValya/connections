import { createReducer, on } from "@ngrx/store";
import * as ConnectionActions from "../actions/connection.actions";
import {GroupChatState, GroupState} from "../connections.state";
import {setGroupTimer} from "../actions/connection.actions";

const initialState:GroupState = {
  timerGroups:0,
  timerPeople:0,
  groups:[],
  people:[],
  conversations:[]
}

export const GroupsReducer = createReducer(initialState,
  on(ConnectionActions.loadGroupList, (state, action)=>({...state, groups:action.groups})),
  on(ConnectionActions.addGroup, (state, action)=> ({...state, groups:[...state.groups, action.group]})),
  on(ConnectionActions.deleteGroup, (state, action)=> ({...state, groups:state.groups.filter(it => it.id.S != action.id)})),
  on(ConnectionActions.loadPeopleList, (state, action)=> ({...state, people:action.people})),
  on(ConnectionActions.setGroupTimer, (state, action)=> ({...state, timerGroups:action.timer})),
  on(ConnectionActions.loadConversations, (state, action)=> ({...state, conversations:action.conversations})),
  on(ConnectionActions.addNewConversation, (state, action)=> ({...state, conversations:[...state.conversations, action.conversation]})),
)

const initialStateGroupChat:GroupChatState = {
  activeChatID:'',
  chats: {},
  since:{}
}

export const GroupChatReducer = createReducer(initialStateGroupChat,
  on(ConnectionActions.loadGroupById, (state, action)=>({...state, chats:{...state.chats, [action.groupID]:action.messages}})),
  on(ConnectionActions.addMessagesToGroup, (state, action)=>({...state, chats:{...state.chats, [action.groupID]:[...state.chats[action.groupID], ...action.messages]}})),
  on(ConnectionActions.setSinceParam, (state, action)=>({...state, since:{...state.since, [action.groupID]:action.since}})),
  on(ConnectionActions.setActiveChatId, (state, action)=>({...state, activeChatID:action.groupID })),
)

// const initialStatePrivateChat:GroupChatState = {
//   activeChatID:'',
//   chats: {},
//   since:{}
// }
//
// export const PrivateChatReducer = createReducer(initialStatePrivateChat,
//   on(ConnectionActions.loadGroupById, (state, action)=>({...state, chats:{...state.chats, [action.groupID]:action.messages}})),
//   on(ConnectionActions.setActiveChatId, (state, action)=>({...state, activeChatID:action.groupID }))
// )
