import React, { Component } from 'react';
import {onSubmitSelectResource} from '../actions/resourceFullFillmentAction'
import axios from "axios";
import '../css/Demandfulfillment.css'
import { connect } from "react-redux";
import { Router, HashRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import ResourceFulFillment from './ResourceFulFillment'
import { addDemandData, addStatusOpen, addStatusCompleted, addStatusCancelled, addStatusOverdue,changeStatusToCancel } from '../actions/demandFulfilmentAction'
import swal from 'sweetalert'
import { serverUrl } from './UrlConstant'

class Demandfulfilment extends React.Component {

    constructor(props) {

        super(props);
       
        this.state = {
            redirect: false,
            id: '',
            data:[]
        }
    }


  componentWillMount() {
        axios.get("http://" + serverUrl + "/retriveDemands").then(res => {
            this.props.dispatch(addDemandData(res.data))

            res.data.map((individualData, i) => {

                if (individualData.status === "Open") {
                    let temp = 0;
                    temp = (this.state.open + 1);

                    this.setState({ open: temp })


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

    sendToResourceFullFillmentPage = (i, d) => {
        
        this.setState({
            redirect: true,
            data: d


        })
       
        this.renderRedirect();

    }

    changeStatusToCancel = (dNo) => {

        this.props.dispatch(changeStatusToCancel(dNo, this.props.demandfullfillmentData));

        
        swal("The demand has been CANCELLED!! ");


    }


    renderRedirect = () => {
        console.log("INSIDE FUNCTION 2")
        this.setState({
            redirect: true
        })
    }

 



    render() {
        let flag = 1;
        if (this.state.redirect) {
            flag = 0;
        }

          this.props.dispatch(onSubmitSelectResource(
                 {
                     data:this.state.data
                      
                  } ))


        console.log(this.props.demandfullfillmentData)
        return (

            <div>
                {flag ? <div>
                    <div className="container">
                        <div className="row clearfix">
                        <h1>Open Demands</h1>
                            <table className="table table-bordered table-hover" id="tab_logic">
                                <thead class="demandFullFillmentTableHead">
                                    <tr>
                                        <th className="text-center">Demand Number</th>
                                       
                                        <th className="text-center">Prinicipal Name</th>
                                        <th className="text-center">TM Name</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.demandfullfillmentData
                                        .filter(demandfullfill => demandfullfill.status === "Open")
                                        .map((demandfullfill, i) => (
                                        <tr key={demandfullfill.demandID}>
                                            <td>{demandfullfill.demandNumber}</td>
                                      
                                            <td>{demandfullfill.principleName}</td>
                                            <td>{demandfullfill.tName}</td>
                                            <td>{demandfullfill.status}</td>

                                            <td>
                                            
                                            <button class="btn btn-success" onClick={this.sendToResourceFullFillmentPage.bind(this, i,demandfullfill)} >Allocate Resources</button>
                                            &nbsp; &nbsp; &nbsp;
                                            <button class="btn btn-danger" onClick={this.changeStatusToCancel.bind(this,demandfullfill.demandNumber)} >Cancel</button>
                                            
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div> : <ResourceFulFillment  />}
             

           
            </div>

        )
    }

}

const mapPropsToState = (state) => {
    return {
        demandfullfillmentData: state.demandFullFillment.demandItems

    }
}
export default connect(mapPropsToState)(Demandfulfilment);