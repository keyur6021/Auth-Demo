import { PRODUCT } from "../actions/product";

const initialState = {
    product:{}
}

export const productReducer = (state = initialState, action) =>{
    switch(action.type){
        case PRODUCT:
            return {
               ...state,
                product: action.payload
            }
        default:
            return state;
    }
}