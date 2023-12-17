import { createAction, props } from "@ngrx/store"

export const loadGroupList = createAction('[Group list API] Load all group')
export const loadGroupById = createAction('[Group list API] Load group by ID', props<{id:string}>())
