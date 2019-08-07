import React from 'react';
import axios from "axios";
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import BarChart from "../charts/BarChart";
import * as agileDataSets from "../charts/Datasets";
import { serverUrl } from './UrlConstant'

export default class Dashboard extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            locationCount: [],
            portfolioCount: [],
            portfolioCountwithMonth: [],
            portfolioCountforInd:[],
            showDashboard: false,
            // portfolioCountwithMonth:[],
            myDynamicData: [],
            filteredData: []


        }

    }

    showDashboard() {
        if (this.state.showDashboard === false) {
            this.setState({
                showDashboard: true,
            })
        }
        else {
            this.setState({
                showDashboard: false,
            })
        }
    }

    componentWillMount() {


        axios.get("http://" + serverUrl + "/getBarGraphData").then(res => {

            this.setState({ filteredData: res.data })


        }
        )
    }
    componentDidMount() {
        this.getLocationCount();
        axios.get("http://" + serverUrl + "/portfolioCount").then(res => {
            console.log(res.data)
            const portfolioCountwithMonth = res.data;
            this.setState({ portfolioCountwithMonth });
            console.log(portfolioCountwithMonth);
        });
    }

    getLocationCount() {
        axios.get("http://" + serverUrl + "/assignedAssetCount").then(res => {
            console.log(res.data)
            const locationCount = res.data;
            this.setState({ locationCount });
            console.log(locationCount);


        });

        axios.get("http://" + serverUrl + "/portfolioCountwithMonthDataforAus").then(res => {
            console.log(res.data)
            const portfolioCount = res.data;
            this.setState({ portfolioCount });
            console.log(portfolioCount);
        });


        axios.get("http://" + serverUrl + "/portfolioCountwithMonthDataforInd").then(res => {
            console.log(res.data)
            const portfolioCountforInd = res.data;
            this.setState({ portfolioCountforInd });

        });




    }


    setData(myArray) {
        this.setState({ myDynamicData: myArray })
    }
    render() {
        console.log(this.state.myDynamicData[0])

        var myArray = new Array();
        let LocationCount;
        if (this.state.locationCount) {
            LocationCount = this.state.locationCount.map((locationCount, i) => {
                console.log(locationCount);
                return (
                    <tr>
                        <td key={i + "a"}> {locationCount[i, 0]} </td>
                        <td key={i + "b"}> {locationCount[i, 1]}</td>

                    </tr>

                );
            });
        }


        let OpenInprogressCount;
        if (this.state.portfolioCountwithMonth) {
            OpenInprogressCount = this.state.portfolioCountwithMonth.map((openInprogressCount, i) => {
                console.log(openInprogressCount);
                return (
                    <tr>
                        <td key={i + "a"}> {openInprogressCount[i, 0]} </td>
                        <td key={i + "b"}> {openInprogressCount[i, 1]}</td>
                        <td key={i + "c"}> {openInprogressCount[i, 2]}</td>
                        <td key={i + "d"}> {openInprogressCount[i, 3]}</td>

                    </tr>

                );
            });
        }






        let portfolioCWM;
        let existingNames = new Set();
        if (this.state.portfolioCount) {
            portfolioCWM = (this.state.portfolioCount).map((port, i) => {
                console.log(port);
                let tempName = port.principle_name;
                console.log('Name found as,', tempName);
                let name = "";
                if (!existingNames.has(tempName)) {
                    existingNames.add(tempName)
                    name = tempName;
                }
                return (
                    <tr>
                        <td key={i + "a"}> {name}</td>
                        <td key={i + "b"}> {port.portfolio}</td>
                        <td key={i + "c"}> {port.skill}</td>
                        {console.log(this.state.myDynamicData)}
                        {this.state.myDynamicData.map((MDC, i) => {
                            console.log("Print Data:" + MDC)
                            return (
                                <td key={i + "c"}> {port.month === MDC ? port.countData : <p></p>}</td>
                            )
                        })

                        }
                        <td key={i + "c"}> {port.countData}</td>
                    </tr>


                );

            });
        }

        //--------------------------------------------------------------------------------

        let portfolioCWMforInd;
        let existingNames1 = new Set();
        if (this.state.portfolioCount) {
            portfolioCWMforInd = (this.state.portfolioCountforInd).map((port, i) => {
                console.log(port);
                let tempName = port.principle_name;
                console.log('Name found as,', tempName);
                let name = "";
                if (!existingNames1.has(tempName)) {
                    existingNames1.add(tempName)
                    name = tempName;
                }
                return (
                    <tr>
                        <td key={i + "a"}> {name}</td>
                        <td key={i + "b"}> {port.portfolio}</td>
                        <td key={i + "c"}> {port.skill}</td>
                        {console.log(this.state.myDynamicData)}
                        {this.state.myDynamicData.map((MDC, i) => {
                            console.log("Print Data:" + MDC)
                            return (
                                <td key={i + "c"}> {port.month === MDC ? port.countData : <p></p>}</td>
                            )
                        })

                        }
                        <td key={i + "c"}> {port.countData}</td>
                    </tr>


                );

            });
        }



        let tableHeader;

        if (this.state.portfolioCount) {
            tableHeader = this.state.portfolioCount.map((tableHeader, i) => {
                myArray.push(tableHeader.month);

                console.log(myArray)
                console.log(myArray[0])


            });
        if (this.state.portfolioCountforInd) {
            tableHeader = this.state.portfolioCountforInd.map((tableHeader, i) => {
                myArray.push(tableHeader.month);

                console.log(myArray)
                console.log(myArray[0])


            });
        


            this.state.myDynamicData = [...new Set(myArray)];
        }

        let tableHeaderData;
        if (myArray) {
            tableHeaderData = [...new Set(myArray)].map((data, i) => {
                return (
                    <th className="text-center">{data}</th>
                );
            });
        }



        let tableData;
        if (this.state.portfolioCount) {
            tableData = this.state.portfolioCount.map((tableData, i) => {
                                return (
                    <td className="text-center">{tableData.countData}</td>


                );
            });
        }


        return (
            <div><br/>
                <Row>
                <Col sm="4"></Col>
                    <Col sm="4">
                        <table className="table table-hover table-bordered 0" id="home-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Location</th>
                                    <th className="text-center">Count Of Status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {LocationCount}

                            </tbody>
                        </table>
                    </Col>
                    <Col sm="4"></Col>
                    {/* <Col sm="5">
                        <table className="table table-hover table-bordered 0" id="home-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Coustomer Application</th>
                                    <th className="text-center">Open Column</th>
                                    <th className="text-center">In-Progress Column</th>
                                    <th className="text-center">Grand Total</th>
                                </tr>
                            </thead>
                            <tbody>

                                {OpenInprogressCount}

                            </tbody>

                        </table>
                    </Col> */}

                </Row>
                <br /><br/>
                <Row>
                    <Col sm="2"></Col>
                    <Col sm="8">
                        <table className="table table-hover table-bordered 0" id="home-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Principle Name</th>
                                    <th className="text-center">Project/Portfolio</th>
                                    <th className="text-center">Skills</th>
                                    {tableHeaderData}
                                    <th className="text-center">Grand Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfolioCWMforInd}


                            </tbody>

                        </table>
                    </Col>
                    <Col sm="2"></Col>
                </Row>

                <br /> <br />  <br /> 

                <div className="row">
                    <div className="col-md-5"></div>

                    <div className="col-md-4">
                        <h4 id="graphHeading">Open positions</h4>

                    </div>

                    <div className="col-md-3"></div>

                </div>

                <br />

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
