import { createAction, props } from "@ngrx/store"
import { Group } from "src/app/models/profile.model"

export const loadGroupList = createAction('[Group list API] Load all group')
export const loadGroupById = createAction('[Group list API] Load group by ID', props<{id:string}>())
export const addGroup = createAction('[Group list API] Add group', props<{name:string}>())
export const deleteGroup = createAction('[Group list API] Delete group', props<{id:string}>())

export const loadPeopleList = createAction('[People list API] Load all people')