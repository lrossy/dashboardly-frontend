import React, {Component} from 'react';
import api from '../../api';
import BookmarkCard from '../elements/BookmarkCard';
import auth from '../../auth';
import './Board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      bookmarks: [],
      updatedAt: ""
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
        this.setState({
          title: res[0].body.title,
          description: res[0].body.description,
          bookmarks: res[1].body
        })
      })
      .catch(console.error)
  }

  render() {
    let { bookmarks } = this.state
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
      </div>
    );
  }

}
