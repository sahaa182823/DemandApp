import { GET_DEMAND } from '../constants/type'
import axios from "axios";
import { serverUrl } from '../components/UrlConstant'



export const addDemandData = (demanddata) => {

    return {
        type: GET_DEMAND,
        payload: demanddata
    };

}

export const addStatusOpen = (demanddata) => {

    return {
        type: "ADD_OPEN_STATUS",
        payload: demanddata
    };

}



export const addStatusCompleted = (demanddata) => {

    return {
        type: "ADD_COMPLETED_STATUS",
        payload: demanddata
    };

}

export const addStatusCancelled = (demanddata) => {

    return {
        type: "ADD_CANCELLED_STATUS",
        payload: demanddata
    };

}

export const addStatusOverdue = (demanddata) => {

    return {
        type: "ADD_OVERDUE_STATUS",
        payload: demanddata
    };

}


export const changeStatusToCancel = (dNo, data) => {

    const temp= data.map((reduxMappedData, i) => {
        if (reduxMappedData.demandNumber === dNo) {

            reduxMappedData.status = "Cancelled";

            axios.put(`http://${serverUrl}/changeStatusToCancelled/${reduxMappedData.demandNumber}`)

        }
        return reduxMappedData;

    })
    console.log(data);
    return {
        type: "CHANGE_STATUS_TO_CANCELLED",
        payload: temp
    };

}