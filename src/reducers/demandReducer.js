import { SAVE_DEMAND,GET_DEMAND  } from '../constants/type'

const initialState = {
    item: {}
  
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_DEMAND:
            return {
                ...state,
                item: action.payload
            }
           
        default:
            return state;
    }
}
