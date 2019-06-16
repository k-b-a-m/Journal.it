import React, {Component} from 'react';
import {Col, Row, Container, ListGroup, Card} from 'react-bootstrap';
import Nav from './Nav';
import {fetchUser} from '../redux/store';
import {connect} from 'react-redux';

class UserProfile extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
    }
  }
  componentDidMount(){
    this.props.fetchUser(this.props.id)
      .then(user => this.setState({user}));
  }
  render(){
    const {user} = this.state;
    console.log(user.user);
    return(
      <div style={{backgroundColor: 'black', color: 'white'}}>
        <Container>
          <Row>
            <Col>
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
                {user.user.entries.length > 0
                }
                {user.user.entries.map(entry =>
                  <Card key={entry.id} style={{color: 'black'}} className="mb-3">
                    <Card.Body>
                      <Card.Text>
                        {entry.content}
                      </Card.Text>
                      <button className="btn btn-warning">Renew Entry</button>
                    </Card.Body>
                  </Card>
                )}
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
    fetchUser: (id) => dispatch(fetchUser(id)),
  }
}

export default connect(null, mapDispatchToProps)(UserProfile);
