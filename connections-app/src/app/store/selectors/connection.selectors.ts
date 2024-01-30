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

export const selectActiveGroupID = createSelector(
  GroupMessagesSelector,
  state => state.activeChatID
)
export const selectMessagesByGroupId = createSelector(
  GroupMessagesSelector,
  selectActiveGroupID,
  (state, groupID)=> state.chats[groupID]
)


