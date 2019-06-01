import React, {Component} from 'react';
import Entry from './Entry';
import Nav from './Nav';
import Summary from './Summary';
import Map from './Map';
import {Route} from 'react-router-dom';
import axios from 'axios';

import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      colors: [],
      currentColor: '',
      currentColorId: 0,
    };
  }

  handleChangeColor = (evt, id) => {
    const {target} = evt;
    this.setState({currentColor: target.innerHTML, currentColorId: id});
  };

  handleSubmit = async input => {
    const {currentColorId, entries, colors} = this.state;
    const entryInput = {...input, colorId: currentColorId};
    const newEntry = await axios
      .post('/api/journalentries', entryInput)
      .then(res => res.data);
    const newEntryColor = colors.find(color => color.id === newEntry.colorId);
    const newEntryState = {...newEntry, color: newEntryColor};
    this.setState({entries: [...entries, newEntryState]});
  };

  async componentDidMount() {
    try {
      const resolvedColors = await axios.get('/api/colors');
      const colors = resolvedColors.data;
      const resolvedEntries = await axios.get('/api/journalentries');
      const entries = resolvedEntries.data;
      this.setState({entries, colors});
    } catch (err) {
      console.log(`app componentdidmount error: ${err}`);
    }
  }

  render() {
    const {colors, currentColor, entries, submitted} = this.state;
    return (
      <div
        className={`d-flex flex-column app-container ${
          currentColor !== '' ? `${currentColor}-background` : ''
        }`}
      >
        <Route
          exact
          path="/"
          render={props => (
            <JournalEntry
              props={props}
              colors={colors}
              handleChangeColor={this.handleChangeColor}
              currentColor={currentColor}
              handleSubmit={this.handleSubmit}
              submitted={submitted}
              entries={entries}
            />
          )}
        />
        <Route
          exact
          path="/summary"
          render={props => <Summary props={props} entries={entries} />}
        />
        <Route
          path="/summary/:word"
          render={props => <Summary props={props} entries={entries} />}
        />
        <Route
          path="/map"
          render={props => <Map props={props} entries={entries} />}
        />
      </div>
    );
  }
}

export default App;
