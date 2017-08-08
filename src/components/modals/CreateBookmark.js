import React, {Component} from 'react';
import './CreateBookmark.css';

export default class CreateBoookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div>
        <h2 ref={subtitle => this.subtitle = subtitle}>Create New Bookmark</h2>
        <form onSubmit={this._handleSubmit}>
          <div>
            <input type="text" placeholder="Title" ref="title"/>
          </div>
          <div>
            <textarea cols="20" rows="10" ref="description" onKeyUp={this._handleTyping}/>
          </div>
        </form>
        <div className="remaining">{this.state.modal_current}/{this.state.modal_remaining}</div>
        <button onClick={this.closeModal}>close</button>
        <button onClick={this._handleSubmit}>Create</button>
      </div>
    );
  }

}
