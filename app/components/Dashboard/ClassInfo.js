
import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';

const mapStateToProps = (state) => {
  return {  
    messages: state.messages
  };
};

class ClassInfo extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="left-right-container align-center">
        <div className="row">
          <div className="col col-md-4">
            <div className="sub-container inline align-center">
              <i className="material-icons">timeline</i>
              <p className="sub-info"> Week 13 </p>
            </div>
          </div>

            <div className="col col-md-4">
            <div className="sub-container inline align-center">
              <i className="material-icons">date_range</i>
              <p className="sub-info"> SP17 </p>
            </div>
          </div>

            <div className="col col-md-4">
            <div className="sub-container inline align-center">
              <i className="material-icons">face</i>
              <p className="sub-info"> 214 </p>
            </div>       
          </div>
        </div> 
      </div>
    )
  }
}

export default connect(mapStateToProps)(ClassInfo);