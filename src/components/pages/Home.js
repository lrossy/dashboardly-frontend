import React, {Component} from 'react';
import Modal from '../modals/Modal';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import CreateBoard from '../modals/CreateBoard';

import auth from '../../auth';
import './Home.css';
import '../elements/AddButton.css';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        boards: [],
        isModalOpen: false,
        modal_remaining: 80,
        modal_current: 0,
        user: {},
        editBoard: {},
        newboard: true
    };
  }
    openModal = () => this.setState({isModalOpen: true});


    closeModal = () => this.setState({isModalOpen: false, editBoard: {}, newboard: true});

    componentDidMount() {
        this._fetchBoards();
        this.setState({ user: auth.getUser() })
    }
  
    _fetchBoards = () => {

        api.getBoardsList()
        .then(res => {
          this.setState({ boards: res.body })
        })
        .catch(console.error)
    };

    editBoard = (board) => {
        this.setState({
            editBoard: board,
            isModalOpen: true,
            newboard: false
        })
    };

    render() {

        let { boards, user } = this.state;
        return (
          <div className="home">
            { boards.map((b,i) =>
              {
                return <BoardCard
                    key={b.id}
                    user={user}
                    board={b}
                    clickHandler={this.editBoard}
                />
              }
            )}
              <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} backdropClassName="backdrop"
                     className="modal">
                  <CreateBoard board={this.state.editBoard} newboard={this.state.newboard} onClose={() => this.closeModal()}/>
              </Modal>
            {auth.isLoggedIn() ? <AddButton clickHandler={this.openModal}/> : null}
          </div>
        );
    }

}
