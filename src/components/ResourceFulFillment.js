import React from 'react';
import { connect } from "react-redux";
import { onSubmitSelectResource, updateResource } from '../actions/resourceFullFillmentAction'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import '../css/ResourceFulFillment.css'
import swal from 'sweetalert'
import axios from "axios";

class ResourceFulFillment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SOW: "",
            CTS_Joining_Date: "",
            profile_Sent: "",
            add_Comments: "",
            sNo: "",



            resourceFulfillment: [{ demandNumber: "", sNo: "", SOW: "", CTS_Joining_Date: "", profile_Sent: "", add_Comments: "", subStatus: "", positionStatus: "", requirementType: "", resourceType: "", rejections: "", noOfInterviews: "", resourceGrade: "", soCreationDate: "", capability: "" }],





        }
    }
    handleSNo(SNO) {
        this.setState({ sNo: SNO })
        console.log(this.state.sNo)

    }

    handleChange(i, e) {
        console.log("INSIDE HANDLE CHANGE")
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        console.log("SNO***" + this.state.sNo)

        let resourceFulfillment = [...this.state.resourceFulfillment];
        console.log(resourceFulfillment);
        resourceFulfillment[i] = { ...resourceFulfillment[i], [name]: value };
        resourceFulfillment[i] = { ...resourceFulfillment[i], ["demandNumber"]: this.props.resourceFullFillmentDataArray.demandNumber };
        resourceFulfillment[i] = { ...resourceFulfillment[i], ["sNo"]: this.state.sNo }
        this.setState({ resourceFulfillment }, () => console.log(this.state.resourceFulfillment));
        console.log(this.state.resourceFulfillment)

    }





    handleSubmit = (event) => {
        event.preventDefault();
        // console.log('Event : ' + event.target.checkValidity()); 

        console.log(event.target.value)
        console.log(this.state.resourceFulfillment)
        console.log(this.props.demandFulfillmentData)

        if (event.target.value === "Submit Demand") {
            console.log("INSIDE IF 60")

            this.props.dispatch(updateResource(this.state.resourceFulfillment, this.props.demandFulfillmentData, 0));
        }

        else {
            console.log("INSIDE ELSE 60")
            this.props.dispatch(updateResource(this.state.resourceFulfillment, this.props.demandFulfillmentData, 1));
        }






        swal("The resources has been saved successfully!! ");


    }

    createAutoPopulatedPage() {
        return (
            <div className="container" id="resourceFulfillmentAutoPopulate">
                <br />
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-2">
                            <label>Demand Number:</label>
                        </div>
                        <div className="col-sm-3">

                            <input className="form-control form-control-sm" type="text" name="demandNumber" value={this.props.resourceFullFillmentDataArray.demandNumber} readOnly />
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-2">
                            <label>CTS Sales Contact:</label>
                        </div>

                        <div className="col-sm-3">

                            <input className="form-control form-control-sm" type="text" name="PrincipalName" value={this.props.resourceFullFillmentDataArray.ctsSalesContact} readOnly />
                        </div>




                    </div>
                </div>
                <br /><br /><br />
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-2">
                            <label>Principal Name:</label>
                        </div>
                        <div className="col-sm-3">

                            <input className="form-control form-control-sm" type="text" name="demandNumber" value={this.props.resourceFullFillmentDataArray.principleName} readOnly />
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-2">
                            <label>Project:</label>
                        </div>
                        <div className="col-sm-3">
                            <input className="form-control form-control-sm" type="text" name="PrincipalName" value={this.props.resourceFullFillmentDataArray.portfolio} readOnly />
                        </div>




                    </div>
                </div>
                <br /><br /><br />
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-2">
                            <label>Tech Manager:</label>
                        </div>
                        <div className="col-sm-3">

                            <input className="form-control form-control-sm" type="text" name="demandNumber" value={this.props.resourceFullFillmentDataArray.tName} readOnly />
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
                <br />

            </div>
        )
    }

    textAreaAdjust = (o) => {
        o.style.height = "1px";
        o.style.height = (25 + o.scrollHeight) + "px";
    }


    createDynamicTableRow() {
        return (
            <div id="outerDiv">
                <table className="table table-bordered table-hover" id="tab_logic">
                    <thead>
                        <tr>
                            <th className="text-center">Skill/Grade <br /> &nbsp;</th>
                            <th className="text-center">Requirement Type</th>
                            <th className="text-center">SO#<br /> &nbsp;</th>
                            <th className="text-center">SO# Creation Date<br /> &nbsp;</th>
                            <th className="text-center">Practice<br /> &nbsp;</th>
                            {/*<td className="text-center">Resource Type</td>*/}
                            <th className="text-center">Cognizant Grade</th>
                            {/*<td className="text-center">CTS Joining Date</td>*/}
                            <th className="text-center">No. of Profile Sent<br /> &nbsp;</th>
                            <th className="text-center">No. of Client Interview<br /> &nbsp;</th>
                            <th className="text-center">No. of Rejection<br /> &nbsp;</th>
                            <th className="text-center">Status<br /> &nbsp;</th>
                            {/* <th className="text-center">Sub Status<br /> &nbsp;</th> */}
                            <th className="text-center">Final Comments<br /> &nbsp;</th>

                        </tr>
                    </thead>
                    <tbody>

                        {/*console.log(this.props.resourceFullFillmentData)*/}

                        {this.props.resourceFullFillmentData && this.props.resourceFullFillmentData.map((resourcedata, i) => (
                            console.log(resourcedata),
                            <tr key={resourcedata.sNo}>
                                {console.log(resourcedata.sNo)}

                                <td>{resourcedata.resource_level}</td>


                                <td> <div>

                                    <select defaultValue={resourcedata.requirementType} name="requirementType" onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)}>
                                        <option selected disabled>--select--</option>
                                        <option>New Position</option>
                                        <option>BackFill</option>
                                    </select>
                                </div>
                                </td>

                                <td><input type="text" name="SOW" id="sow" required onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)} defaultValue={resourcedata.sow} /></td>


                                <td><input type="date" name="CTS_Joining_Date" onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)} value={resourcedata.ctsJoiningDate} /></td>


                                {/*<td> <div class="form-group">

                                      <select class="form-control form-control-sm" defaultValue={resourcedata.resourceType}  name="resourceType" onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)}>
                                            <option>Internal</option>
                                          <option selected>External</option>
                                           </select>
                                    </div>
                        </td>*/}

                                <td><input type="text" name="capability" id="capability" required onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)} defaultValue={resourcedata.capability} /></td>
                                <td> <div>

                                    <select defaultValue={resourcedata.resourceGrade} name="resourceGrade" onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)}>
                                    <option selected disabled>--select--</option>
                                        <option>PAT-PA</option>
                                        <option>A</option>
                                        <option>SA</option>
                                        <option>M</option>
                                        <option>SM</option>
                                        <option>SA/A</option>
                                        <option>SA&M</option>
                                    </select>
                                </div>
                                </td>


                                { /*<td><input type="date" class="form-control form-control-sm" name="CTS_Joining_Date" onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)} value={resourcedata.ctsJoiningDate} /></td>*/}
                                <td><input type="text" id="profile_Sent" name="profile_Sent" required onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)} defaultValue={resourcedata.profileSent} /></td>

                                <td><input type="text" name="noOfInterviews" required onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)} defaultValue={resourcedata.noOfInterviews} /></td>

                                <td><textarea rows="1" cols="15" id="noOfRejection" name="rejections" required onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)} defaultValue={resourcedata.rejections} /></td>


                                <td><input type="text" name="status" required onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)} defaultValue={resourcedata.status} /></td>

                                {/* <td><input type="text" name="subStatus" required onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)} defaultValue={resourcedata.subStatus} /></td> */}




                                <td><textarea rows="2" cols="20" name="add_Comments" required onkeyup={this.textAreaAdjust.bind(this, i)} onClick={this.handleSNo.bind(this, resourcedata.sNo)} onChange={this.handleChange.bind(this, i)} defaultValue={resourcedata.addComments} /></td>



                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        )
    }



    render() {

        console.log(this.props.resourceFullFillmentData)

        return (

            <div>
                <Container className="myCont">

                    <Form onSubmit={this.handleSubmit}>
                        <div>


                            <Row className="sec2">
                                <Col>
                                    <h4>Demand Details</h4>
                                </Col>
                            </Row>

                            {this.createAutoPopulatedPage()}
                        </div>


                        <br /> <br />
                        <div>
                            <div>

                                <Row className="sec2">
                                    <Col>
                                        <h4>Resource Requirements</h4>
                                    </Col>
                                </Row>

                                {this.createDynamicTableRow()}
                                <div className="col-sm-12">
                                    <div className="row">

                                        <div className="col-sm-5"></div>

                                        <div className="col-sm-2">

                                        </div>
                                        <div className="col-sm-5"></div>

                                    </div>
                                </div>


                            </div>
                        </div>



                        <div className="col-sm-12">
                            <div className="row">


                                <div className="col-sm-4"></div>
                                <div className="col-sm-2">
                                    <input type="button" className="btn btn-success" value="Submit Demand"
                                        onClick={this.handleSubmit} /><br /><br />
                                </div>

                                <div className="col-sm-2">
                                    <input type="submit" className="btn btn-success" value="Complete Demand" />
                                    {/*disabled={!this.state.isEnable } */}
                                </div>

                                <div className="col-sm-4"></div>
                                <br /><br />  <br /><br />  <br /><br />


                            </div>
                            <div className="col-sm-5"></div>

                        </div>


                        <br /><br />


                    </Form>
                </Container>

            </div>
        )
    }



}


const mapPropsToState = (state) => {
    console.log(state.demandFullFillment)
    return {
        resourceFullFillmentData: state.resourceFulFillment.resourceData.data.demandFulfillment,
        resourceFullFillmentDataArray: state.resourceFulFillment.resourceData.data,
        demandFulfillmentData: state.demandFullFillment
    }
}
export default connect(mapPropsToState)(ResourceFulFillment);