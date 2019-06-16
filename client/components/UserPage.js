/* eslint-disable react/button-has-type */
import React, {Component, Fragment} from 'react';
import {Col, Row, Container, Card, Button} from 'react-bootstrap';
import {fetchUser} from '../redux/store';
import {connect} from 'react-redux';
import '../styles/UserPage.css';

class UserProfile extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
    }
  }
  componentDidMount(){
    this.props.fetchUser(this.props.fbUserId)
      .then(user => this.setState({user}));
  }
  componentDidUpdate(prevProps){
    if(prevProps !== this.props){
      this.props.fetchUser(this.props.fbUserId)
        .then(user => this.setState({user}));
    }
  }
  render(){
    let {user} = this.state;
    console.log(this.state);
    console.log(`Facebook user!\n${user}`);
    return(
      <div style={{backgroundColor: 'black', color: 'white', minHeight: '100%'}}>
        <Container>
          <Row>
            <Col className="mt-2">
              <h5>User Profile Page</h5>
              {user.user ?
              <div>
                <Card style={{color: 'black'}} className="mb-3">
                  <Card.Body>
                    <Card.Text>
                      Hello {user.user.name}!
                    </Card.Text>
                    <hr/>
                    <Card.Text>
                      Here are all your stories!
                    </Card.Text>
                  </Card.Body>
                </Card>
                {user.user.entries.length > 0 ?
                  <Fragment>
                    {user.user.entries.map(entry =>
                      <Card class="profileCard" key={entry.id} style={{color: 'black'}} className="mb-3">
                        <Card.Body>
                          <Card.Text>
                            {entry.content}
                          </Card.Text>
                          <Button variant="warning">Renew Entry</Button>
                        </Card.Body>
                      </Card>
                    )}
                  </Fragment>
                : <h2>Sorry you don't have any entries. Go make some!</h2>}
              </div>
              : null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (fbUserId, fbUser) => dispatch(fetchUser(fbUserId, fbUser)),
  }
}

export default connect(null, mapDispatchToProps)(UserProfile);
