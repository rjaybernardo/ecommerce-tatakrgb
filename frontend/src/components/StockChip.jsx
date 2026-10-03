const LOW_STOCK = 5;

const StockChip = ({ countInStock }) => {
  if (countInStock <= 0) {
    return <span className='stock-chip stock-chip--out'>Sold out</span>;
  }
  if (countInStock <= LOW_STOCK) {
    return (
      <span className='stock-chip stock-chip--low'>
        Only {countInStock} left
      </span>
    );
  }
  return <span className='stock-chip'>In stock</span>;
};

export default StockChip;
