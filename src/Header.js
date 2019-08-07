import React from 'react';
import './css/Header.css';

export default class Header extends React.Component {

    render() {

        return (
            <div className="outer_main">
                <div>
                    <div className="row">
                                      <div className="col-md-3  header-logo">
              <img alt="logo" className="img-fluid tlogo" src={require('./pictures/tlogo1.png')} />
            </div>

                              <h3 className="col-md-7">
              <b className="heading">COGNIZANT-TELSTRA DEMAND MANAGEMENT</b>
            </h3>
            <div className="col-md-2">
              <img alt="logo" className="img-fluid clogo" src={require('./pictures/clogo3.png')} />
            </div>

                    
    
                        
                    </div>
                </div>
            </div>
        )
    }
}