import {createFeatureSelector, createSelector, MemoizedSelector, State} from "@ngrx/store";
import {AppState, GroupChatState, GroupState} from "../connections.state";
import {selectUserID} from "./user.selectors";
import {Group} from "../../models/profile.model";
import {state} from "@angular/animations";



export const GroupsSelector = createFeatureSelector<GroupState>('groups');

export const selectAllGroups = createSelector(
  GroupsSelector,
  (state)=> state.groups
)

export const selectAllPeople = createSelector(
  GroupsSelector,
  (state)=>state.people
)

export const selectAllConversations = createSelector(
  GroupsSelector,
  state => state.conversations
)

export const GroupMessagesSelector = createFeatureSelector<GroupChatState>('messages');

export const selectActiveGroupID = createSelector(
  GroupMessagesSelector,
  state => state.activeChatID
)

export const selectSinceParam = createSelector(
  GroupMessagesSelector,
  selectActiveGroupID,
  (state, groupID) => state.since[groupID]
)
export const selectMessagesByGroupId = createSelector(
  GroupMessagesSelector,
  selectActiveGroupID,
  (state, groupID)=> state.chats[groupID]
)

export const selectGroupTimer = createSelector(
  GroupsSelector,
  state => state.timerGroups
)

// export const selectAllGroupsByUserId = createSelector(
//   selectUserID as MemoizedSelector<state, string>,
//   selectAllGroups as MemoizedSelector<AppState, Group[]>,
//   (userID:string, groups)=>{
//    return  groups.filter(group => group.createdBy.S == userID)
// }
//
// )


