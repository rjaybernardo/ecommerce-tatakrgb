import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '3.5rem',
        height: '3.5rem',
        margin: '2rem auto',
        display: 'block',
      }}
    >
      <span className='visually-hidden'>Loading…</span>
    </Spinner>
  );
};

export default Loader;
