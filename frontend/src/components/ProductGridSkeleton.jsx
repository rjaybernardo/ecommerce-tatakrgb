const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className='product-grid' aria-busy='true' aria-label='Loading products'>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className='skeleton skeleton-card' />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
