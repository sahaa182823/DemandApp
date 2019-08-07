const initialState = {
    item: {}

}

export default function (state = initialState, action) {
    console.log(action.payload)
    switch (action.type) {
        case "ADD_VIEW_EDIT_DATA":
            return {
                item: action.payload
            }


        case "CLEAR_VIEW_EDIT_DATA":
            return {
                item: []
            }

        case "VIEW_EDIT_ADD_BTN": {
            const x = { resource_level: "", skill: "enter", location: "", capability: "", jobDescription: "", demandNumber: "" };
            var temp = action.payload;
            temp.item.data.demandFulfillment = temp.item.data.demandFulfillment.concat(x)
            
            // action.payload.item.data.demandFulfillment = action.payload.item.data.demandFulfillment.concat(x)

            return temp;
        }

        case "VIEW_EDIT_REMOVE_BTN":
            {
                action.payload.item.data.demandFulfillment.pop();
                console.log(action.payload.item.data.demandFulfillment)
                return action.payload;
            }

        case "ON_CHANGE_VIEW_EDIT_RESOURCE": {
            action.payload.item.data.demandFulfillment[action.index].resource_level = action.value;
            action.payload.item.data.demandFulfillment[action.index].demandNumber = action.payload.item.data.demandNumber;
            return action.payload
        }

        case "ON_CHANGE_VIEW_EDIT_SKILL": {
            action.payload.item.data.demandFulfillment[action.index].skill = action.value;
            return action.payload
        }

        case "ON_CHANGE_VIEW_EDIT_LOCATION": {
            action.payload.item.data.demandFulfillment[action.index].location = action.value;
            return action.payload
        }

        case "ON_CHANGE_VIEW_EDIT_CAPABILITY": {
            action.payload.item.data.demandFulfillment[action.index].capability = action.value;
            return action.payload
        }

        case "ON_CHANGE_VIEW_EDIT_DESCRIPTION": {
            action.payload.item.data.demandFulfillment[action.index].description = action.value;
            return action.payload
        }


        default:
            return state;
    }
}
