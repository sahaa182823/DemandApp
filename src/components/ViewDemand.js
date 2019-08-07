import React , {Component} from "react";
import  Modal  from "react-bootstrap/Modal";
import  Button  from "react-bootstrap/Button";
import CreateDemand from "./CreateDemand"
import { connect } from "react-redux";
import { isFulfilled } from "q";
import { addViewEditData } from '../actions/viewEditAction';
import { clearViewEditData } from '../actions/viewEditAction'
// import "../css/ViewDemand.css"

const modalHeader = {
    color : "white"
}

 class ViewDemand extends React.Component {

    constructor(props, context) {
        super(props, context);
    
        this.state = {
          data:[],
          show: false,
          
        };
    
        
      }

      handleHide = () => {
        this.props.callBkFn();
this.props.demo();
          this.props.dispatch(clearViewEditData(
                 {
                     data:[]
                      
                  } ))

      };

    render(){

     
        return (
            <div>
      
              <Modal
                show={this.props.showModal}
                onHide={this.handleHide}
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
                className="viewModal"
              >  
                <Modal.Header  closeButton className="bg-primary  " >
                  <Modal.Title id="example-custom-modal-styling-title" className="text-center">
                    <span style={modalHeader} ><strong>View Demand</strong></span>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CreateDemand operationMode={1}/>
                </Modal.Body>
              </Modal>
            </div>
          );
    }
}

export default connect()(ViewDemand);