import React from 'react';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import '../css/Home.css'
import { connect } from "react-redux";
import moment from 'moment';
import { addViewEditData } from '../actions/viewEditAction'
import axios from "axios";
import ViewDemand from "./ViewDemand";
import EditDemand from "./EditDemand";
import { addDemandData, addStatusOpen, addStatusCompleted, addStatusCancelled, addStatusOverdue } from '../actions/demandFulfilmentAction'
import { serverUrl } from './UrlConstant'


class Home extends React.Component {

    constructor(props) {

        super(props);
       // this.RouteChange = this.RouteChange.bind(this,"");
        this.state = {
            redirect: false,
            status: "",
            flag: 1,
            flagForcompleted : 1,
            open: 0,
            cancelled: 0,
            completed: 0,
            overdue: 0,
            showModal: false,
            showModalEdit: false,
            positions : [],
            openPosition : 0 ,
            overduePosition : 0 ,
            cancelledPosition : 0,
            data: []


        }
    }
    componentWillMount() {

        var today = new Date();

        console.log(today);

        let todayMoment = moment(today)

        axios.get("http://" + serverUrl + "/retriveDemands").then(res => {
            this.props.dispatch(addDemandData(res.data))

            res.data.map((individualData, i) => {

                if (individualData.status === "Open" ) {

                    let startDateMoment = moment(individualData.startDate);

                    var duration = moment.duration(startDateMoment.diff(todayMoment));

                    if (duration >= 0) {


                        let temp = 0;
                        temp = (this.state.open + 1);

                        this.setState({ open: temp })
                    }

                    else {
                       

                        // axios.put(`http://${serverUrl}/changeStatusToOverdue/${individualData.demandNumber}`)

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

        //-------------------------------------------------------------------------------------------

        axios.get("http://"+ serverUrl +"/getPositions").then(res => {
            console.log(res.data)
           
                    console.log(res.data)
                
                      this.setState({positions : res.data});
                      
                  });

              
    }
    
    setModalFalse = () => {
        this.setState({ showModal: false });
        this.setState({ showModalEdit: false });
    }


    DetailsBtnClicked(status) {

        this.setState({ status: status }, () => console.log(this.state.status))
        this.setState({ flag: 0 });
        if(status === "Completed"){
            this.setState({flagForcompleted:0});
        }


    }

    backToHome() {
        this.setState({ flag: 1 });
    }

    onCloseModal = () => {
        this.setState({ data: [] })


    }
    RouteChange(status) {
   
        this.setState({status: status},()=> this.props.history.push(this.state.status))
  
     }

    render() {

        console.log(this.state.overdue)
        console.log(this.state.positions[0]+this.state.positions[3])
        this.props.dispatch(addViewEditData(
            {
                data: this.state.data

            }))

        return (
            <div> <br />
                <ViewDemand showModal={this.state.showModal} callBkFn={this.setModalFalse} demo={this.onCloseModal} />
                <EditDemand showModalEdit={this.state.showModalEdit} callBkFn={this.setModalFalse} demo={this.onCloseModal} />

                {this.state.flag ? <div id="cardsRow">

                    <Row >
                        <Col sm="3"></Col>
                        <Col sm="3">
                     
                            <Card body className="myCard open"  onClick={this.DetailsBtnClicked.bind(this, "Open")} >
                                <CardTitle><h5><b>Open<br />Demands</b></h5></CardTitle>
                                <CardText id="cardText">{this.props.statusOpen||0}</CardText><br/>
                                {/*<button type="button" class="btn btn-success">View in Details</button>*/}
                            </Card>
                         
                        </Col>
                       

                        <Col sm="3">
                            <Card body className="myCard completed" onClick={this.DetailsBtnClicked.bind(this, "Completed")}>
                                <CardTitle><h5><b>Completed/Cancelled<br />Demands</b></h5></CardTitle>
                                <CardText id="cardText">{this.props.statusCompleted||0}/{this.state.cancelled||0}</CardText><br/>
                                {/*<button type="button" class="btn btn-success" onClick={this.DetailsBtnClicked.bind(this, "Completed")}>View in Details</button>*/}
                            </Card>
                        </Col>




                   


                        {/*<Col sm="2">
                            <Card body className="myCard cancelled" onClick={this.DetailsBtnClicked.bind(this, "Cancelled")}>
                                <CardTitle><h5><b>Cancelled/Lost<br />Demands</b></h5></CardTitle>
                                <CardText id="cardText">{this.props.statusCancelled}</CardText><br/>
                                {/*<button type="button" class="btn btn-success" onClick={this.DetailsBtnClicked.bind(this, "Cancelled")}>View in Details</button>*/}
                            {/*</Card>
                        </Col>*/}
                        <Col sm="3"></Col>
                     

                        
                    </Row>
                    <br />
                    <Row >
                        <Col sm="3"></Col>
                        <Col sm="3">
                            <Card body className="myCard open" onClick={this.RouteChange.bind(this, "openpositions")}>
                                <CardTitle><h5><b>Open<br />Positions</b></h5></CardTitle>
                                <CardText id="cardText">{this.state.positions[2] || 0}</CardText><br/>
                            </Card>
                        </Col>
                       

                        <Col sm="3">
                            <Card body className="myCard completed" onClick={this.RouteChange.bind(this, "fulfilledpositions")}>
                                <CardTitle><h5><b>Completed/Cancelled<br />Positions</b></h5></CardTitle>
                                <CardText id="cardText">{this.state.positions[0]+this.state.positions[1] || 0}</CardText><br/>
                            </Card>
                        </Col>


                        {/*<Col sm="2">
                            <Card body className="myCard cancelled">
                                <CardTitle><h5><b>Cancelled<br/>Positions</b></h5></CardTitle>
                                <CardText id="cardText">{this.state.positions[2] || 0}</CardText><br/>
                            </Card>
                        </Col>*/}

                     <Col sm="3"></Col>

                        
                    </Row>
                </div> : this.state.flagForcompleted ? <div>
                        <div className="container">

                            <h1>{this.state.status} Demands</h1>
                            <div className="row clearfix">
                                <table className="table table-bordered table-hover" id="tab_logic">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Demand Number</th>
                                       
                                            <th className="text-center">Prinicipal Name</th>
                                            <th className="text-center">TM Name</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">View</th>
                                            <th className="text-center">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.props.demandfullfillmentData)}
                                        {this.props.demandfullfillmentData && this.props.demandfullfillmentData

                                            .filter(demandfullfill => demandfullfill.status === this.state.status) //TODO: Avinash

                                            .map((demandfullfill, i) => (

                                                <tr key={demandfullfill.demandID}>
                                                    <td>{demandfullfill.demandNumber}</td>
                                                    
                                                    <td>{demandfullfill.principleName}</td>
                                                    <td>{demandfullfill.tName}</td>
                                                    <td>{demandfullfill.status}</td>
                                                    <td><button class="btn btn-danger" onClick={() => {
                                                        this.setState({ data: demandfullfill })
                                                        this.setState({ showModal: true })
                                                    }
                                                    }
                                                    >View</button></td>

                                                    <td><button class="btn btn-danger" onClick={() => {
                                                        let x = Object.assign({}, demandfullfill)
                                                        this.setState({ data: x })
                                                        this.setState({ showModalEdit: true })
                                                    }
                                                    }
                                                    >Edit</button></td>
                                                </tr>

                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button class="btn btn-info" onClick={this.backToHome.bind(this)}>Back To Home</button>
                    </div>:<div>
                        <div className="container">      
                            <h1>{this.state.status} Demands</h1>
                            <div className="row clearfix">
                                <table className="table table-bordered table-hover" id="tab_logic">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Demand Number</th>
                                       
                                            <th className="text-center">Prinicipal Name</th>
                                            <th className="text-center">TM Name</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">View</th>
                                            <th className="text-center">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.props.demandfullfillmentData)}
                                        {this.props.demandfullfillmentData && this.props.demandfullfillmentData

                                            .filter(demandfullfill => demandfullfill.status === this.state.status) //TODO: Avinash

                                            .map((demandfullfill, i) => (

                                                <tr key={demandfullfill.demandID}>
                                                    <td>{demandfullfill.demandNumber}</td>
                                                    
                                                    <td>{demandfullfill.principleName}</td>
                                                    <td>{demandfullfill.tName}</td>
                                                    <td>{demandfullfill.status}</td>
                                                    <td><button class="btn btn-danger" onClick={() => {
                                                        this.setState({ data: demandfullfill })
                                                        this.setState({ showModal: true })
                                                    }
                                                    }
                                                    >View</button></td>

                                                    <td><button class="btn btn-danger" onClick={() => {
                                                        let x = Object.assign({}, demandfullfill)
                                                        this.setState({ data: x })
                                                        this.setState({ showModalEdit: true })
                                                    }
                                                    }
                                                    >Edit</button></td>
                                                </tr>

                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            <h1>Cancelled Demands</h1>
                            <div className="row clearfix">
                                <table className="table table-bordered table-hover" id="tab_logic">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Demand Number</th>
                                       
                                            <th className="text-center">Prinicipal Name</th>
                                            <th className="text-center">TM Name</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">View</th>
                                            <th className="text-center">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.props.demandfullfillmentData)}
                                        {this.props.demandfullfillmentData && this.props.demandfullfillmentData

                                            .filter(demandfullfill => demandfullfill.status === "Cancelled") //TODO: Avinash

                                            .map((demandfullfill, i) => (

                                                <tr key={demandfullfill.demandID}>
                                                    <td>{demandfullfill.demandNumber}</td>
                                                    
                                                    <td>{demandfullfill.principleName}</td>
                                                    <td>{demandfullfill.tName}</td>
                                                    <td>{demandfullfill.status}</td>
                                                    <td><button class="btn btn-danger" onClick={() => {
                                                        this.setState({ data: demandfullfill })
                                                        this.setState({ showModal: true })
                                                    }
                                                    }
                                                    >View</button></td>

                                                    <td><button class="btn btn-danger" onClick={() => {
                                                        let x = Object.assign({}, demandfullfill)
                                                        this.setState({ data: x })
                                                        this.setState({ showModalEdit: true })
                                                    }
                                                    }
                                                    >Edit</button></td>
                                                </tr>

                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <button class="btn btn-info" onClick={this.backToHome.bind(this)}>Back To Home</button>
                    </div>
                }
            </div>
        );
    }

}
const mapPropsToState = (state) => {
    console.log(state)
    return {
        demandfullfillmentData: state.demandFullFillment.demandItems,
        statusOpen: state.demandStatus.statusOpen,
        statusCompleted: state.demandStatus.statusCompleted,
        statusCancelled: state.demandStatus.statusCancelled,
        statusOverdue: state.demandStatus.statusOverdue

    }
}
export default connect(mapPropsToState)(Home);