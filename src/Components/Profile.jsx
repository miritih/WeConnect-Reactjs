import React from 'react';
import NavBar from './NavBar';
import ProfileNav from './ProfileNav';
import ProfileUpdate from './forms/ProfileUpdate';
class Profile extends React.Component {
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
            <div className="col-sm-9"><h5>Edit Profile</h5>
              <hr/>
              <ProfileUpdate />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
