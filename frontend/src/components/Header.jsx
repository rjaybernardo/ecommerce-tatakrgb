import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingBag, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink, Link } from 'react-router';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';
import useTheme from '../hooks/useTheme';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className='site-header'>
      <Navbar expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <img src={logo} alt='TatakRGB' />
            <span>
              RGB LeatherCrafts
              <small>Tatak RGB</small>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto align-items-lg-center gap-lg-2 py-2 py-lg-0'>
              <SearchBox />
              <Nav.Link as={NavLink} to='/cart'>
                <FaShoppingBag aria-hidden='true' /> Cart
                {cartCount > 0 && (
                  <span className='cart-count' aria-label={`${cartCount} items`}>
                    {cartCount}
                  </span>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username' align='end'>
                  <NavDropdown.Item as={NavLink} to='/profile'>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to='/login'>
                  <FaUser aria-hidden='true' /> Sign In
                </Nav.Link>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' align='end'>
                  <NavDropdown.Item as={NavLink} to='/admin/productlist'>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to='/admin/orderlist'>
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to='/admin/userlist'>
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              <button
                type='button'
                className='theme-toggle'
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
