import { Link } from 'react-router';
import Rating from './Rating';
import StockChip from './StockChip';
import { formatPrice } from '../utils/format';

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className='product-card'>
      <div className='product-card__media'>
        <img
          src={product.image}
          alt={product.name}
          loading='lazy'
          decoding='async'
          width='640'
          height='510'
        />
      </div>

      <div className='product-card__body'>
        {product.category && (
          <span className='eyebrow'>{product.category}</span>
        )}
        <h3 className='product-card__title'>{product.name}</h3>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <div className='product-card__footer'>
          <span className='price'>{formatPrice(product.price)}</span>
          <StockChip countInStock={product.countInStock} />
        </div>
      </div>
    </Link>
  );
};

export default Product;
