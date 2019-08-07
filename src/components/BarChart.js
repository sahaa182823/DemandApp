import React from "react"
import { Bar } from 'react-chartjs-2';

export default class BarChart extends React.Component {
    render() {
        console.log(this.props.chartData1)
        console.log(this.props.chartData2)
        console.log(this.props.chartData3)
        console.log(this.props.chartData4)
       return (
            <div>
            <div className="row">
                    <div className ="col-sm-3" ></div>
                    <div className ="col-sm-6" >
                    <Bar data={this.props.chartData1}
                         options={{ 
                            title: {
                                display: true,                                
                                fontSize: 25
                                   },
                            legend: {
                                display: true,
                                position: "bottom"
                                    },
                                     scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero:true,
                                                min: 0,
                                                max: 20    
                                            }
                                            }]
                                        }
                                }}/>
                    </div>
                      <div className ="col-sm-3" ></div>
                   </div> 
                
           <div className="row">
               <div className ="col-sm-3"></div>
                    <div className ="col-sm-6">
                    <Bar data={this.props.chartData2}
                         options={{ 
                            title: {
                                display: true,                                
                                fontSize: 25
                                   },
                            legend: {
                                display: true,
                                position: "bottom"
                                    },
                                     scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero:true,
                                                min: 0,
                                                max: 20    
                                            }
                                            }]
                                        }
                                }}/>
                    </div>
                    <div className ="col-sm-3"></div>
                </div>
                 <div className="row">
               <div className ="col-sm-3"></div>
                    <div className ="col-sm-6">
                    <Bar data={this.props.chartData3}
                         options={{ 
                            title: {
                                display: true,                                
                                fontSize: 25
                                   },
                            legend: {
                                display: true,
                                position: "bottom"
                                    },
                                     scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero:true,
                                                min: 0,
                                                max: 20    
                                            }
                                            }]
                                        }
                                }}/>
                    </div>
                    <div className ="col-sm-3"></div>
                </div>
                 <div className="row">
               <div className ="col-sm-3"></div>
                    <div className ="col-sm-6">
                    <Bar data={this.props.chartData4}
                         options={{ 
                            title: {
                                display: true,                                
                                fontSize: 25
                                   },
                            legend: {
                                display: true,
                                position: "bottom"
                                    },
                                     scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero:true,
                                                min: 0,
                                                max: 20    
                                            }
                                            }]
                                        }
                                }}/>
                    </div>
                    <div className ="col-sm-3"></div>
                </div>
                </div>
          
        )
    }
}
