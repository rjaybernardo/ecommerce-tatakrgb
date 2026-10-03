import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import StockChip from '../components/StockChip';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';
import { formatPrice } from '../utils/format';

const formatReviewDate = (iso) =>
  new Date(iso).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const ProductJsonLd = ({ product }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: new URL(product.image, window.location.origin).href,
    description: product.description,
    brand: { '@type': 'Brand', name: product.brand },
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PHP',
      price: product.price,
      availability:
        product.countInStock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };
  if (product.numReviews > 0) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.numReviews,
    };
  }
  return (
    <Helmet>
      <script type='application/ld+json'>{JSON.stringify(data)}</script>
    </Helmet>
  );
};

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating: Number(rating),
        comment,
      }).unwrap();
      refetch();
      setRating('');
      setComment('');
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className='back-link' to='/'>
        <FaArrowLeft aria-hidden='true' /> Back to shop
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta
            title={product.name}
            description={product.description}
            image={product.image}
          />
          <ProductJsonLd product={product} />

          <div className='pdp'>
            <div className='pdp__media'>
              <img
                src={product.image}
                alt={product.name}
                width='640'
                height='510'
              />
            </div>

            <div className='pdp__info'>
              <span className='eyebrow'>{product.category}</span>
              <h1>{product.name}</h1>
              <a href='#reviews' className='text-decoration-none'>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </a>
              <p className='price pdp__price'>{formatPrice(product.price)}</p>
              <p className='pdp__desc'>{product.description}</p>

              <div className='buy-box'>
                <div className='buy-box__row'>
                  <StockChip countInStock={product.countInStock} />
                  {product.countInStock > 0 && (
                    <Form.Group
                      controlId='qty'
                      className='d-flex align-items-center gap-2'
                    >
                      <Form.Label className='mb-0'>Qty</Form.Label>
                      <Form.Select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}
                </div>
                <Button
                  className='w-100'
                  size='lg'
                  type='button'
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  {product.countInStock === 0
                    ? 'Sold out'
                    : `Add to cart · ${formatPrice(product.price * qty)}`}
                </Button>
              </div>

              <dl className='spec-list'>
                <dt>Brand</dt>
                <dd>{product.brand}</dd>
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </dl>
            </div>
          </div>

          <section id='reviews' className='reviews' aria-labelledby='reviews-title'>
            <div>
              <h2 id='reviews-title'>Reviews</h2>
              {product.reviews.length === 0 ? (
                <Message>No reviews yet. Be the first to share one.</Message>
              ) : (
                product.reviews.map((review) => (
                  <article key={review._id} className='review-item'>
                    <div className='review-item__head'>
                      <strong>{review.name}</strong>
                      <time dateTime={review.createdAt}>
                        {formatReviewDate(review.createdAt)}
                      </time>
                    </div>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </article>
                ))
              )}
            </div>

            <div className='review-form'>
              <h2>Write a review</h2>

              {loadingProductReview && <Loader />}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group className='my-3' controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value=''>Select…</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className='my-3' controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={4}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    disabled={loadingProductReview}
                    type='submit'
                    variant='primary'
                  >
                    Submit review
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to='/login'>sign in</Link> to write a review
                </Message>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductScreen;
