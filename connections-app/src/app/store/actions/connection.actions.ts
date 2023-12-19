import { createAction, props } from "@ngrx/store"
import { Group, GroupMessage, Profile } from "src/app/models/profile.model"

export const loadGroupList = createAction('[Group list] Load all group', props<{groups:Group[]}>())
export const loadGroupById = createAction('[Group list] Load messages to group chat by ID', props<{messages:GroupMessage[]}>())
export const addGroup = createAction('[Group list] add group', props<{group:Group}>())
export const deleteGroup = createAction('[Group list] delete user group', props<{id:string}>())

export const loadPeopleList = createAction('[People list] Load all People', props<{people:Profile[]}>())