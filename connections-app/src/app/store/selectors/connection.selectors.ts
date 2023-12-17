import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GroupState } from "../reducers/connection.reducers";


export const GroupsSelector = createFeatureSelector<GroupState>('groups');

export const selectAllGroups = createSelector(
  GroupsSelector,
  (state)=> state.groups
)