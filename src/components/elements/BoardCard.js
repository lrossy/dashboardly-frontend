import React, {Component} from 'react';
import { Link } from 'react-router';
import './BoardCard.css';

export default class BoardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  _handleEdit = (e) => {
    e.preventDefault();
    this.props.clickHandler(this.props.board);
  };

  render() {
    let { title, description, id, ownerId } = this.props.board;

    return (

        <Link to={`/boards/${id}`}>
          <div className="board-card">
            <div className="board-card-img">
              <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg" alt="temp img"/>
            </div>
            <div className="board-card-info">
              <h2>{ title }</h2>
              <p>{ description }</p>
            </div>
            <div className="editRow">
              {ownerId === this.props.user.users_id ? <span onClick={this._handleEdit}>Edit</span> : null}
            </div>
          </div>
        </Link>
      

    );
  }

}
