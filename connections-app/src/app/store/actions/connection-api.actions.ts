import { createAction, props } from "@ngrx/store"
import { Group } from "src/app/models/profile.model"

export const loadGroupList = createAction('[Group list API] Load all group')
export const loadGroupById = createAction('[Group list API] Load all messages to group by ID', props<{groupID:string}>())
export const appendMessagesToGroupById = createAction('[Group list API] Append messages to group by ID', props<{groupID:string, since?:string}>())
export const addGroup = createAction('[Group list API] Add group', props<{nameGroup:string, id:string}>())
export const deleteGroup = createAction('[Group list API] Delete group', props<{id:string}>())

export const sendMessageToGroup = createAction('[Group Id API] Send Message to group', props<{message:string, groupID:string, since:string}>())
export const loadPeopleList = createAction('[People list API] Load all people')
export const loadConversations = createAction('[People list API] Load conversations')

export const createConversation = createAction('[Conversation] create new conversation', props<{companion:string}>())
