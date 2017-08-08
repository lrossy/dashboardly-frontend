import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import api from '../../api';
import './CreateBoard.css';

export default class CreateBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_remaining: 80,
      modal_current: 0
    };
  }
  _handleTyping = (e) => {
    if(e.target.value.length <= this.state.modal_remaining){
      this.setState({ modal_current: e.target.value.length })
    }
    else{
      e.target.value = e.target.value.slice(0,80);
      this.setState({ modal_current: e.target.value.length })
    }
  };

  _handleSubmit = (e) => {
    e.preventDefault();

    let board = {
      title: this.refs.title.value,
      description: this.refs.description.value
    };

    api.createBoard(localStorage.token, board)
        .then(res => {
          // let newBoards = this.state.boards.concat(res.body);
          // this.closeModal();
          // this.props.createCB(res);
          browserHistory.push(`/boards/${res.body[0].id}`);
          // this.setState({ boards: newBoards });

        })
        .catch(console.error);
    // this.props.onSearch(this.refs.userInput.value);
  };
  render() {

    return (
        <div>
          <h2 ref={subtitle => this.subtitle = subtitle}>Create New Board</h2>
          <form onSubmit={this._handleSubmit}>

            <input type="text" placeholder="Board Title" ref="title"/>

            <textarea cols="20" rows="10" ref="description" onKeyUp={this._handleTyping}/>

          </form>
          <div className="remaining">{this.state.modal_current}/{this.state.modal_remaining}</div>
          <div className="buttons">
            <button onClick={this.closeModal} className="btn">close</button>
            <button onClick={this._handleSubmit} className="btn">Create</button>
          </div>
        </div>
    );
  }
}
