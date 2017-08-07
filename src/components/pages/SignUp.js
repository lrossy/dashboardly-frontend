import React, {Component} from 'react';
import { withRouter } from 'react-router'
import auth from '../../auth'
import './SignUp.css';

const ENTER = 13;


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: []
    };
  }

  _handleSignup = () =>     {
    // deep destructuring equivalent to (let email = this.refs.email.value;)
    let { email: {value: email}, password: {value: password} } = this.refs;
    if (email && password) {
      auth.signup(email, password)
          .then(res => {
              if(res.errors){
                  let arrErr = [];
                  for (var key in res.errors) {
                      if (res.errors.hasOwnProperty(key)) {
                          console.log(key + " -> " + res.errors[key]);
                          arrErr.push(`${key}: ${res.errors[key]}`)
                      }
                  }

                  this.setState({
                      error: arrErr
                  });
              }
              else{
                  this.props.router.push('/login')
              }
          })
    }
    else {
      this.setState({ error: ["Please enter an email and password"]})
    }
  };

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: [] })
    }
    if (e.keyCode===ENTER) {
      this._handleSignup()
    }
  };

  render() {
    return (
        <div className="signup">
          <input type="text" ref="email"
                 onKeyUp={this._handleTyping}
          />
          <input type="password" ref="password"
                 onKeyUp={this._handleTyping}
          />
          <button onClick={this._handleSignup}>Singup</button>

          <div className="errorMsg">
            {this.state.error.map( (e,idx) => <div key={idx}>{e}</div>)}
          </div>
        </div>
    );
  }

}

export default withRouter(SignUp)