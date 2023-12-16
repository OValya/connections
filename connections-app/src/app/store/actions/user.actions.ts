import { createAction, props } from '@ngrx/store';
import { Profile } from 'src/app/models/profile.model';

export const login = createAction('[Login Page] Login', props<{ email: string; password: string }>())
export const logout = createAction('[Login Page] Logout');
export const loginError = createAction('[Login Page] Login Error', props<{message:string}>());

//export const enter = createAction('[Profile Page] enter');
export const setProfile = createAction('[Profile Page] Set profile ', props<{profile:Profile}>())
export const getProfile = createAction('[Profile Page] Get profile ')
export const updateProfile = createAction('[Profile Page] Update profile', props<{name:string}>())
export const updateNameProfile = createAction('[Profile Page] Update name profile', props<{name:string}>())

export const setToken = createAction('[Login Page] Set token ', props<{token:string}>());
export const removeToken = createAction('[Login Page] Remove token ');







