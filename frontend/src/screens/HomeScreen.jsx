import { useParams, Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import {
  useGetProductsQuery,
  useGetTopProductsQuery,
} from '../slices/productsApiSlice';
import Product from '../components/Product';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Hero from '../components/Hero';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const isLanding = !keyword && (!pageNumber || pageNumber === '1');

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const { data: topProducts } = useGetTopProductsQuery(undefined, {
    skip: !isLanding,
  });

  return (
    <>
      <Meta />
      {isLanding ? (
        <>
          <Hero product={topProducts?.[0]} />
          {topProducts?.length > 1 && (
            <section className='section' aria-labelledby='featured-title'>
              <div className='section-head'>
                <div>
                  <span className='eyebrow'>Top rated</span>
                  <h2 id='featured-title'>Breeder favorites</h2>
                </div>
              </div>
              <div className='featured-rail'>
                {topProducts.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        keyword && (
          <Link to='/' className='back-link'>
            <FaArrowLeft aria-hidden='true' /> All products
          </Link>
        )
      )}

      <section id='latest' className='section' aria-labelledby='latest-title'>
        <div className='section-head'>
          <div>
            <span className='eyebrow'>
              {keyword ? 'Search results' : 'The collection'}
            </span>
            <h2 id='latest-title'>
              {keyword ? `“${keyword}”` : 'Latest products'}
            </h2>
          </div>
          {data && (
            <span className='text-body-secondary'>
              {data.pages > 1
                ? `Page ${data.page} of ${data.pages}`
                : `${data.products.length} ${
                    data.products.length === 1 ? 'item' : 'items'
                  }`}
            </span>
          )}
        </div>

        {isLoading ? (
          <ProductGridSkeleton />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : data.products.length === 0 ? (
          <Message>
            No products match “{keyword}”. <Link to='/'>Browse everything</Link>
          </Message>
        ) : (
          <>
            <div className='product-grid'>
              {data.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
            <div className='d-flex justify-content-center mt-4'>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HomeScreen;
