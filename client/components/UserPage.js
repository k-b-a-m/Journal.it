/* eslint-disable react/button-has-type */
import React, {Component, Fragment} from 'react';
import {Col, Row, Container, Card, Button} from 'react-bootstrap';
import {fetchUser} from '../redux/store';
import {connect} from 'react-redux';
import '../styles/UserPage.css';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }
  renew() {
    const {updateEntryThunk} = this.props;
    const updatedEntry = {
      expireDate: new Date(
        Date.parse(newDate) + 30 * 24 * 60 * 60 * 1000
      ).toString(),
    };
    updateEntryThunk(updatedEntry);
  }
  componentDidMount() {
    this.props
      .fetchUser(this.props.fbUserId)
      .then(user => this.setState({user}));
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.props
        .fetchUser(this.props.fbUserId)
        .then(user => this.setState({user}));
    }
  }
  render() {
    let {user} = this.state;
    console.log(`Facebook user!\n${user}`);
    return (
      <div style={{ backgroundColor: 'black' }}>
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
            minHeight: '100%',
            position: 'relative',
            top: '60px',
          }}
        >
          <Container>
            <Row>
              <Col className="mt-2">
                <h5>User Profile Page</h5>
                {user.user ? (
                  <div>
                    <Card style={{ color: 'black' }} className="mb-3">
                      <Card.Body>
                        <Card.Text>Hello {user.user.name}!</Card.Text>
                        <hr />
                        <Card.Text>Here are all your stories!</Card.Text>
                      </Card.Body>
                    </Card>
                    {user.user.entries.length > 0 ? (
                      <Fragment>
                        {user.user.entries.map(entry => (
                          <Card
                            class="profileCard"
                            key={entry.id}
                            style={{ color: 'black' }}
                            className="mb-3"
                          >
                            <Card.Body>
                              <Card.Text>{entry.content}</Card.Text>
                              {entry.spotifyUrl !== '' ? (
                                <div>
                                  {!entry.spotifyUrl.includes('embed') ? (
                                    (entry.spotifyUrl = `${entry.spotifyUrl.substring(
                                      0,
                                      25
                                    )}embed/${entry.spotifyUrl.substring(25)}`)
                                  ) : (
                                    <div />
                                  )}
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
                              ) : (
                                <div />
                              )}
                              <Card.Text>
                                {entry.expireDate ? entry.expireDate : null}
                              </Card.Text>
                              <Button onClick={this.renew} variant="warning">
                                Renew Entry
                              </Button>
                            </Card.Body>
                          </Card>
                        ))}
                      </Fragment>
                    ) : (
                      <h2>Sorry you don't have any entries. Go make some!</h2>
                    )}
                  </div>
                ) : null}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (fbUserId, fbUser) => dispatch(fetchUser(fbUserId, fbUser)),
    updateEntryThunk: entry => dispatch(updateEntryThunk(entry)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserProfile);
