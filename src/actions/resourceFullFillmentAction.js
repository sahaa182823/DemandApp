import { ADD_DEMAND } from '../constants/type'
import axios from "axios";
import { serverUrl } from '../components/UrlConstant'




export const onSubmitSelectResource = (resourceddata) => {
    console.log("INSIDE AXIOS PART")
    console.log(resourceddata)

    var jsonString = JSON.stringify(resourceddata);

    console.log(jsonString)

    axios.post(`http://${serverUrl}/saveResources`, jsonString)
        .then(res => {
            console.log(res.data);
        });

    return {
        type: ADD_DEMAND,
        payload: resourceddata
    };
}

export const updateResource = (updateData, data, isSubmit) => {

    console.log(data);
    console.log(updateData);
    console.log(isSubmit)

    const temp = data.demandItems.map((reduxMappedData, i) => {
        updateData.map((ud) => {
            if (reduxMappedData.demandNumber == ud.demandNumber) {

                if (isSubmit==1) {
                    console.log("INSIDE COMPLETED")
                    reduxMappedData.status = "Completed";
                }

                reduxMappedData.demandFulfillment.map((y) => {

                    console.log(ud)
                    if (y.sNo == ud.sNo) {
                        console.log("INSIDE IF")
                        y.sow = ud.SOW;
                        console.log(y.sow);
                        y.ctsJoiningDate = ud.CTS_Joining_Date;
                        y.status = ud.status;
                        y.subStatus = ud.subStatus;
                        y.profileSent = ud.profile_Sent;
                        y.addComments = ud.add_Comments;
                        y.capability = ud.capability;
                        y.requirementType = ud.requirementType;
                        y.resourceType = ud.resourceType;
                        y.rejections = ud.rejections;
                        y.noOfInterviews = ud.noOfInterviews;
                        y.resourceGrade = ud.resourceGrade;
                        console.log(y);
                    }
                })

                console.log(reduxMappedData.demandNumber);
                console.log(reduxMappedData.demandID);

                console.log(reduxMappedData);
                // axios.put(`http://localhost:8080/updateDemandFulfillmentTable/${reduxMappedData.demandNumber}`, reduxMappedData);

                axios.patch(`http://${serverUrl}/updateResources`, reduxMappedData)
            }
        })

        return reduxMappedData;
    })

    console.log(temp);
    return {
        type: "SAVE_TEMP",
        payload: temp
    }
}