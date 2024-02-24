import { createAction, props } from "@ngrx/store"
import {Group, GroupMessage, PrivateChat, Profile} from "src/app/models/profile.model"

export const loadGroupList = createAction('[Group list] Load all group', props<{groups:Group[]}>())
export const loadGroupById = createAction('[Group list] Load messages to group chat by ID', props<{messages:GroupMessage[], groupID:string, since?:string}>())
export const setActiveChatId = createAction('[Group list] set active chat ID', props<{groupID:string}>())
export const setSinceParam = createAction('[Group list] set SINCE param', props<{since:string, groupID:string}>())
export const addGroup = createAction('[Group list] add group', props<{group:Group}>())
export const addMessagesToGroup = createAction('[Group list] add messages to group', props<{messages:GroupMessage[], groupID:string}>())


export const deleteGroup = createAction('[Group list] delete user group', props<{id:string}>())

export const loadPeopleList = createAction('[People list] Load all People', props<{people:Profile[]}>())

export const setGroupTimer = createAction('[Group list] set timer', props<{timer:number}>())

export const loadConversations = createAction('[People list] Add conversations', props<{conversations:PrivateChat[]}>())
export const addNewConversation = createAction('[Conversation] Add conversation to people list', props<{conversation:PrivateChat}>())
