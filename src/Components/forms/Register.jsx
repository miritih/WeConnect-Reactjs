import React from 'react';
import axios from 'axios';
import Authservice from '../Auth/AuthService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { baseURL } from '../../utils/Config';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      cpassword: '',
      first_name: '',
      last_name: '',
      success: [],
      errors: {}
    };
    this.auth = new Authservice();
    this.handleChange = this.handleChange.bind(this);
    this.confirmPass = this.confirmPass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  confirmPass(e) {
    this.setState({
      cpassword: e.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name
    };

    axios({
      method: 'post',
      url: 'auth/register',
      data: user,
      baseURL: baseURL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        this.props.history.replace('/login');
        toast.success(({ closeToast }) => <div>
          <h3>Success</h3>
              <p>Your Account was successfully Created<br/> 
              Login now with your username and password
              </p>
          </div>);
      }
    }).catch((error) => {
      if (error.response !== undefined) {
        this.setState({ errors: error.response.data['Errors'] });
      }
      else {
        toast.error(({ closeToast }) => <div>
          <h3>Opps!!</h3>
              <p>Sorry! Something went wrong. If the problem persist, contact support</p>
          </div>);
      }
    });
  }
  componentDidMount() {
    if (this.auth.isLoggedIn())
      this.props.history.replace('/');
  }
  render() {
    return (
      <div className="container wrapper">
        <div className="main-center">
              <div className="card">
                <div className="card-body">
                <h3>Create Account</h3>
                   <form className="form" noValidate onSubmit={this.handleSubmit}>
                      <label htmlFor="username" >Username</label>
                      <input 
                      type="text" 
                      className={"form-control " + (
                      this.state.errors['username'] === undefined ? "" : "is-invalid"
                      )}
                      name="username"
                      value= {this.state.username}
                      onChange={this.handleChange}
                      />
                       {(this.state.errors['username'] !== undefined) && 
                       (<small className="text-danger">
                       {this.state.errors['username'].join()}
                       <br/>
                       </small> )
                       }             
                      <label htmlFor="email">Email</label>
                      <input
                      type="email"
                      className={"form-control " + (
                      this.state.errors['email'] === undefined ? "" : "is-invalid"
                      )}
                      name="email"
                      value= {this.state.email}
                      onChange={this.handleChange}
                      />
                       {(this.state.errors['email'] !== undefined) && 
                       (<small className="text-danger">
                       {this.state.errors['email'].join()}
                       <br/>
                       </small> )
                       }  
                      <label htmlFor="first_name">First Name</label>
                      <input 
                      type="text" 
                      className = {
                        "form-control " + (
                          this.state.errors['first_name'] === undefined ? "" : "is-invalid"
                        )
                      }
                      name="first_name"
                      value= {this.state.first_name}
                      onChange={this.handleChange}
                      />
                       {(this.state.errors['first_name'] !== undefined) && 
                       (<small className="text-danger">
                       {this.state.errors['first_name'].join()}
                       <br/>
                       </small> )
                       }  
                      <label htmlFor="last_name">Last Name</label>
                      <input
                      type="text"
                      className={"form-control " + (
                      this.state.errors['last_name'] === undefined ? "" : "is-invalid"
                      )}
                      name="last_name"
                      value= {this.state.lastModifiedDate}
                      onChange={this.handleChange}  
                      />
                       {(this.state.errors['last_name'] !== undefined) && 
                       (<small className="text-danger">
                       {this.state.errors['last_name'].join()}
                       <br/>
                       </small> )
                       } 
                      <label htmlFor="password">Password</label>
                      <input 
                      type="password" 
                      ref="password"
                      className={"form-control " + (
                      this.state.errors['password'] === undefined ? "" : "is-invalid"
                      )}
                      name="password"
                      onChange={this.handleChange}
                      />
                       {(this.state.errors['password'] !== undefined) && 
                       (<small className="text-danger">
                       {this.state.errors['password'].join()}
                       <br/>
                       </small> )
                       }
                      <label htmlFor="confirm_password">Confirm Password</label>
                      <input 
                      type="password" 
                      className={"form-control " + 
                      (this.state.cpassword !== this.state.password ? "is-invalid" : ""
                      )}
                      name="confirm_password"
                      onChange={this.confirmPass}
                      />
                      {(this.state.cpassword !== this.state.password) && 
                       (<small className="text-danger">
                        Password mismatch
                       <br/>
                       </small> )
                       }
                      <br/>
                      <button
                        type="submit"
                        className="btn btn-lg btn-success btn-block btn-signin">Register
                      </button>
                      <p className="message">Alredy registered? <Link to="/login">Signin</Link></p>
                   </form>
                </div>
              </div>
          </div>
      </div>
    );
  }
}

export default RegisterForm;
