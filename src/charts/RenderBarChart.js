import React from "react";
import axios from "axios";
import BarChart from "./BarChart";
import LineChart from "./LineChart"
import '../css/RenderBarChart.css'
<<<<<<< HEAD
=======
import { serverUrl } from './UrlConstants'
>>>>>>> ce9845c0877116888c2031a63470b37c1114e93e

import * as agileDataSets from "./Datasets"


export default class RenderBarChart extends React.Component {

    state = {
        filteredData: []

    }

    componentWillMount() {


<<<<<<< HEAD
        axios.get('http://localhost:8080/getBarGraphData').then(res => {
=======
        axios.get("http://" + serverUrl + "/getBarGraphData").then(res => {
>>>>>>> ce9845c0877116888c2031a63470b37c1114e93e

            this.setState({ filteredData: res.data })


        }
        )
    }



    render() {

        console.log(this.state.filteredData + "state")

        return (
            <div>

            <div className="row">
            <div className="col-md-5"></div>

            <div className="col-md-4">
                  <h4 id="graphHeading">Open positions</h4>
            
            </div>

            <div className="col-md-3"></div>
            
            </div>

            <br/>

                <div className="row">

                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <BarChart barData={agileDataSets.forBarChart1(this.state.filteredData)} text="" display={false} />
                    </div>
                    <div className="col-md-3"></div>



                    {/*<div className="col-md-6">
                            <LineChart chartData={agileDataSets.forLineChart1(this.state.filteredData)} text={""} display={true} />
        </div>*/}

                </div>

                <br /> <br /> <br /> <br />

            </div>

        )
    }
}