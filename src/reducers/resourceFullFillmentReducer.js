import { ADD_DEMAND  } from '../constants/type'

 const initialState = {
       resourceData:[]
 }

 export default function (state = initialState, action) {
     switch (action.type) {
        
             case ADD_DEMAND:
              console.log("update  Resource in reducer")
             return {
                 ...state,
                 resourceData: action.payload
              }

              
        default:
            return state;
    }
 }