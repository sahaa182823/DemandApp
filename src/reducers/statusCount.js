import { GET_DEMAND } from '../constants/type'

const initialState = {

    

}

export default function (state = initialState, action) {
    switch (action.type) {

    

        case "ADD_OPEN_STATUS":
            return {
                ...state, statusOpen: (action.payload)
            }

        case "ADD_COMPLETED_STATUS":
            return {
                ...state, statusCompleted: (action.payload)
            }

        case "ADD_CANCELLED_STATUS":
            return {
                ...state, statusCancelled: (action.payload)
            }

        case "ADD_OVERDUE_STATUS":
            return {
                ...state, statusOverdue: (action.payload)
            }

        default:
            return state;
    }
}