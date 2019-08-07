import { GET_DEMAND } from '../constants/type'

const initialState = {

    demandItems: [],

}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_DEMAND:
            console.log("update in reducer")
            return {
                ...state,
                demandItems: action.payload
            }


        case "SAVE_TEMP":
            return {
                ...state,
                demandItems: action.payload
            }

        case "EDIT_DEMAND_IN_REDUX": {
            return action.payload;
        }

        case "CHANGE_STATUS_TO_CANCELLED": 
        return{
            ...state,
            demandItems: action.payload
        }

        default:
            return state;
    }
}