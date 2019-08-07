import React, { Component } from 'react';
import ReactDOM from "react-dom"
import { FieldGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import '../css/CreateDemand.css'
import Home from './Home.js'
import { onSubmitDemand } from '../actions/demandAction'
import { ViewEditOnAddBtn, ViewEditOnRemoveBtn, changeViewEditData, editDemandInRedux } from '../actions/viewEditAction'
import { connect } from "react-redux";
import moment from 'moment';
import swal from 'sweetalert';
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import axios from "axios";
import { serverUrl } from './UrlConstant'



const SweetAlert = require('react-bootstrap-sweetalert');

class CreateDemand extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            demandNumber: "",
            principalName: "",
            tName: "",
            ctsSalesContact: "",
            portfolio: "",
            numberOfRoles: "",
            status: "Open",
            billable: "Yes",
            requestReceivedDate: "",
            startDate: "",
            demandLeadTime: "",
            sowNumber: "",      
            random_flag: 0,
            flag: 0,
            temp: 1,
            currentDate : '',
            currentDate1 : '',
            additionalComments:'',


            demandFulfillment: [{ resource_level: "", skill: "", location: "", capability: "", description: "", count:'' }],
            
            
        };

        this.handleSubmit = this.handleSubmit.bind(this);


    }



    // componentWillMount() {


       
    // }

    handlePrincipalNameChangeData(e) {
        this.setState({ principalName: e.target.value })

    }


    handleTMNameChangeData(e) {
        this.setState({ tName: e.target.value })
    }



    handleChangeDemandNumber(e) {
        this.setState({ demandNumber: e.target.value })
    }


    handleCognizantSalesContactChangeData(e) {
        this.setState({ ctsSalesContact: e.target.value })
    }


    PortfolioApplicationChangeData(e) {
        this.setState({ portfolio: e.target.value })
    }

    handleAdditionalCommentsChangeData(e) {
        this.setState({ additionalComments: e.target.value })
    }


    NumberofRolesChangeData(e) {
        this.setState({ numberOfRoles: e.target.value })
    }

    StatusofRolesChangeData(e) {

        this.setState({ status: e.target.value })
    }


    BillableChangeData(e) {
        this.setState({ billable: e.target.value })
    }


    // RequestReceivedDateChangeData(e) {
    //     this.setState({ requestReceivedDate: e.target.value }, () => {


    //         if (this.state.startDate && this.state.requestReceivedDate) {
    //             let RequestReceivedDate = moment(this.state.requestReceivedDate)
    //             let startDate = moment(this.state.startDate)
    //             var duration = moment.duration(startDate.diff(RequestReceivedDate));

    //             var days = duration.asDays();

    //             this.setState({ demandLeadTime: days })

    //         }

    //     }
    //     )

    // }


    StartDateChangeData(e) {

        this.setState({ startDate: e.target.value }, () => {

            if (this.state.startDate && this.state.requestReceivedDate) {
                let RequestReceivedDate = moment(this.state.requestReceivedDate)
                let startDate = moment(this.state.startDate)
                var duration = moment.duration(startDate.diff(RequestReceivedDate));

                var days = duration.asDays();

                this.setState({ demandLeadTime: days })

            }
        }
        )

    }




    SowNumberChangeData(e) {
        this.setState({ sowNumber: e.target.value })
    }


    AdditionalCommentChangeData(e) {
        this.setState({ additionalComments: e.target.value })
    }

    RequiredAssetChangeData(e) {
        this.setState({ requiredAssets: e.target.value })
    }

    handleSubmit(event) {
   
        event.preventDefault();
        document.getElementById("myForm").reset();

        if(this.props.prePopulatedData.length === 0){

        this.props.dispatch(onSubmitDemand(
            {
                demandNumber: this.state.demandNumber,
                principleName: this.state.principalName,
                tName: this.state.tName,
                ctsSalesContact: this.state.ctsSalesContact,
                portfolio: this.state.portfolio,
                numberOfRoles: this.state.numberOfRoles,
                status: this.state.status,
                billable: this.state.billable,
                requestReceivedDate: this.state.requestReceivedDate,
                startDate: this.state.startDate,
                demandLeadTime: this.state.demandLeadTime,
                sowNumber: this.state.sowNumber,
                additionalComments: this.state.additionalComments,
                requiredAssets: this.state.requiredAssets,
              
                demandFulfillment: this.state.demandFulfillment
            }
        ))
    }
    
    else {
        console.log("prePopulatedData:::"+this.props.prePopulatedData);
        console.log("allDemandsInRedux:::"+this.props.allDemandsInRedux);

        this.props.dispatch(editDemandInRedux(this.props.prePopulatedData,this.props.allDemandsInRedux))

    }
        swal("The Demand has been submitted successfully!! ");

        

    };



    getRandomNumber() {
        console.log(this.state.random_flag)
        if (this.state.random_flag === 0) {
         axios.get("http://" + serverUrl + "/getSequentialNumber").then(res => {

           console.log("hiiiiiiiiiiiiiiiiiiiiiiii" + res.data)
            this.setState({ demandNumber: res.data.demandSequence })
            this.setState({ random_flag: 1 })
        }
 )

        }
       
        

        return;
    }


    addClick() {
        this.setState(prevState => ({
            demandFulfillment: [...prevState.demandFulfillment, { resource_level: "", skill: "", location: "", capability: "", jobDescription: "", demandNumber: "" }]
        }))
    }

    addClickOnEdit() {

        this.props.dispatch(ViewEditOnAddBtn(this.props.prePopulatedData2))
        console.log("DISPATCHED")
        console.log(this.props.prePopulatedData2)
        this.setState({ temp: 0 })

    }

    

    removeClick(i) {
        

            swal({
                 
                  text: "Do you really want to delete this row ?",
                  buttons: true,
                  
                })
                .then((willDelete) => {
                      if (willDelete) {
                            let demandFulfillment = [...this.state.demandFulfillment];
                             demandFulfillment.splice(i, 1);
                             this.setState({ demandFulfillment });
                      } else {
                       
                      }
                
            });
           
        
    }

        removeClickOnEdit() {


        
        this.props.dispatch(ViewEditOnRemoveBtn(this.props.prePopulatedData2))
        console.log("DISPATCHED")
        console.log(this.props.prePopulatedData2)
        this.setState({ temp: 0 })

    }

    handleChange(i, e) {

        const { name, value } = e.target;

        let demandFulfillment = [...this.state.demandFulfillment];
        demandFulfillment[i] = { ...demandFulfillment[i], [name]: value };
        demandFulfillment[i] = { ...demandFulfillment[i], ["demandNumber"]: this.state.demandNumber }
        this.setState({ demandFulfillment });

        console.log(this.state.demandFulfillment)
    }


    handleEditChange(i, e) {

        const { name, value } = e.target;

        console.log(name);
        console.log(value);
        console.log(i);

        this.props.dispatch(changeViewEditData(this.props.prePopulatedData2,i, name, value))
    }



    Section1() {
        return (
            <div className="createPageDiv">

                <Row className="sec2">
                    <Col>
                        <h4>Demand Details</h4>
                    </Col>
                </Row>

<br/>
<Row className="mandatoryMsg"><span class="required">&nbsp; &nbsp; &nbsp; * Mandatory fields </span></Row>

                <Row>
                

                    {this.props.prePopulatedData.length === 0 ?

                        <Col sm={5}>
                            
                            <Form.Group controlId="formBasicDemandNumber">
                                <Form.Label id="formFieldLabel"> Demand Number: </Form.Label>
                                <Form.Control type="text" size="sm" name="demandNumber" value={this.state.demandNumber} onFocus={this.getRandomNumber.bind(this)} autoFocus spellCheck="false" readOnly />
                            </Form.Group>
                        </Col>
                        :
                        <Col sm={5}>
                            <Form.Group controlId="formBasicDemandNumber">
                                <Form.Label id="formFieldLabel"> Demand Number: </Form.Label>
                                <Form.Control type="text" size="sm" name="demandNumber" value={this.props.prePopulatedData.demandNumber} readOnly />
                            </Form.Group>
                        </Col>
                    }

                    <Col sm={2}></Col>

                    <Col sm={5}>
                        <Form.Group controlId="formBasicPrincipalName">
                            <Form.Label id="formFieldLabel"> Principal Name: <span class="required">*</span> </Form.Label>
                            <Form.Control type="text" size="sm" name="PrincipalName" defaultValue={this.props.prePopulatedData.principleName} onChange={this.handlePrincipalNameChangeData.bind(this)} pattern="^[A-Za-z -]+$" title="Name should not contain special characters" autoFocus required readOnly={this.state.flag} />
                        </Form.Group>
                    </Col>


                </Row>


                <Row>

                    <Col sm={5}>
                        <Form.Group controlId="formBasicTMName">
                            <Form.Label id="formFieldLabel"> TM Name:<span class="required">*</span> </Form.Label>
                            <Form.Control type="text" size="sm" name="TMName" defaultValue={this.props.prePopulatedData.tName} onChange={this.handleTMNameChangeData.bind(this)} pattern="^[A-Za-z -]+$" title="Name should not contain special characters" required readOnly={this.state.flag} />
                        </Form.Group>
                    </Col>

                    <Col sm={2}></Col>

                    <Col sm={5}>
                        <Form.Group controlId="formBasicCognizantSalesContact">
                            <Form.Label id="formFieldLabel"> Cognizant Sales Contact:<span class="required">*</span> </Form.Label>
                            <Form.Control type="text" size="sm" defaultValue={this.props.prePopulatedData.ctsSalesContact} name="CognizantSalesContact" onChange={this.handleCognizantSalesContactChangeData.bind(this)} pattern="^[A-Za-z -]+$" readOnly={this.state.flag} />
                        </Form.Group>
                    </Col>

                </Row>


                <Row>

                    <Col sm={5}>
                        <Form.Group controlId="formBasicPortfolioApplication">
                            <Form.Label id="formFieldLabel"> Portfolio/Application:<span class="required">*</span> </Form.Label>
                            <Form.Control type="text" size="sm" defaultValue={this.props.prePopulatedData.portfolio} name="PortfolioApplication" onChange={this.PortfolioApplicationChangeData.bind(this)} pattern="^[A-Za-z -]+$" readOnly={this.state.flag} />
                        </Form.Group>
                    </Col>

                    <Col sm={2}></Col>

                    <Col sm={5}>
                    <Form.Group controlId="formBasicRequestReceivedDate">
                        <Form.Label id="formFieldLabel"> Request Received Date: </Form.Label>
                        <Form.Control type="date" size="sm" value={this.state.currentDate} name="RequestReceivedDate" readOnly={true} />
                    </Form.Group>
                </Col>

                    {/*<Col sm={5}>
                        <Form.Group controlId="formBasicNumberofRoles">
                            <Form.Label id="formFieldLabel"> Number of Roles: </Form.Label>
                            <Form.Control type="text" size="sm" name="NumberofRoles" defaultValue={this.props.prePopulatedData.numberOfRoles} onChange={this.NumberofRolesChangeData.bind(this)} pattern="^[0-9]*$" title="Only numbers are accepted" required readOnly={this.state.flag} />
                        </Form.Group>
                </Col>*/}

                {/*this.props.prePopulatedData.length === 0 ?
                    <Col sm={5}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label id="formFieldLabel"> Billable </Form.Label>
                            <Form.Control as="select" size="sm" name="billable" onChange={this.BillableChangeData.bind(this)}>
                                <option value="select" disabled selected>---Select---</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    :
                    <Col sm={5}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label id="formFieldLabel"> Billable </Form.Label>
                            <Form.Control as="select" size="sm" name="billable" onChange={this.BillableChangeData.bind(this)} disabled={this.state.flag}>
                                <option value={this.props.prePopulatedData.billable} disabled selected>{this.props.prePopulatedData.billable}</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                */}


                </Row>


              {/*  <Row>


                   {this.props.prePopulatedData.length === 0 ?
                        <Col sm={5}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label id="formFieldLabel"> Status </Form.Label>
                                <Form.Control as="select" size="sm" name="status" onChange={this.StatusofRolesChangeData.bind(this)} >
                                    <option value="select" selected disabled>---Select---</option>
                                    <option value="Open" readOnly={this.state.flag}>Open</option>
                               
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        :
                        <Col sm={5}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label id="formFieldLabel"> Status </Form.Label>
                                <Form.Control as="select" size="sm" name="status" defaultValue={this.props.prePopulatedData.status} onChange={this.StatusofRolesChangeData.bind(this)} disabled={this.state.flag}>
                                    <option value={this.props.prePopulatedData.status} selected disabled>{this.props.prePopulatedData.status}</option>
                                    <option value="Open">Open</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    }

                    <Col sm={2}></Col>
                    {this.props.prePopulatedData.length === 0 ?
                        <Col sm={5}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label id="formFieldLabel"> Billable </Form.Label>
                                <Form.Control as="select" size="sm" name="billable" onChange={this.BillableChangeData.bind(this)}>
                                    <option value="select" disabled selected>---Select---</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        :
                        <Col sm={5}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label id="formFieldLabel"> Billable </Form.Label>
                                <Form.Control as="select" size="sm" name="billable" onChange={this.BillableChangeData.bind(this)} disabled={this.state.flag}>
                                    <option value={this.props.prePopulatedData.billable} disabled selected>{this.props.prePopulatedData.billable}</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    }

                </Row>*/}


                <Row>

                  

                    

                    <Col sm={5}>
                        <Form.Group controlId="formBasicStartDate">
                            <Form.Label id="formFieldLabel"> Start Date:<span class="required">*</span> </Form.Label>
                            <Form.Control type="date" size="sm" name="StartDate" defaultValue={this.props.prePopulatedData.startDate} onChange={this.StartDateChangeData.bind(this)} readOnly={this.state.flag} min={this.state.currentDate} />
                        </Form.Group>
                    </Col>

                    <Col sm={2}></Col>

                    <Col sm={5}>
                    <Form.Group controlId="additionalComments">
                        <Form.Label id="formFieldLabel"> Additional Comments </Form.Label>
                        <Form.Control as="textarea" rows="2" size="sm" name="additionalComments" defaultValue={this.props.prePopulatedData.additionalComments} onChange={this.handleAdditionalCommentsChangeData.bind(this)} required readOnly={this.state.flag} id="additionalCommentsTextArea" />
                    </Form.Group>

                </Col>

                </Row>


            {/*    <Row>
                    {this.props.prePopulatedData.length === 0 ?
                        <Col sm={5}>
                            <Form.Group controlId="formBasicDemandLeadTime">
                                <Form.Label id="formFieldLabel"> Demand Lead Time: </Form.Label>
                                <Form.Control type="text" size="sm" defaultValue={this.state.demandLeadTime} readOnly />
                            </Form.Group>
                        </Col>
                        :
                        <Col sm={5}>
                            <Form.Group controlId="formBasicDemandLeadTime">
                                <Form.Label id="formFieldLabel"> Demand Lead Time: </Form.Label>
                                <Form.Control type="text" size="sm" defaultValue={this.props.prePopulatedData.demandLeadTime} readOnly />
                            </Form.Group>
                        </Col>

                    }

                    <Col sm={2}></Col>
                </Row>*/}
                    
                   {/*this.props.prePopulatedData.length === 0 ?
                    <Col sm={5}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label id="formFieldLabel"> Status </Form.Label>
                            <Form.Control as="select" size="sm" name="status" onChange={this.StatusofRolesChangeData.bind(this)} >
                                <option value="select" selected disabled>---Select---</option>
                                <option value="Open" readOnly={this.state.flag}>Open</option>
                           
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    :
                    <Col sm={5}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label id="formFieldLabel"> Status </Form.Label>
                            <Form.Control as="select" size="sm" name="status" defaultValue={this.props.prePopulatedData.status} onChange={this.StatusofRolesChangeData.bind(this)} disabled={this.state.flag}>
                                <option value={this.props.prePopulatedData.status} selected disabled>{this.props.prePopulatedData.status}</option>
                                <option value="Open">Open</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                   */}

                  {  /*<Col sm={5}>
                        <Form.Group controlId="formBasicSowNumber">
                            <Form.Label id="formFieldLabel"> Sow Number: </Form.Label>
                            <Form.Control type="text" size="sm" defaultValue={this.props.prePopulatedData.sowNumber} name="SowNumber" onChange={this.SowNumberChangeData.bind(this)} readOnly={this.state.flag} />
                        </Form.Group>
                </Col>*/}

            

{/*
        <Row>

            <Col sm={6}>
                <Form.Group controlId="formBasicAdditionalComment">
                    <Form.Label id="formFieldLabel"> Additional Comments: </Form.Label>
                    <Form.Control type="text" size="sm" defaultValue={this.props.prePopulatedData.additionalComments} name="AdditionalComment" onChange={this.AdditionalCommentChangeData.bind(this)} readOnly={this.state.flag} />
                </Form.Group>
            </Col>

            <Col sm={2}></Col>

            <Col sm={5}>
                <Form.Group controlId="formBasicRequiredAsset">
                    <Form.Label id="formFieldLabel"> Required Asset: </Form.Label>
                    <Form.Control type="text" size="sm" defaultValue={this.props.prePopulatedData.requiredAssets} name="RequiredAsset" onChange={this.RequiredAssetChangeData.bind(this)} readOnly={this.state.flag} />
                </Form.Group>
            </Col>

</Row>*/}

                <br /> <br />

            </div>
        )

    }


    Section2() {

        return this.state.demandFulfillment.map((el, i) => (
            <div key={i}>
                <Row>

                <Col sm={1}>
                <Form.Group controlId="formBasicSkill">
                    <Form.Label id="formFieldLabel"> Skill :<span class="required">*</span></Form.Label>
                    <Form.Control type="text" size="sm" name="skill" value={el.skill || ''} onChange={this.handleChange.bind(this, i)} required />
                </Form.Group>
            </Col>

            <Col sm={1}>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label id="formFieldLabel"> Practice : </Form.Label>
                <Form.Control type="text" size="sm" name="capability" onChange={this.handleChange.bind(this, i)} required>
                </Form.Control>
            </Form.Group>
        </Col>

        <Col sm={2}>
        <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label id="formFieldLabel"> Location: <span class="required">*</span></Form.Label>
            <Form.Control as="select" size="sm" name="location" onChange={this.handleChange.bind(this, i)}>
                <option value="select" disabled={true} selected={true}>---Select---</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Sydney">Sydney</option>
                <option value="Melbourne">Melbourne</option>
            </Form.Control>
        </Form.Group>
    </Col>

                    <Col sm={2}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label id="formFieldLabel"> Resource Grade : <span class="required">*</span></Form.Label>
                            <Form.Control type="text" size="sm" name="resource_level" onChange={this.handleChange.bind(this, i)} required>
                               
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col sm={1}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label id="formFieldLabel"> Count : <span class="required">*</span></Form.Label>
                        <Form.Control type="text" size="sm" name="count" onChange={this.handleChange.bind(this, i)} required>
                        </Form.Control>
                    </Form.Group>
                </Col>

                    <Col sm={2}>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label id="formFieldLabel"> Job Description : </Form.Label>
                            <Form.Control as="textarea" rows="2" size="sm" name="description" onChange={this.handleChange.bind(this, i)} />
                        </Form.Group>
                    </Col>

                    


                    {this.state.demandFulfillment.length == 1 ?

                        <Col sm={2}>
                            <label>&nbsp;</label>
                            <p><Button variant="success" value='add more' onClick={this.addClick.bind(this)}><i class="fa fa-plus"></i></Button>
                            </p>
                        </Col>


                        : <Col sm={2}>
                           

                                <p>
                                    <label>&nbsp;</label>
                                    <p>  {i == (this.state.demandFulfillment.length - 1) && <Button variant="success" value='add more' onClick={this.addClick.bind(this)}><i class="fa fa-plus"></i></Button> } &nbsp;&nbsp;&nbsp;
                                         <Button variant="danger" onClick={this.removeClick.bind(this, i)} ><i class="fa fa-minus"></i></Button> 
                                    </p>
                                </p>

                                
                                <p></p>


                            </Col>
                    }


                </Row>

            </div>
        ))

    }

    viewEditSection2() {


        return (this.props.prePopulatedData.demandFulfillment.map((el, i) => (
            <div key={i}>


                <Row>

                    <Col sm={2}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label id="formFieldLabel"> Edit Resource Grade: </Form.Label>
                            <Form.Control type="text" size="sm" defaultValue={el.resource_level} name="resource_level" onChange={this.handleEditChange.bind(this, i)} required disabled={this.state.flag} />
                                
                        </Form.Group>
                    </Col>

                    <Col sm={2}>
                        <Form.Group controlId="formBasicSkill">
                            <Form.Label id="formFieldLabel"> Skill :</Form.Label>
                            <Form.Control type="text" name="skill" size="sm" defaultValue={el.skill} onChange={this.handleEditChange.bind(this, i)} required disabled={this.state.flag} />
                        </Form.Group>
                    </Col>

                    <Col sm={2}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label id="formFieldLabel"> Location: </Form.Label>
                            <Form.Control as="select" size="sm" name="location" onChange={this.handleEditChange.bind(this, i)} disabled={this.state.flag}>
                                <option value="{el.location}" disabled={true} selected={true}>{el.location}</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Sydney">Sydney</option>
                                <option value="Melbourne">Melbourne</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col sm={2}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label id="formFieldLabel"> Practice: </Form.Label>
                            <Form.Control type="text" size="sm" defaultValue={el.capability} name="capability" onChange={this.handleEditChange.bind(this, i)} required disabled={this.state.flag}>     
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col sm={2}>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label id="formFieldLabel"> Job Description: </Form.Label >
                            <Form.Control as="textarea" rows="2" size="sm" name="description" defaultValue={el.description} onChange={this.handleEditChange.bind(this, i)} disabled={this.state.flag} />
                        </Form.Group>
                    </Col>


                    {this.state.flag === 0 ? <p>

                         {this.props.prePopulatedData.demandFulfillment.length == 1 ?

                        <Col sm={2}>
                            <label>&nbsp;</label>
                            <p><Button variant="success" value='add more' onClick={this.addClickOnEdit.bind(this)}><i class="fa fa-plus"></i></Button>
                            </p>
                        </Col>


                        : <Col sm={2}>
                            {i == (this.props.prePopulatedData.demandFulfillment.length - 1) ?

                                <p>
                                    <label>&nbsp;</label>
                                    <p><Button variant="success" value='add more' onClick={this.addClickOnEdit.bind(this)}><i class="fa fa-plus"></i></Button>&nbsp;&nbsp;&nbsp;
                                        <Button variant="danger" onClick={this.removeClickOnEdit.bind(this, i)} ><i class="fa fa-minus"></i></Button>
                                    </p>
                                </p>

                                :
                                <p></p>


                            } </Col>
                    }


                    </p>
                        :
                        <p></p>
                    }

                </Row>

            </div>
        ))

        )
    }
