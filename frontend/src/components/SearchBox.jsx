import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${encodeURIComponent(keyword.trim())}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='search-box' role='search'>
      <FaSearch aria-hidden='true' size={14} />
      <Form.Control
        type='search'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search leather goods…'
        aria-label='Search products'
      />
    </Form>
  );
};

export default SearchBox;
