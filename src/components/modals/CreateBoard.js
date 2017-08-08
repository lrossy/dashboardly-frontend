import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import api from '../../api';
import './CreateBoard.css';

export default class CreateBoard extends Component {
    constructor(props) {
        super(props);
        let current = (this.props.board.description) ? this.props.board.description.length : 0;
        this.state = {
            modal_remaining: 80,
            modal_current: current,
            board: this.props.board,
            new: this.props.newboard,

        };
    }

    _handleTyping = (e) => {
        if (e.target.value.length <= this.state.modal_remaining) {
            this.setState({modal_current: e.target.value.length})
        }
        else {
            e.target.value = e.target.value.slice(0, 80);
            this.setState({modal_current: e.target.value.length})
        }
    };

    _handleSubmit = (e) => {
        e.preventDefault();

        let board = {
            title: this.refs.title.value,
            description: this.refs.description.value
        };

        if (this.state.new) {
            api.createBoard(localStorage.token, board)
                .then(res => {
                    browserHistory.push(`/boards/${res.body[0].id}`);
                })
                .catch(console.error);
        }
        else{
            api.editBoard(localStorage.token, board, this.state.board.id)
                .then(res => {
                    console.log('result edit', res)
                    //browserHistory.push(`/boards/${res.body[0].id}`);
                })
                .catch(console.error);
        }

        // this.props.onSearch(this.refs.userInput.value);
    };

    close(e) {
        e.preventDefault()

        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    render() {

        return (
            <div>
                {this.props.newboard ?
                    <h2 ref={subtitle => this.subtitle = subtitle}>Create New Board</h2>
                    :
                    <h2 ref={subtitle => this.subtitle = subtitle}>Edit Board</h2>
                }

                <form onSubmit={this._handleSubmit}>

                    <input type="text" placeholder="Board Title" ref="title" defaultValue={this.props.board.title}/>

                    <textarea cols="20" rows="10" ref="description" onKeyUp={this._handleTyping}
                              defaultValue={this.props.board.description}/>

                </form>
                <div className="remaining">{this.state.modal_current}/{this.state.modal_remaining}</div>
                <div className="buttons">
                    <button onClick={e => this.close(e)} className="btn">close</button>
                    {this.state.new ?
                        <button onClick={this._handleSubmit} className="btn">Create</button>
                        : <button onClick={this._handleSubmit} className="btn">Edit</button>
                    }
                </div>
            </div>
        );
    }
}
