import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  componentDidMount() {
    console.log(this.props.isAuthenticated);
    this.setState({
      isAuthenticated: this.props.isAuthenticated
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.setState({
        isAuthenticated: this.props.isAuthenticated
      })
    }
  }

  render() {
    console.log(this.state.isAuthenticated);
    return (
      <Container fluid className="g-0 flex-grow-1 h-auto landing-page">
        <Row className="hero-wrapper px-3 g-0 w-50 text-center">
          <h1 className="hero-text">
            Tired of the established tourist traps
            and ready for authentic
            travel experience with a local?
          </h1>
          {this.state.isAuthenticated ? (
            <Link to="/search" className="btn btn-primary">
              Search a destination for inspiration
            </Link>
          ) : (
            <div className='text-center'>
              <Link className='btn btn-primary me-2' to='/login'>Login</Link>
              <Link className='btn btn-outline-primary' to='/signup'>Sign up</Link>
            </div>
          )}
        </Row>
      </Container>
    );
  }
}

export default LandingPage;