componentWillMount(){
    let today = new Date().toISOString().substr(0, 10);
    let today1 = new Date();
    today1.setDate(today1.getDate() + 1);
    
    this.setState({currentDate1: today1 })
    this.setState({currentDate: today })
    this.setState({requestReceivedDate: today})


}

    componentDidMount() {
        console.log(this.state.flag)
        console.log(this.props.operationMode)
        if (this.props.operationMode && this.props.operationMode === 1) {

            this.setState({ flag: 1 }, () => { console.log(this.state.flag) })
            console.log()

        }



        console.log(this.state.flag)





    }

    setInitialArray() {
        console.log("INSIDE DEFDINITION")
        this.setState({ demandFulfillment: this.props.prePopulatedData.demandFulfillment }, () => { console.log(this.state.demandFulfillment) })
    }





    render() {


        return (
            <div>
               
                <Container>
                    
                    <Form onSubmit={this.handleSubmit} id="myForm">

                        {this.Section1()}

                        <br /><br />

                        <div className="createUIDiv">
                            <Row className="sec2">
                                <Col>
                                    <h4>Resource Requirements</h4>
                                </Col>
                            </Row>

<br/>

                            {this.props.prePopulatedData.length === 0 ?

                                this.Section2()
                                :

                                this.viewEditSection2()

                            }

                            <br />
                        </div>

                        <br />



                        <Row>


                            <Col sm={5}></Col>

                            {this.props.operationMode ?

                           <p></p>
                                :

                                <Col sm={2}>
                                    <Button type="submit" variant="success">Submit</Button>
                                </Col>

                            }


                            <Col sm={5}></Col>

                        </Row>






                    </Form>
                </Container>

                <br /> <br /> <br /><br /> <br /> <br />
            </div>
        )
    }


}



const mapPropsToState = (state) => {
    console.log(state);

    return {
        prePopulatedData: state.viewEditData.item.data || [],
        prePopulatedData2: state.viewEditData,
        allDemandsInRedux: state.demandFullFillment
        
    }
}
export default connect(mapPropsToState)(CreateDemand);