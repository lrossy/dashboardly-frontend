import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import './Menu.css';


class Menu extends Component {
  constructor(props){
      super(props);
      this.state = {
      };
  }
  handleClickOutside = () => {
    this.props.closeMenu();
  };

    logout = () => {

        this.props.closeMenu();

        return auth.logout()
            .then(() => {
                console.log('loggedout');
                this.props.closeMenu();
                browserHistory.push(`/`);
            })
    };

  render() {
    let { closeMenu, show } = this.props;
    const isLoggedIn = auth.isLoggedIn();
    return (
      <div className={`menu ${show?"show":""}`}>

        <div className="menu__header">
            {(isLoggedIn && this.props.user) ?
                <img src={this.props.user.avatarUrl} alt="profile-pic" className="menu__avatar"/>
                    :  <img src="" alt="profile-pic" className="menu__avatar"/>}
        </div>

        <div className="menu__list">

          <Link to="/" className="menu__item" onClick={closeMenu}>
            Home
          </Link>

          {!isLoggedIn ?
            <Link to="/login" className="menu__item" onClick={closeMenu}>
              Login
            </Link>
          : null}

          {!isLoggedIn ?
            <Link to="/signup" className="menu__item" onClick={closeMenu}>
              Signup
            </Link>
          : null}

          {isLoggedIn ?
            <div onClick={this.logout} className="menu__item">
              Logout
            </div>
          : null}
        </div>

      </div>
    );
  }

}

export default onClickOutside(Menu);
