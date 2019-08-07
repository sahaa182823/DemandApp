import React from 'react';
import { FieldGroup,Panel, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import TableRow from './TableRow';
import {connect} from "react-redux";
import {onSubmitSelectResource} from '../actions/resourceFullFillmentAction'


class ViewAndEdit extends React.Component{
constructor(props){
    super(props);
this.state ={
        SOW:"",
        CTS_Joining_Date:"",
         rate:"",
         profile_Sent:"",
         add_Comments:"",
         sNo:"",
        

        resourceFulfillment: [{demandNumber:"",  sNo:"", SOW:"", CTS_Joining_Date:"", rate:"", profile_Sent:"",add_Comments:""}],





}
}


          createAutoPopulatedPage(){
                return(
                      <div className="container"> 
                                <div className="col-sm-12">
                                     <div className="row">
                                          <div className="col-sm-2">
                                               <label>Demand Number:</label>
                                                </div>
                                       <div className="col-sm-3">
                              {/*{console.log(this.get)}*/}
                          <input className="form-control" type="text" name="demandNumber" value={this.props. resourceFullFillmentDataArray.demandNumber}  readOnly/>
                          </div>
                          <div className="col-sm-2"></div>
                         <div className="col-sm-2">
                         <label>CTS Sales Contact:</label>
                         </div>
                        
                         <div className="col-sm-3">
                       
                         <input className="form-control" type="text" name="PrincipalName" value={this.props. resourceFullFillmentDataArray.demandNumber} readOnly/>
                         </div>




                                       </div>
                                    </div>
                                        <br/><br/><br/>
                                        <div className="col-sm-12">
                                     <div className="row">
                                          <div className="col-sm-2">
                                               <label>Principal Name:</label>
                                                </div>
                                       <div className="col-sm-3">
                              {/*{console.log(this.get)}*/}
                          <input className="form-control" type="text" name="demandNumber" value={this.props. resourceFullFillmentDataArray.principleName}  readOnly/>
                          </div>
                          <div className="col-sm-2"></div>
                         <div className="col-sm-2">
                         <label>Practice:</label>
                         </div>
                         <div className="col-sm-3">
                         <input className="form-control" type="text" name="PrincipalName"  value={this.props. resourceFullFillmentDataArray.portfolio} readOnly/>
                         </div>




                                       </div>
                                    </div>
                              <br/><br/><br/>
                                        <div className="col-sm-12">
                                     <div className="row">
                                          <div className="col-sm-2">
                                               <label>Tech Manager:</label>
                                                </div>
                                       <div className="col-sm-3">
                              
                          <input className="form-control" type="text" name="demandNumber"  value={this.props. resourceFullFillmentDataArray.demandNumber}  readOnly/>
                          </div>
                          <div className="col-sm-2"></div>
                         <div className="col-sm-2">
                         <label>Project:</label>
                         </div>
                         <div className="col-sm-3">
                         <input className="form-control" type="text" name="PrincipalName" value={this.props. resourceFullFillmentDataArray.tName} readOnly/>
                         </div>
                         </div>
                         </div>

                                    </div>
                                                )  }



                        createDynamicTableRow(){
                             return(
                                 <div>
                                <table className="table table-bordered table-hover"id="tab_logic">
                              <thead>
                              <tr>
                            <th className="text-center">SOW #</th>
                               <th className="text-center">Resource Grade</th>
                               <th className="text-center">CTS Joining Date</th>
                               <th className="text-center">Rate</th>
                               <th className="text-center">Profile Sent</th>                              
                                <th className="text-center">Add Comments</th>
                                </tr>
                                 </thead>
                                 <tbody>
                                {/*{console.log(this.props.resourceFullFillmentData)}*/}
                                     {this.props.resourceFullFillmentData && this.props.resourceFullFillmentData.map((resourcedata,i) => (
                                         // console.log(this.props.demandfullfill), 
                                        <tr key={resourcedata.sNo}>
                                            <td><input className="form-control" type="text" name="SOW" value={this.state.value} onClick={this.handleSNo.bind(this,resourcedata.sNo)} onChange={this.handleChange.bind(this,i)} /></td>
                                            <td>{resourcedata.resource_level}</td>
                                            <td><input type="date" name="CTS_Joining_Date" value={this.state.value} onChange={this.handleChange.bind(this,i)}/></td>
                                            <td><input type="text" name="rate" value={this.state.value} onChange={this.handleChange.bind(this,i)}/></td>
                                            <td><input type="text" name="profile_Sent" value={this.state.value} onChange={this.handleChange.bind(this,i)} /></td>
                                            <td><input type="text" name="add_Comments" value={this.state.value} onChange={this.handleChange.bind(this,i)}/></td>
                                             
                                            
                                           
                                        </tr>
                                       
                                       ))}
                                </tbody>
                                 </table>
                                 </div>
                             )
  }
        
         render(){
            return(
                 
                <div>

                              <form onSubmit={this.handleSubmit}>
                                   <div>
                                  <Panel bsStyle="primary"> 
                                   <Panel.Heading>
                                  <Panel.Title componentClass="h3">Section 1</Panel.Title>
                                  </Panel.Heading> 
                                  <Panel.Body>
                                    {this.createAutoPopulatedPage()}
                                      </Panel.Body>
                                    
                                   </Panel>
                                  
                                  </div>
                                   
                                  <div>
                                  <Panel bsStyle="primary"> 
                                   <Panel.Heading>
                                  <Panel.Title componentClass="h3">Section 2</Panel.Title>
                               
                                  </Panel.Heading> 
                                  <Panel.Body>
                                   {this.createDynamicTableRow() } 
                                 <div className="col-sm-12">
                                    <div className="row">  

                                    <div className="col-sm-5"></div>

                                     <div className="col-sm-2">
    
                               </div>   
                                <div className="col-sm-5"></div>
                               
                               </div>
                               </div>
                                 </Panel.Body>
                                
                              </Panel>
                                </div>
                             
                              

                                 <div className="col-sm-12">
                                    <div className="row">  

                                    <div className="col-sm-5"></div>

                                     <div className="col-sm-2">
                               <input type="submit" className="btn btn-success" value="Submit123" /> 
                                 <br/><br/>  <br/><br/>  <br/><br/>
                               
                               </div>   
                                <div className="col-sm-5"></div>
                               
                               </div>
                               </div>

                               <br/><br/>

                               
                                    </form>
                               
</div>
             )
         }



}


const mapPropsToState = (state) => {
    console.log(state.resourceFulFillment.resourceData.data)
     return {
    resourceFullFillmentData:state.resourceFulFillment.resourceData.data.demandFulfillment,
    resourceFullFillmentDataArray:state.resourceFulFillment.resourceData.data
    //  resourceFullFillmentDataArray:state.resourceFulFillment.resourceData.data.demandFulfillment
   
  }
}
export default connect(mapPropsToState)(ResourceFulFillment);