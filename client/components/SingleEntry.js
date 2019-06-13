import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEntryThunk } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
//styles
import '../styles/SingleEntry.css';

class SingleEntry extends Component {
  render() {
    const { entries, entryIndex, updateEntry, toggleEntry, displayedEntries } = this.props;
    const entry = displayedEntries[entryIndex];
    if(!'/entry/'.includes(entry.spotifyUrl)){
      entry.spotifyUrl = `${entry.spotifyUrl.substring(0, 25)}embed/${entry.spotifyUrl.substring(25)}`;
    };
    return (
      <div id="entry" className="displayedEntry">
        <p
          style={{ textAlign: 'right', fontSize: '2em' }}
          onClick={toggleEntry}
        >
          <FontAwesomeIcon icon={faTimes} />
        </p>
        <h1>{entry.content}</h1>
        <iframe className="mb-4" src={entry.spotifyUrl} width="100%" height="80" frameBorder="0" allowTransparency="true" allow="encrypted-media"/>

        <p
          style={{ textAlign: 'right' }}
          onClick={() => updateEntry({...entry, likes: ++entry.likes })}
        >
          <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />{' '}
          {entry.likes}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { entries } = state;
  return { entries };
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

let varaa = 'https://open.spotify.com/'
console.log(varaa.length)
