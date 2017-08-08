import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import Modal from 'react-modal';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import './Home.css';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        boards: [],
        modalIsOpen: false,
        modal_remaining: 80,
        modal_current: 0
    };

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

      componentDidMount() {
       this._fetchBoards();
      }
  
    _fetchBoards = () => {

        api.getBoardsList()
        .then(res => {
          this.setState({ boards: res.body })
        })
        .catch(console.error)
    };
    _handleSubmit = (e) => {
        e.preventDefault();

        let board = {
            title: this.refs.title.value,
            description: this.refs.description.value
        };
        // console.log('_handleSubmit', board, localStorage.token);

        api.createBoard(localStorage.token, board)
            .then(res => {
                // let newBoards = this.state.boards.concat(res.body);
                this.closeModal();
                // this.setState({ boards: newBoards });
                browserHistory.push(`/boards/${res.body[0].id}`);

            })
            .catch(console.error);
        // this.props.onSearch(this.refs.userInput.value);
    };

    _handleTyping = (e) => {
        if(e.target.value.length <= this.state.modal_remaining){
            this.setState({ modal_current: e.target.value.length })
        }
        else{
            e.target.value = e.target.value.slice(0,80);
            this.setState({ modal_current: e.target.value.length })
        }
    };

    render() {

        let { boards } = this.state;
        return (
          <div className="home">
            { boards.map((b,i) =>
              {
                return <BoardCard
                    key={b.id}
                    id={b.id}
                    title={b.title}
                    description={b.description}
                    updatedAt={b.updatedAt}
                />
              }
            )}
              <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Create New Board">
                  <h2 ref={subtitle => this.subtitle = subtitle}>Create New Board</h2>
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
              </Modal>
            {auth.isLoggedIn() ? <AddButton clickHandler={this.openModal}/> : null}
          </div>
        );
    }

}
