import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Star = ({ value, position }) =>
  value >= position ? (
    <FaStar />
  ) : value >= position - 0.5 ? (
    <FaStarHalfAlt />
  ) : (
    <FaRegStar />
  );

const Rating = ({ value, text }) => {
  return (
    <div className='rating' role='img' aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((position) => (
        <Star key={position} value={value} position={position} />
      ))}
      {text && <span className='rating-text'>{text}</span>}
    </div>
  );
};

export default Rating;
