import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../connections.state";



const userFeature = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(userFeature, (state)=>state.profile)
export const selectUserID = createSelector(userFeature, (state)=>state.profile?.uid.S!)
export const selectLoaded = createSelector(userFeature, (state)=>state.loaded)
export const selectLoading = createSelector(userFeature, (state)=>state.loading)
export const selectToken = createSelector(userFeature, (state)=>state.token)
export const selectIsLogin = createSelector(userFeature, state=>!!state.token)
