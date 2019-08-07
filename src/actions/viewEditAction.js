import axios from "axios";
export const addViewEditData = (demanddata) => {

    //axios

    return {
        type: "ADD_VIEW_EDIT_DATA",
        payload: demanddata
    };

}

export const clearViewEditData = (demanddata) => {

    return {
        type: "CLEAR_VIEW_EDIT_DATA",
        payload: demanddata
    };

}

export const ViewEditOnAddBtn = (demand) => {

    return {
        type: "VIEW_EDIT_ADD_BTN",
        payload: demand
    };

}


export const ViewEditOnRemoveBtn = (demand) => {

    return {
        type: "VIEW_EDIT_REMOVE_BTN",
        payload: demand
    };

}

export const changeViewEditData = (data, i, name, value) => {
    switch (name) {
        case "resource_level":
            return {
                type: "ON_CHANGE_VIEW_EDIT_RESOURCE",
                payload: data,
                index: i,
                value: value
            }

        case "skill":
            return {
                type: "ON_CHANGE_VIEW_EDIT_SKILL",
                payload: data,
                index: i,
                value: value
            }

        case "location":
            return {
                type: "ON_CHANGE_VIEW_EDIT_LOCATION",
                payload: data,
                index: i,
                value: value
            }

        case "capability":
            return {
                type: "ON_CHANGE_VIEW_EDIT_CAPABILITY",
                payload: data,
                index: i,
                value: value
            }

        case "description":
            return {
                type: "ON_CHANGE_VIEW_EDIT_DESCRIPTION",
                payload: data,
                index: i,
                value: value
            }
    }

}

export const editDemandInRedux = (updateData, data) => {

    console.log(updateData);
    console.log(data);

    data.demandItems.map((reduxMappedData, i) => {

        if (reduxMappedData.demandNumber == updateData.demandNumber) {

            reduxMappedData = updateData;

              reduxMappedData.demandFulfillment = updateData.demandFulfillment;

            console.log(reduxMappedData);


            axios.put(`http://localhost:8080/deleteDemand/${reduxMappedData.demandNumber}`)
                .then(res => {
                    console.log("DELETED CALLED");
                });

            axios.post(`http://localhost:8080/saveDemand`, updateData)
                .then(res => {
                    console.log("SAVE CALLED");
                    console.log(res.data);
                });



        }






    })

    return {
        type: "EDIT_DEMAND_IN_REDUX",
        payload: data
    };

}


