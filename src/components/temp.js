import React from 'react'
import axios from 'axios';
import $ from 'jquery'
import { serverUrl } from './UrlConstants'

export default class Temp extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            availableAssets: [],
            location: '',
            multiple: false
        }

    }

    checked = (e) => {
        this.setState({ multiple: e.target.value })
    }

    filterItems = (val, type) => {
        switch (type) {
            case 'assetType':
                this.setState({ assetType: val });
                break;
            default:
                break;
        }
    }


    componentWillMount() {
        this.getAvailableAssets();
    }
    getAvailableAssets() // here we are using jquery but u can also use axios and superAgent to fetch json data from other API's
    {
        axios.get("http://" + serverUrl + "/getOpenPositions").then(res => {
            console.log(res.data)
            const availableAssets = res.data;
            this.setState({ availableAssets });


        });
    }



    render() {
        console.log(this.state.availableAssets)
        var filteredItems = this.state.availableAssets;
        // var state = this.state;

        ["assetType", "All"].forEach((filterBy) => {
            console.log(filterBy)
            var filterValue = this.state[filterBy];
            if (filterValue === "All") {
                return filteredItems;
            }
            if (filterValue) {
                filteredItems = filteredItems.filter((item) => {
                    console.log(item[filterBy])
                    return item[filterBy] === filterValue;
                });
            }

        });

        var assetTypeArray = (this.state.availableAssets.map((item) => {
            return item.assetType
        }));

        return (
            <div className="container-fluid">
                <FilterOptions
                    data={this.state.availableAssets}
                    assetTypeOption={[...new Set(assetTypeArray)]}
                    changeOption={this.filterItems} />
                <div className="filter-form">
                    <FilterItems data={filteredItems} />
                </div>
            </div>
        );
    }

}

class FilterOptions extends React.Component {
    changeOption(type, e) {
        var val = e.target.value;

        this.props.changeOption(val, type);
    }



    render() {

        return (
            <div className="container-fluid " > <br /> <br />
                <div className="row">

                    <div className="col-sm-3">
                        <div style={{ float: 'left' }}>
                            <b>AssetType: &nbsp;</b><select id="AssetType" onChange={this.changeOption.bind(this, 'assetType')} >
                                <option selected={true} >All</option>
                                {this.props.assetTypeOption.sort(function (a, b) {
                                    if (a.toLowerCase() < b.toLowerCase()) return -1;
                                    if (a.toLowerCase() > b.toLowerCase()) return 1;
                                    return 0;
                                }).map((option) => {
                                    console.log(option)
                                    return (
                                        <option key={option} value={option}>{option}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-5"></div>
                </div>
                <br /><br />   </div>


        );
    }

}

class FilterItems extends React.Component {
    dateTime = new Date();
    render() {

        let freshData;
        if (this.props.data) {
            freshData = this.props.data.map(availableAsset => {
                console.log(availableAsset.assigned)

            })
        }
        let availableAssetsLists;
        console.log(this.props.data)

        if (this.props.data) {
            availableAssetsLists = this.props.data.map((availableAsset, index) => {


                return (

                    <tr>
                    <td>{availableAsset[0]}</td>
                    <td>{availableAsset[1]}</td>
                    <td>{availableAsset[2]}</td>
                    <td>{availableAsset[3]}</td>
                    <td>{availableAsset[12]}</td>
                    <td>{availableAsset[13]}</td>
                    <td>{availableAsset[14]}</td>
                    <td>{availableAsset[15]}</td>
                    <td>{availableAsset[11]}</td>
                    <td>{availableAsset[16]}</td>
                    <td>{availableAsset[9]}</td>
                    <td>{availableAsset[4]}</td>
                    <td>{availableAsset[5]}</td>
                    <td>{availableAsset[6]}</td>
                    <td>{availableAsset[7]}</td>
                    <td>{availableAsset[17]}</td>
                    <td>{availableAsset[26]}</td>
                    <td>{availableAsset[18]}</td>
                    <td>{availableAsset[10]}</td>
                    <td>{availableAsset[20]}</td>
                    <td>{availableAsset[21]}</td>
                    <td>{availableAsset[22]}</td>
                    <td>{availableAsset[23]}</td>
                    <td><textarea disabled>{availableAsset[24]}</textarea></td>


                    </tr>

                );
            });
        }
        return (
            <div class="container-fluid">
                <table class="table table-hover table-bordered" width="100%">
                    <thead>
                        <tr className="table_head">
                            <th className="text-center">Principal Name</th>
                            <th className="text-center">TM/TL Name</th>
                            <th className="text-center">Cognizant Contact</th>
                            <th className="text-center">Portfolio/Application <br />&nbsp;</th>
                            <th className="text-center">Skill <br />&nbsp;</th>
                            <th className="text-center">Job Description</th>
                            <th className="text-center">Practice <br />&nbsp;</th>
                            <th className="text-center">Status <br />&nbsp;</th>
                            <th className="text-center">Sub Status</th>
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
                        {availableAssetsLists}
                    </tbody>
                </table>
               

                <br /> <br /> <br />

            </div>
        );


    }
}
