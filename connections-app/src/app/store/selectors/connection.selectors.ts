import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GroupChatState, GroupState } from "../reducers/connection.reducers";


export const GroupsSelector = createFeatureSelector<GroupState>('groups');

export const selectAllGroups = createSelector(
  GroupsSelector,
  (state)=> state.groups
)

export const selectAllPeople = createSelector(
  GroupsSelector,
  (state)=>state.people
)

export const GroupMessagesSelector = createFeatureSelector<GroupChatState>('messages');

export const selectMessagesByGroupId = createSelector(
  GroupMessagesSelector,
  (state)=> state.messages
)


 