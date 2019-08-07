import axios from "axios";



export const getLabelNames = (filteredData) => {

    console.log("FILTEREDDATA")
console.log(filteredData);

let data = [];


    filteredData.map((fData, i) => {
        data[i] = fData[0]; 
    }
    )

console.log(data)
return data;

}

export const getIndCount = (filteredData) => {

   
console.log(filteredData);

let data = ['0', '0', '0', '0', '0'];


    filteredData.map((fData, i) => {
        data[i] = fData[1]; 
    }
    )


console.log(data)
return data;

}
export const getAusCount = (filteredData) => {


console.log(filteredData);

let data = ['0', '0', '0', '0', '0'];


    filteredData.map((fData, i) => {
        data[i] = fData[2]; 
    }
    )


console.log(data)
return data;

}
export const getTotalCount = (filteredData) => {

 
console.log(filteredData);

let data = ['0', '0', '0', '0', '0'];


    filteredData.map((fData, i) => {
        data[i] = fData[3]; 
    }
    )

console.log(data)
return data;

}