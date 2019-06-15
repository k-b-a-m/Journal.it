import React, {Component} from 'react';
import {Col, Row, Container, ListGroup} from 'react-bootstrap';
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
    console.log(JSON.stringify(user))
    return(
      <div style={{backgroundColor: 'black', color: 'white'}}>
        <Container>
          <Row>
            <Col>
              {user.user ?
                <ul >
                  {user.user.entries.map(entry =>
                    <li key={entry.id}>
                      {entry.latitude}
                    </li>
                  )}
                </ul>
              : null}
            </Col>
            <Col>
              <h1>Welcome to the user page 2</h1>
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
