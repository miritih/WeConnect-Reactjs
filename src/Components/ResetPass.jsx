import React from 'react';
import NavBar from './NavBar';
import ProfileNav from './ProfileNav';
import ResetPassForm from './forms/ResetPassForm';
class ResetPass extends React.Component {
  render() {
    return (
      <div>
        <NavBar 
          history={this.props.history} 
          location={this.props.location} 
        />
      <div className="container profile">
        <div className="card">
          <div className="card-body">
            <div className="row">
            <div className="col-sm-3">
             <ProfileNav />
            </div>
            <div className="col-sm-9"><h5>Reset Password</h5>
              <hr/>
              <ResetPassForm />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPass;
