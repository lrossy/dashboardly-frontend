import React, {Component} from 'react';
import auth from '../../auth'
import './Login.css';

const ENTER = 13;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: []
    };
  }

  _handleLogin = () => {
    // deep destructuring equivalent to (let email = this.refs.email.value;)
    let { email: {value: email}, password: {value: password} } = this.refs;
    if (email && password) {
      auth.login(email, password)
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
          this.props.router.push('/')
        }
      })
      .catch( error => {
        console.log('err', this.state.error, error,  this.state.error.concat(error))
        this.setState({
          error: this.state.error.concat(error)
        });
      })
    }
    else {
      this.setState({ error: ["Please enter an email and password"]})
    }
  }
  
  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: [] })
    }
    if (e.keyCode===ENTER) {
      this._handleLogin()
    }
  }

  render() {
    console.log('this.state.error',this.state.error);

    return (
      <div className="login">
        <input type="text" ref="email"
          onKeyUp={this._handleTyping}
        />
        <input type="password" ref="password"
          onKeyUp={this._handleTyping}
        />
        <button onClick={this._handleLogin}>login</button>
        <div className="errorMsg">
          {this.state.error.map( (e,idx) => <div key={idx}>{e}</div>)}
        </div>
      </div>
    );
  }

}
