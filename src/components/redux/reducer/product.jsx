import { PRODUCT, SINGLE_PRODUCT } from "../actions/product";

const initialState = {
    product:{},
    singleProduct:{}
}

export const productReducer = (state = initialState, action) =>{
    switch(action.type){
        case PRODUCT:
            return {
               ...state,
                product: action.payload
            }
            case SINGLE_PRODUCT:
             return {
                ...state,
                singleProduct:action.payload
             }
        default:
            return state;
    }
    
}