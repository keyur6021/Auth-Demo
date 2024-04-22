import React from 'react'
import { loginReducer } from './login'
import {combineReducers} from 'redux';

export const Reducers = combineReducers({
    login:loginReducer
})

