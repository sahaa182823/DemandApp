import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import "../css/AllocatedPositions.css";



class AllocatedPositions extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedCategory: 1,
      showPositions: 0,
      UniqueDemandNumber: ''
    };
  }

  onCategoryChange = e => {
    this.setState({ selectedCategory: e.target.value });
    this.setState({showPositions:0})
  };

  viewAllocatedPositions = (targetedDemandNo) => {
    console.log(targetedDemandNo);
    this.setState({ UniqueDemandNumber: targetedDemandNo })
    this.setState({ showPositions: 1 })
  }

  backToPrevious = () => {
    this.setState({showPositions:0})
  }

  render() {
    console.log(this.state.selectedCategory)
    console.log(this.props.demandfullfillmentData)
    console.log(this.props.demandInnerArray)
    return (
      <div>
      <br/> <br/> 
        <Row className="initialSelector">
          <Col sm={5} className="selectorText">
            <b>Select demand category: </b>
          </Col>

          <Col sm={4} className="selectorDropDown">
            <Form.Control
              as="select"
              name="demandStatus"
              onChange={this.onCategoryChange.bind(this)}
            >
              <option value="select" selected disabled>
                ---Select---
              </option>
              <option value="Open">Open</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Overdue">Overdue</option>
            </Form.Control>
          </Col>

          <Col sm={2} />
        </Row>

        {this.state.selectedCategory === 1 ?
          <p />
          :
          <Row className="selectedCategoryTable">
            <Col sm={2}></Col>

            <Col sm={8}>
              <br /><br />


              {this.state.showPositions === 0 ?
                <div>


                  <h1>{this.state.selectedCategory} Demands</h1>
                  <div className="row clearfix">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr id="demandTableHead">
                          <th className="text-center">Demand Number</th>
                       
                          <th className="text-center">Prinicipal Name</th>
                          <th className="text-center">TM Name</th>
                          <th className="text-center">Status</th>
                          <th className="text-center">Action</th>

                        </tr>
                      </thead>
                      <tbody>
                        {console.log(this.props.demandfullfillmentData)}
                        {this.props.demandfullfillmentData && this.props.demandfullfillmentData

                          .filter(demandfullfill => demandfullfill.status === this.state.selectedCategory)

                          .map((demandfullfill, i) => (

                            <tr key={demandfullfill.demandID}>
                              <td>{demandfullfill.demandNumber}</td>
                            
                              <td>{demandfullfill.principleName}</td>
                              <td>{demandfullfill.tName}</td>
                              <td>{demandfullfill.status}</td>
                             { <td><button class="btn btn-primary" onClick={this.viewAllocatedPositions.bind(this, demandfullfill.demandNumber)}>View Positions</button></td>}
                            </tr>

                          ))}
                      </tbody>
                    </table>
                  </div>

                </div>

                :

                <div>

                  {this.props.demandfullfillmentData && this.props.demandfullfillmentData

                    .filter(demandfullfill => demandfullfill.demandNumber === this.state.UniqueDemandNumber)

                    .map((demandfullfill, i) => (

                      <div>

                        <table className="table table-bordered table-hover" id="tab_logic">
                          <thead>
                            <tr id="demandTableHead">
                              <th className="text-center">SOW#</th>
                              <th className="text-center">Cognizant Grade</th>
                              <th className="text-center">Resource Level</th>
                              <th className="text-center">Skill</th>
                              <th className="text-center">Location</th>
                              <th className="text-center">Capability</th>
                              <th className="text-center">CTS Joining Date</th>
                              <th className="text-center">Profile Sent?</th>
                              <th className="text-center">Description</th>
                              <th className="text-center">Comments</th>

                            </tr>
                          </thead>
                          <tbody>



                            {demandfullfill.demandFulfillment.map((newData, i) => (
                              <tr key={newData.sow}>

                                <td>{newData.sow}</td>
                                <td>{newData.cognizantGrade}</td>
                                <td>{newData.resource_level}</td>
                                <td>{newData.skill}</td>
                                <td>{newData.location}</td>
                                <td>{newData.capability}</td>
                                <td>{newData.ctsJoiningDate}</td>
                                <td>{newData.profileSent}</td>
                                <td>{newData.description}</td>
                                <td>{newData.addComments}</td>


                              </tr>
                            ))}

                          </tbody>
                        </table>
                      </div>



                    ))}
                      <Row>
                      <Col sm={11}></Col>
                      <Col sm={1}>
                      <Button variant="success"  onClick={this.backToPrevious.bind(this)}>Back</Button>
                      </Col>
                      </Row>
                   
                </div>
              }
            </Col>

            <Col sm={4}></Col>
          </Row>


        }
      </div>
    );
  }
}
const mapPropsToState = (state) => {
  return {
    demandfullfillmentData: state.demandFullFillment.demandItems,
    demandInnerArray: state.demandFullFillment.demandItems.demandFulfillment

  }
}
export default connect(mapPropsToState)(AllocatedPositions);
