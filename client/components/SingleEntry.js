import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEntryThunk } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

class SingleEntry extends Component {
  render() {
    const { entries, entryIndex, updateEntry } = this.props;
    const entry = entries[entryIndex];

    return (
      <div
        id="entry"
        style={{
          color: 'black',
          borderRadius: '1em',
          padding: '1em',
          zIndex: 9999,
          position: 'absolute',
          top: '50%',
          left: '50%',
          backgroundColor: 'white',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <p style={{ textAlign: 'right' }}>X</p>
        <h1>{entry.content}</h1>

        <p
          style={{ textAlign: 'right' }}
          onClick={() => updateEntry({ entry, likes: ++entry.likes })}
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
