import { createReducer, on } from "@ngrx/store"
import { setLoading, removeToken,setProfile, setToken, updateNameProfile, setProfileID} from '../actions/user.actions'
import { UserState } from "../connections.state"

const initialState:UserState = {
  profile:null,
  token:null,
  loading:false,
  loaded:false
}

export const userReducer = createReducer(initialState,
  on(setToken, (state, action)=> ({...state, token:action.token})),
  on(setProfileID, (state, action)=> ({...state, profile:{...state.profile!, uid:{...state.profile?.uid!, S:action.id}}})),
  on(setProfile, (state, action)=>({...state, profile:action.profile, loaded: true})),
  on(setLoading, (state, action)=>({...state, loading:action.loading})),
  on(removeToken, (state)=>({...state, token:null})),
  on(updateNameProfile, (state, action)=>({...state, profile:{...state.profile!, name:{...state.profile?.name, S:action.name}}})),

)
