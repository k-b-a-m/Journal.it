import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateEntryThunk} from '../redux/store';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faTimes} from '@fortawesome/free-solid-svg-icons';

//styles
import '../styles/SingleEntry.css';

class SingleEntry extends Component {
  render() {
    const {
      entries,
      entryIndex,
      updateEntry,
      toggleEntry,
      displayedEntries,
    } = this.props;
    const entry = displayedEntries[entryIndex];
    if (entry && !entry.spotifyUrl.includes('embed')) {
      entry.spotifyUrl = `${entry.spotifyUrl.substring(
        0,
        25
      )}embed/${entry.spotifyUrl.substring(25)}`;
    }
    if (entry) {
      return (
        <div id="entry" className="entry-container" style={{height: '50vh'}}>
          <p onClick={toggleEntry} className="x-out">
            <FontAwesomeIcon icon={faTimes} />
          </p>
          <div className="entry">
            <p>{entry.content}</p>
          </div>
          <div className="spotify">
            <iframe
              className="mb-4"
              src={entry.spotifyUrl}
              width="100%"
              height="80px"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          </div>
          <p
            style={{textAlign: 'right'}}
            onClick={() => updateEntry({...entry, likes: ++entry.likes})}
          >
            <FontAwesomeIcon icon={faHeart} style={{color: 'red'}} />{' '}
            {entry.likes}
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  const {entries} = state;
  return {entries};
};

const mapDispatchToProps = dispatch => {
  return {
    updateEntry: entry => dispatch(updateEntryThunk(entry)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleEntry);

let varaa = 'https://open.spotify.com/';
