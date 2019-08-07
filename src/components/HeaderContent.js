import React from 'react';
import { HashRouter, Route, NavLink } from "react-router-dom";
import CreateDemand from './CreateDemand';
import Demandfulfilment from './Demandfulfilment'
import ResourceFulFillment from './ResourceFulFillment'
import OpenPositions from './OpenPositions'
import FulfilledPositions from './FulfilledPositions'
import Dashboard from './Dashboard'
import { addDemandData, addStatusOpen, addStatusCompleted, addStatusCancelled, addStatusOverdue } from '../actions/demandFulfilmentAction'
import axios from "axios";
import Home from './Home'
import '../css/HeaderContent.css'
import Header from '../Header'
import Footer from '../Footer'
import { connect } from 'react-redux'
import moment from 'moment';
import { serverUrl } from './UrlConstant'


class HeaderContent extends React.Component {

    state = {
        open: 0,
        inProgress: 0,
        completed: 0,
        cancelled: 0,
        overdue: 0,
        myName:"ashish"

    }

    componentWillMount() {

        var today = new Date();

        console.log(today);

        let todayMoment = moment(today)
 


        axios.get("http://" + serverUrl + "/retriveDemands").then(res => {
            this.props.dispatch(addDemandData(res.data))

            res.data.map((individualData, i) => {


                if (individualData.status === "Open") {


                    let startDateMoment = moment(individualData.startDate);

                    var duration = moment.duration(startDateMoment.diff(todayMoment));

                    if (duration >= 0) {
                        console.log("******GREATER THAN ZERO******")

                        let temp = 0;
                        temp = (this.state.open + 1);

                        this.setState({ open: temp })
                    }

                    else {
                    
                           axios.put(`http://${serverUrl}/changeStatusToOverdue/${individualData.demandNumber}`)

                        let temp = 0;
                        temp = (this.state.overdue + 1);

                        this.setState({ overdue: temp })

                    }
                }


                else if (individualData.status === "Completed") {
                    let temp = 0;
                    temp = (this.state.completed + 1);

                    this.setState({ completed: temp })


                }

                else if (individualData.status === "Cancelled") {
                    let temp = 0;
                    temp = (this.state.cancelled + 1);

                    this.setState({ cancelled: temp })


                }

                else if (individualData.status === "Overdue") {
                    let temp = 0;
                    temp = (this.state.overdue + 1);

                    this.setState({ overdue: temp })


                }

                this.props.dispatch(addStatusOpen(this.state.open))
                this.props.dispatch(addStatusCompleted(this.state.completed))
                this.props.dispatch(addStatusCancelled(this.state.cancelled))
                this.props.dispatch(addStatusOverdue(this.state.overdue))

            })




        })
    }
    render() {
        return (
            <div className="head_main">


                <Header/>


                <HashRouter>
                    <div className="container-fluid padding">
                        <div className="NavLink ">
                            <ul className="header width">
                                <li><NavLink exact to="/"><div className="text">Home</div></NavLink></li>
                                <li><NavLink to="/demandmetrics">Demand Metrics</NavLink></li>
                                <li><NavLink to="/createdemand">CreateDemand</NavLink></li>
                                <li><NavLink exact to="/openpositions">Open Positions</NavLink></li>
                                <li><NavLink exact to="/fulfilledpositions">Fulfilled Positions</NavLink></li>
                                <li><NavLink to="/demandfulfilment">Demand Fulfillment</NavLink></li>
                                

                            </ul>
                        </div>
                        <div className="content">

                            <Route exact path="/" component={Home} />
                            <Route path="/createDemand" component={CreateDemand} />
                            <Route path="/demandmetrics" component={Dashboard} />
                            <Route path="/demandfulfilment" component={Demandfulfilment} />
                            <Route path="/ResourceFulFillment" component={ResourceFulFillment} />
                            <Route path="/openpositions" component={OpenPositions} />
                            <Route path="/fulfilledpositions" component={FulfilledPositions} />
                           
                        </div>

                    </div>
                </HashRouter>

                <Footer />
            </div>


        )
    }


}

export default connect()(HeaderContent);