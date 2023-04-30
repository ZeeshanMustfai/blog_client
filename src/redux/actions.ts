import {createReducer, createAction} from "@reduxjs/toolkit"

export const login = createAction<boolean>('login')
export const logout = createAction<boolean>('logout')