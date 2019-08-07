import { SAVE_DEMAND} from '../constants/type'
import { SAVE_STATUS} from '../constants/type'
import axios from "axios";
import { serverUrl } from '../components/UrlConstant'



export const onSubmitDemand = (demand) => {
    console.log(demand)
    
    axios.post("http://" + serverUrl + "/saveDemand",demand)
        .then(res => {
         console.log(res.data);
        });

        

    return {
        type: SAVE_DEMAND,
        payload: demand
    };
}

export const onStatusSubmit = (statuses) => {
    console.log(statuses)
    

    return {
        type: SAVE_STATUS,
        payload: statuses
    };
}



