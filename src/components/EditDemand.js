import React , {Component} from "react";
import  Modal  from "react-bootstrap/Modal";
import  Button  from "react-bootstrap/Button";
import CreateDemand from "./CreateDemand"
import { connect } from "react-redux";
import { isFulfilled } from "q";
import { clearViewEditData } from '../actions/viewEditAction'

const modalHeader = {
    color : "white"
}

 class EditDemand extends React.Component {

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
                show={this.props.showModalEdit}
                onHide={this.handleHide}
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
                className="viewModal"
              >  
                <Modal.Header  closeButton className="bg-primary  " >
                  <Modal.Title id="example-custom-modal-styling-title" className="text-center">
                    <span style={modalHeader} ><strong>Edit Demand</strong></span>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CreateDemand/>
                </Modal.Body>
              </Modal>
            </div>
          );
    }
}

export default connect()(EditDemand);