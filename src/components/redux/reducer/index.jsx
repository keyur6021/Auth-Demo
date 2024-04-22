import React from 'react'
import { loginReducer } from './login'
import {combineReducers} from 'redux';
import { productReducer } from './product';

export const Reducers = combineReducers({
    login:loginReducer,
    product:productReducer
})

