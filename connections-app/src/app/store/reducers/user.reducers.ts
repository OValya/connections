import { createReducer, on } from "@ngrx/store"
import { setLoading, removeToken,setProfile, setToken, updateNameProfile} from '../actions/user.actions'
import { Action } from "rxjs/internal/scheduler/Action"
import { UserState } from "../connections.state"

const initialState:UserState = {
  profile:null, 
  token:null,
  loading:false
}

export const userReducer = createReducer(initialState, 
  on(setToken, (state, action)=> ({...state, token:action.token})),
  on(setProfile, (state, action)=>({...state, profile:action.profile})),
  on(setLoading, (state, action)=>({...state, loading:action.loading})),
  on(removeToken, (state)=>({...state, token:null})),
  on(updateNameProfile, (state, action)=>({...state, profile:{...state.profile!, name:{S:action.name}}})),

)