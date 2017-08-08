import React, {Component} from 'react';
import './BookmarkCard.css';

export default class BookmarkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, description, url } = this.props;
    return (
        <li>
          <a href={url}>
              <div className="bookmark-card">
                  <div>
                      <h2>{ title }</h2>
                      <p>{ description }</p>
                  </div>
                  <img src={""} alt={title}/>
              </div>
          </a>
        </li>
    );
  }

}
