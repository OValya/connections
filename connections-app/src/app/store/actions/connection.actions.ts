import { createAction, props } from "@ngrx/store"
import { Group } from "src/app/models/profile.model"

export const loadGroupList = createAction('[Group list] Load all group', props<{groups:Group[]}>())
export const selectGroup = createAction('[Group list] select group by ID')
export const deleteGroup = createAction('[Group list] delete user group')