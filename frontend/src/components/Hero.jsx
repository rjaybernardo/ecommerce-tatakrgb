import { Link } from 'react-router';
import { FaCheck } from 'react-icons/fa';
import { formatPrice } from '../utils/format';

const Hero = ({ product }) => {
  return (
    <section className='hero' aria-labelledby='hero-title'>
      <div>
        <span className='eyebrow'>RGB LeatherCrafts</span>
        <h1 id='hero-title'>
          Leather gear built for the <em>pit and the pen</em>.
        </h1>
        <p className='lead'>
          Training catch bags, dummy roosters, tari sheaths and gaff cases,
          cut and stitched from premium leather for breeders and handlers.
        </p>
        <div className='hero-actions'>
          <a href='#latest' className='btn btn-primary btn-lg'>
            Shop the collection
          </a>
          {product && (
            <Link to={`/product/${product._id}`} className='btn btn-light btn-lg'>
              View best seller
            </Link>
          )}
        </div>
        <ul className='hero-points'>
          <li>
            <FaCheck aria-hidden='true' /> Premium leather
          </li>
          <li>
            <FaCheck aria-hidden='true' /> Handcrafted
          </li>
          <li>
            <FaCheck aria-hidden='true' /> Secure PayPal checkout
          </li>
        </ul>
      </div>
      {product && (
        <figure className='hero-media m-0'>
          <img
            src={product.image}
            alt={product.name}
            width='640'
            height='510'
            fetchPriority='high'
          />
          <figcaption>
            {product.name} · {formatPrice(product.price)}
          </figcaption>
        </figure>
      )}
    </section>
  );
};

export default Hero;
