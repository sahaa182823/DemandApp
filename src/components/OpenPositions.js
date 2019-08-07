import React from 'react'
import axios from 'axios';
import '../css/Footer.css'
import { CSVLink, CSVDownload } from 'react-csv';
import { serverUrl } from './UrlConstant'


export default class OpenPositions extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      historyItems: [],
      location: '',
      portfolio: '',
      status: '',
      billable: '',
      capability: '',
      principle_name:'',
      portfolioDropdown: [],
      capabilityDropdown: [],
      billableDropdown: [],
      locationDropdown: [],
      principalNameDropdown:[]
    }
  }



  resetFilters(e) {
    e.preventDefault()

    document.getElementById("resetForm").reset();
    this.setState({ filter: 1 })

  }


  filterItems = (val, type) => {
    switch (type) {
      case 'portfolio':
        this.setState({ portfolio: val });
        break;
      case 'location':
        this.setState({ location: val });
        break;
      case 'billable':
        this.setState({ billable: val });
        break;
      case 'capability':
        this.setState({ capability: val });
        break;
        case 'principle_name':
        this.setState({ principle_name: val });
        break;
      default:
        break;
    }
  }

  componentWillMount() {
    this.getTodos();

    axios.get("http://"+ serverUrl +"/getDistinctPortfolio/Open").then(res => {

      this.setState({ portfolioDropdown: res.data });
    });

    axios.get("http://"+ serverUrl +"/getDistinctCapability/Open").then(res => {

      this.setState({ capabilityDropdown: res.data });
    });

    axios.get("http://"+ serverUrl +"/getDistinctBillable").then(res => {

      this.setState({ billableDropdown: res.data });
    });

    axios.get("http://"+ serverUrl +"/getDistinctLocation/Open").then(res => {

      this.setState({ locationDropdown: res.data });
    });

    axios.get("http://"+ serverUrl +"/getDistinctPrincipalName/Open").then(res => {

      this.setState({ principalNameDropdown: res.data });
    });



  }
  getTodos() // here we are using jquery but u can also use axios and superAgent to fetch json data from other API's
  {
    axios.get("http://"+ serverUrl +"/getOpenPositions").then(res => {

      const historyItems = res.data;
      console.log(res.data)
      this.setState({ historyItems });
    });
  }

  changeOption(type, e) {
    var val = e.target.value;
    console.log(type);
    console.log(val);
    this.filterItems(val, type);
  }


  getPortfolio() {

    return (
      this.state.portfolioDropdown.map((portfolio, i) => (

        <option value={portfolio}>{portfolio}</option>
      ))
    )
  }

  getCapability() {

    return (
      this.state.capabilityDropdown.map((capability, i) => (

        <option value={capability}>{capability}</option>
      ))
    )
  }

  getBillable() {

    return (
      this.state.billableDropdown.map((billable, i) => (

        <option value={billable}>{billable}</option>
      ))
    )
  }

  getLocation() {

    return (
      this.state.locationDropdown.map((location, i) => (

        <option value={location}>{location}</option>
      ))
    )
  }


  getPrincipalName() {

    return (
      this.state.principalNameDropdown.map((principle_name, i) => (

        <option value={principle_name}>{principle_name}</option>
      ))
    )
  }




  render() {
    
    // this.state.historyItems.map((data,i) => (

    // ));


    var filteredItems = this.state.historyItems;


    [ "location", "portfolio", "billable", "capability", "principle_name", "All"].forEach((filterBy) => {

      var filterValue = this.state[filterBy];

      if (filterValue === "All") {
        return filteredItems;
      }

      if (filterValue && filterBy === "location") {
        filteredItems = filteredItems.filter((item) => {
          return item[filterBy] === filterValue;
        });
      }

      if (filterValue && filterBy === "portfolio") {
        filteredItems = filteredItems.filter((item) => {
          return item[filterBy] === filterValue;
        });
      }

      if (filterValue && filterBy === "billable") {
        filteredItems = filteredItems.filter((item) => {
          return item[filterBy] === filterValue;
        });
      }

      if (filterValue && filterBy === "capability") {
        filteredItems = filteredItems.filter((item) => {
          return item[filterBy] === filterValue;
        });
      }

      if (filterValue && filterBy === "principle_name") {
        filteredItems = filteredItems.filter((item) => {
          return item[filterBy] === filterValue;
        });
      }


    });

    return (

      <div className="container-fluid">

         <div className="row">

            <div className="col-sm-5"  ></div>

            <div className="col-sm-4"  >
               

            </div>

          <div className="col-sm-3"  style={{ textAlign: 'right' }}>
             <CSVLink data={filteredItems} style={{ height: '92%'}} filename={"OpenDemands on " + this.dateTime + ".csv"} className="btn btn-primary" target="_blank">
                  Download Excel file
                </CSVLink>
          </div>
          
        </div>  
        <br/>

        <div className="row">

          <div id="filterOuterDiv" className="col-sm-3"  >

            <b id="filterHeading">Principal Name: </b>
            <select id="principle_name" onChange={this.changeOption.bind(this, 'principle_name')} >
              <option selected={true}>All</option>
              {this.getPrincipalName()}
            </select>


          </div>

          <div id="filterOuterDiv" className="col-sm-3"  >

            <b id="filterHeading">Portfolio: </b>
            <select id="portfolio" onChange={this.changeOption.bind(this, 'portfolio')} >
              <option defaultValue>All</option>
              {this.getPortfolio()}
            </select>


          </div>


          <div id="filterOuterDiv" className="col-sm-2"  >

            <b id="filterHeading">capability: </b>
            <select id="capability" onChange={this.changeOption.bind(this, 'capability')} >
              <option selected={true}>All</option>
              {this.getCapability()}
            </select>


          </div>

          <div id="filterOuterDiv" className="col-sm-2"  >

            <b id="filterHeading">Billable: </b>
            <select id="billable" onChange={this.changeOption.bind(this, 'billable')} >
              <option selected={true}>All</option>
              {this.getBillable()}
            </select>


          </div>
          <div className="col-sm-2"  >
            <div id="filterOuterDiv" style={{ float: 'left' }}>
              <b id="filterHeading">Location: </b>
              <select id="LocationType" onChange={this.changeOption.bind(this, 'location')}>
                <option selected={true}>All</option>
                {this.getLocation()}
              </select>
            </div>
          </div>


        </div>

        <div className="filter-form">
          <FilterItems data={filteredItems} filter={this.state.filter} />


        </div>
      </div>
    );
  }
}



