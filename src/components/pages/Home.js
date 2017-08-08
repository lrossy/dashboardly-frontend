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
        modal_current: 0
    };
  }
    openModal = () => this.setState({isModalOpen: true});

    closeModal = () => this.setState({isModalOpen: false});

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
              <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} backdropClassName="backdrop"
                     className="modal">
                  <CreateBoard />
              </Modal>
            {auth.isLoggedIn() ? <AddButton clickHandler={this.openModal}/> : null}
          </div>
        );
    }

}
