// import * as dataForAgile from "./dataForAgileChart"

import * as GetLabels from './GetLabels'

export const forBarChart1=(filteredData)=>{
  
    return({
                    labels: GetLabels.getLabelNames(filteredData),
                  
                    
                    datasets:
                    [
                        {
                            label: 'INDIA',
                            data: GetLabels.getIndCount(filteredData),
                            // data: [1,2,3,4,5,6,7,8,9,10,1,12],
                            backgroundColor: '#1E90FF'

                        },
                        {
                            label: 'AUSTRALIA',
                            data: GetLabels.getAusCount(filteredData),
                            // data: [2,4,6,8,10,12,14,2,4,6,8,10],
                            backgroundColor: '#66ff66'

                        },

                        {
                            label: 'TOTAL',
                            data: GetLabels.getTotalCount(filteredData),
                            // data: [2,4,6,2,4,6,8,10,8,10,12,14],
                            backgroundColor: '#8A2BE2'

                        }
                    ]
    })
}


export const forLineChart1=(filteredData)=>{
  
    return({
                    labels: GetLabels.getLabelNames(filteredData),
                  
                    
                    datasets:
                    [
                        {
                            label: 'INDIA',
                            data: GetLabels.getIndCount(filteredData),
                            // data: [1,2,3,4,5,6,7,8,9,10,1,12],
                            backgroundColor: 'transparent',
                            borderColor: '#1E90FF',

                        },
                        {
                            label: 'AUSTRALIA',
                            data: GetLabels.getAusCount(filteredData),
                            // data: [2,4,6,8,10,12,14,2,4,6,8,10],
                            backgroundColor: 'transparent',
                            borderColor: '#66ff66',

                        },

                       
                    ]
    })
}

