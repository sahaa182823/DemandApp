import React from "react";
import { Bar } from 'react-chartjs-2';

export default class BarChart extends React.Component {
    render() {
        return (
            <div className="chart">
                <Bar
                    data={this.props.barData}
                    options={{
                        title: {
                            display: this.props.display,
                            text: this.props.text,
                            fontSize: 25
                        },
                        legend: {
                            labels:{    
                                boxWidth:50,
                                fontColor:'orange'
                                },
                            display: true,
                            position: "top",
                            onHover: function (event,chartElement) {
                                    event.target.style.cursor = 'pointer' 
                        
                            },
                            tooltips: {
                                mode: 'label',
                            }
                        },
                        onHover: function (event,chartElement) {
                                    event.target.style.cursor = 'default';
                        
                            },
                             scales: {
                                xAxes: [{
                                    ticks: {
                                        fontColor: "orange",
                                        display: true,
          scaleLabel: {
            display: true,
            labelString: 'Date'
          },

                                    },
                                    gridLines: {
                                        display: true,
                                        color: '#808080'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        fontColor: "orange",
                                      },
                                        gridLines: {
                                            display: true,
                                            color: '#808080'
                                        },
                                }]
                            }
                    }}
                />
            </div>
        )
    }
}
