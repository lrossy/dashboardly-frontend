import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './modals/Menu';
import './App.css';
import auth from '../auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMenuOpen: false,
        modalIsOpen: false,
        user: {}
    };
  }
    componentWillMount() {
        this._fetchUserInfo();
    }

    _fetchUserInfo = () => {
        if (auth.isLoggedIn()) {
            auth.userInfo()
                .then(res => {
                    this.setState({ user: res })
                })
                .catch(console.error)
        }
        else {
            this.setState({ error: "Please enter an email and password"})
        }
    };
  closeMenu = () => this.setState({ isMenuOpen: false });
  
  render() {
      // var childrenWithProps = React.Children.map(this.props.children, function (child) {
      //     return React.cloneElement(child, {
      //         user: this.state.user
      //     });
      // }.bind(this));
      let {isMenuOpen} = this.state;

    return (
      <div className="App">
        <div className="App-navbar">
          <i className="fa fa-bars fa-2x menu-icon"
            onClick={()=>this.setState({ isMenuOpen: !isMenuOpen })}
          />
          <Link to="/" className="App-navbar__title">Dashboardly</Link>
          <i className="fa fa-cog fa-2x settings-icon"/>
        </div>

        <Menu show={isMenuOpen} closeMenu={this.closeMenu} user={this.state.user}/>

        {this.props.children}
      </div>
    );
  }
}

export default App;
