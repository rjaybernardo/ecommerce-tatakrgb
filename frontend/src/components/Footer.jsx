import { Container } from 'react-bootstrap';
import { Link } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='site-footer'>
      <Container>
        <div className='site-footer__grid'>
          <div className='site-footer__brand'>
            <p className='display-font fs-5 mb-2'>RGB LeatherCrafts</p>
            <p>
              Handcrafted leather training gear and gaff accessories for
              gamefowl breeders and handlers.
            </p>
          </div>
          <nav aria-label='Shop'>
            <h2>Shop</h2>
            <ul>
              <li>
                <Link to='/'>All products</Link>
              </li>
              <li>
                <Link to='/search/tari'>Tari sheaths &amp; cases</Link>
              </li>
              <li>
                <Link to='/search/case'>Tool cases</Link>
              </li>
            </ul>
          </nav>
          <nav aria-label='Account'>
            <h2>Account</h2>
            <ul>
              <li>
                <Link to='/cart'>Cart</Link>
              </li>
              <li>
                <Link to='/profile'>Orders &amp; profile</Link>
              </li>
              <li>
                <Link to='/login'>Sign in</Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className='site-footer__legal mb-0'>
          RGB LeatherCrafts &copy; {currentYear}
        </p>
      </Container>
    </footer>
  );
};
export default Footer;
