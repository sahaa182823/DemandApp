import React, { Component } from 'react';
import BarChart from './BarChart'
import axios from 'axios';
import { connect } from "react-redux";
import { serverUrl } from './UrlConstants'
class Statistics extends React.Component{
         constructor(props) {
    super(props);

    this.state = {
        open:0,
        cancelled: 0,
        completed: 0,
        overdue: 0,
        barData1: {
                labels: [],
                datasets: [
                    {
                       label: 'Open demand Statistics',
                       backgroundColor:'rgb(154,205,50)',                                   
                       data: [],
                        
                    },
                  
                ]
            },
            barData2:{
                        labels: [],
                        datasets: [
                              {
                        label: 'Completed demand Statistics',
                        backgroundColor:'rgba(84,255,159)',
                        data:[],
                        
                    }
                        ]
            },
              barData3:{
                        labels: [],
                        datasets: [
                              {
                        label: 'cancelled demand Statistics',
                        backgroundColor:'rgba(255,165,0)',
                        data:[],
                        
                    }
                        ]
            },
              barData4:{
                        labels: [],
                        datasets: [
                              {
                        label: ' demand Statistics',
                        backgroundColor:'rgba(255,71,26)',
                        data:[],
                        
                    }
                        ]
            }

    };
  }

    componentDidMount() {
        this.getAvailableAsset(); 
       
    }
    getAvailableAsset() {
        axios
            .get("http://" + serverUrl + "/getOpenStatusCountByMonth")
            .then(res => {
                console.log(res.data.length)
                const AvailableassetType = res.data;
                
                this.manageAvailableData(res.data,res.data.length);
            });
    }

    manageAvailableData=(AvailableassetType,length)=>{
        let Openname = new Array();
        let Openqty= new Array();
        let Closedname = new Array();
        let Closedqty= new Array();
        let name = new Array();
        let qty= new Array();
        let Completedname = new Array();
        let Completedqty= new Array();
        let a = {};
        let b = {};
        let c = {};
        let d = {};
        let e = {};
        let f = {};
        let g = {};
        let h = {};

         for(let i=0;i<length;i++)
            {
                if(AvailableassetType[i][2] === "Open")
                {
                     a=AvailableassetType[i][0]
                     Openname.push(a)

                     b=AvailableassetType[i][1]
                     Openqty.push(b)
                }
                else if(AvailableassetType[i][2] === "Closed")
                {
                    c=AvailableassetType[i][0]
                     Closedname.push(c)

                     d=AvailableassetType[i][1]
                     Closedqty.push(d)
                }
                else if(AvailableassetType[i][2] === "Overdue")
                {
                    e=AvailableassetType[i][0]
                     name.push(e)

                     f=AvailableassetType[i][1]
                     qty.push(f)
                }
                else if(AvailableassetType[i][2] === "Completed")
                {
                   g=AvailableassetType[i][0]
                     Completedname.push(g)

                     h=AvailableassetType[i][1]
                     Completedqty.push(h) 
                }

    }
  let barData1 = {...this.state.barData1};

    barData1.labels=Openname;
    console.log(barData1.labels);

    barData1.datasets[0].data = Openqty;
    console.log(barData1.datasets[0].data);

    this.setState({barData1});

    let barData2 = {...this.state.barData2};

    barData2.labels=Closedname;
    console.log(barData2.labels);

    barData2.datasets[0].data = Closedqty;
    console.log(barData2.datasets[0].data);

    this.setState({barData2});

     let barData3 = {...this.state.barData3};

    barData3.labels=name;
    console.log(barData3.labels);

    barData3.datasets[0].data = qty;
    console.log(barData3.datasets[0].data);

    this.setState({barData3});

       let barData4 = {...this.state.barData4};

    barData4.labels=Completedname;
    console.log(barData4.labels);

    barData4.datasets[0].data = Completedqty;
    console.log(barData4.datasets[0].data);

    this.setState({barData4});
    
    }


   
       render(){
           console.log(this.state.barData1)
           console.log(this.state.barData2)
           console.log(this.state.barData3)
           console.log(this.state.barData4)
           return(
               <div>
                   <BarChart chartData1={this.state.barData1} chartData2={this.state.barData2} chartData3={this.state.barData3} chartData4={this.state.barData4}/>
                   <br/><br/>
                   </div>
           )
       }



}
       const mapPropsToState = (state) => {
console.log(state)
    return {
        demandfullfillmentData: state.demandFullFillment.demandItems,
        statusOpen:state.demandFullFillment.statusOpen,
        statusCompleted:state.demandFullFillment.statusCompleted,
        statusCancelled:state.demandFullFillment.statusCancelled,
        statusOverdue:state.demandFullFillment.statusOverdue

    }
}

export default connect(mapPropsToState)(Statistics);

