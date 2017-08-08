import React, {Component} from 'react';
import api from '../../api';
import BookmarkCard from '../elements/BookmarkCard';
import auth from '../../auth';
import AddButton from '../elements/AddButton';
import CreateBookmark from '../modals/CreateBookmark';
import Modal from '../modals/Modal';

import './Board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      bookmarks: [],
      updatedAt: "",
        owner: false,
        user: {},
        isModalOpen: false
    };
  }
  
  componentDidMount() {
    this.fetchBoardData()
  }
  
  fetchBoardData = () => {
      Promise.all([
        api.getBoard(this.props.params.id),
        api.getBookmarks(this.props.params.id)
      ])
      .then(res => {
          console.log('res[0]', res[0].body[0].ownerId);

          this.setState({
              title: res[0].body[0].title,
              description: res[0].body[0].description,
              bookmarks: res[1].body,
              ownerId: res[0].body[0].ownerId
          });
      })
      .then(res => {
          return auth.userInfo();
      })
          .then( (res) => {
              console.log('res',res);

              this.setState({
                  user: res
              });

          })
      .catch(console.error)
  }


    openModal = () => this.setState({ isModalOpen: true });

    closeModal = () => this.setState({ isModalOpen: false });

  render() {
    let { bookmarks } = this.state;
      console.log(this.state.user, this.state.ownerId);
    return (
      <div className="board">
        <ul className="block-grid block-grid-small-1 block-grid-medium-3">
        { bookmarks.map( b =>
          {
            return <BookmarkCard
                key={b.id}
                id={b.id}
                title={b.title}
                description={b.description}
                url={b.url}
            />
          }
        )}
        </ul>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
              <CreateBookmark />
          </Modal>


          {(this.state.user && this.state.user.users_id === this.state.ownerId)? <AddButton clickHandler={this.openModal}/> : null}
      </div>
    );
  }

}
