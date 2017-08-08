import React, {Component} from 'react';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import './Home.css';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
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
  }

  chunk(arr, len) {

    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }

    return chunks;
  }

  render() {
    // let { boards } = this.state;
    // let boardChunks = this.chunk(boards, 3);
    // console.log('boardChunks',boardChunks);
    //
    // const rows = [( Math.ceil(boards.length / 3) )];
    //
    // const content = boardChunks.map((row, idx) => (
    //     <div className="row" key={idx}>
    //       { row.map( b => <BoardCard key={b.id}  id={b.id} title={b.title} description={b.description} updatedAt={b.updatedAt} className="col-small-12 col-medium-4" /> )}
    //     </div> )
    // );
    // console.log('rows',rows, content)
    // return (
    //     <div className="home">
    //       {content}
    //       {auth.isLoggedIn() ? <AddButton /> : null}
    //     </div>
    // );
    //
    let { boards } = this.state;
    return (
      <div className="home">
        <ul className="block-grid block-grid-small-1">
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
        </ul>
        {auth.isLoggedIn() ? <AddButton /> : null}
      </div>
    );
  }

}