class FilterItems extends React.Component {

  dateTime = new Date();

  render() {

    let historyItemsLists;
    console.log(this.props.data)
    if (this.props.data) {
      historyItemsLists = this.props.data.map((historyItem, index) => {


        return (

          <tr>
            <td>{historyItem.principle_name}</td>
            <td>{historyItem.tm_name}</td>
            <td>{historyItem.cts_sales_contact}</td>
            <td>{historyItem.portfolio}</td>
            <td>{historyItem.skill}</td>
            <td>{historyItem.description}</td>
            <td>{historyItem.status}</td>
            <td>{historyItem.location}</td>
            <td>{}</td>
            <td>{historyItem.billable}</td>
            <td>{historyItem.request_received_date}</td>
            <td>{historyItem.start_date}</td>
            <td>{historyItem.demand_lead_time}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{historyItem.cts_joining_date}</td>
            <td>{historyItem.sow}</td>
            <td>{}</td>
            <td>{historyItem.profile_Sent}</td>
            <td>{historyItem.no_of_interviews}</td>
            <td>{historyItem.rejections}</td>
            <td><textarea disabled>{historyItem.final_comments}</textarea></td>

          </tr>

        );
      });
    }


    return (
      <div id="table-wrapper">
        <div id="table-scroll">
          <table className="table table-bordered table-hover" id="openPosTable">
            <thead>
              <tr>
                 <th className="text-center">Principal Name</th>
                <th className="text-center">TM/TL Name</th>
                <th className="text-center">Cognizant Contact</th>
                <th className="text-center">Portfolio/Application <br />&nbsp;</th>
                <th className="text-center">Skill <br />&nbsp;</th>
                <th className="text-center">Job Description</th>
                <th className="text-center">Status <br />&nbsp;</th>
                {/*<th className="text-center">Sub Status</th>*/}
                <th className="text-center">Location <br />&nbsp;</th>
                <th className="text-center">No. Of Roles</th>
                <th className="text-center">Billable <br />&nbsp;</th>
                <th className="text-center">Request Received Date</th>
                <th className="text-center">Expected Start Date</th>
                <th className="text-center">Demand Lead Time</th>
                <th className="text-center">Skill/Grade <br />&nbsp;</th>
                <th className="text-center">Requirement Type</th>
                <th className="text-center">SO Creation Date</th>
                <th className="text-center">So# <br />&nbsp;</th>
                <th className="text-center">Cognizant Grade</th>
                <th className="text-center">No. Of Profiles Sent</th>
                <th className="text-center">No. Of Client Interviews</th>
                <th className="text-center">No. Of Rejection</th>
                <th className="text-center">Final Comments <br />&nbsp;</th>

              </tr>
            </thead>
            <tbody>
              {historyItemsLists}


            </tbody>
          </table>


        </div>

        <br />

         {/* <div className="row">

          <div className="col-sm-5"  ></div>

          <div className="col-sm-3"  >
            <CSVLink data={this.props.data} filename={"OpenDemands on " + this.dateTime + ".csv"} className="btn btn-primary" target="_blank">
              Download Excel file
                </CSVLink>

          </div>


          <div className="col-sm-4"  ></div>
        </div>   */}

        <br /><br /> <br /><br />

      </div>
    );
  }
}