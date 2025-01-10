import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './Context';

function NavBar({ coins }) {
  const navigate = useNavigate();
  const { setUserContext } = useAuth();

  const logout = () => {
    setUserContext(null);
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to='/home' className='dogagotchi-header'>
          🐶 Dogagatchi+
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='my-1' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav>
            <Nav.Link className='ms-auto' as={Link} to='/user'>
              My Kennel 🦴
            </Nav.Link>
            <Nav.Link className='ms-auto' as={Link} to="/shop">
              Dog Shop 🐾
            </Nav.Link>
            <Nav.Link className='ms-auto' as={Link} to='/quiz'>
              Pooch Picker 🤔
            </Nav.Link>
            <Nav.Link className='ms-auto' as={Link} to='/restaurant'>
              Bone Appetite Cafe 🍽️
            </Nav.Link>
            <Nav.Link className='ms-auto' as={Link} to='/getwellcenter'>
              Get Well Center 💉
            </Nav.Link>
            <Nav.Link className='ms-auto' as={Link} to='/leaderboard'>
              Top Dawgs 🏆
            </Nav.Link>
            <Nav.Link className='ms-auto' as={Link} to='/about'>
              About 📖
            </Nav.Link>
            <Nav.Link className='ms-auto' onClick={logout}>
              BowWowt 👋
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
