import React from "react"
import { Line } from 'react-chartjs-2';

export default class LineChart extends React.Component {
    render() {
        return (
            <div>
                <div className="chart">
                    <Line
                        data={this.props.chartData}
                        options={{
                            title: {
                                display: this.props.display,
                                text: this.props.text,
                                fontSize: 20,
                                padding: 30,
                                fontFamily: 'Helvetica',
                                fontColor: 'white'
                            },
                            legend: {
                                labels: {
                                    boxWidth: 30,
                                    fontColor: 'orange'
                                },
                                display: true,
                                position: "top",
                                onHover: function (event, chartElement) {
                                    event.target.style.cursor = 'pointer'
                                },
                                tooltips: {
                                    mode: 'label',
                                }
                            },
                            onHover: function (event, chartElement) {
                                event.target.style.cursor = 'default';

                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        fontColor: "orange",

                                    },
                                    gridLines: {
                                        display: true,
                                        color: '#808080'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        fontColor: "orange",
                                        min: 0
                                      },
                                        gridLines: {
                                            display: true,
                                            color: '#808080'
                                        },
                                }]
                            }

                        }
                        }
                    />
                </div>
            </div>
        )
    }
}





