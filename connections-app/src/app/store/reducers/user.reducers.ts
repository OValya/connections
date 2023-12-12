import { createReducer, on } from "@ngrx/store"
import {login} from '../actions/user.actions'
import { Action } from "rxjs/internal/scheduler/Action"

const initialState:UserState = {
  createdAt:null,
  email:null,
  name:null,
  token:null,
  uid:null
}

// const userReducer = createReducer(initialState, 
//   on(login, (state, action)=> ({...state, token:action.})))