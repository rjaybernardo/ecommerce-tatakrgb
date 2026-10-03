import { NavLink } from 'react-router';
import { Nav } from 'react-bootstrap';

const STEPS = [
  { label: 'Sign In', to: '/login' },
  { label: 'Shipping', to: '/shipping' },
  { label: 'Payment', to: '/payment' },
  { label: 'Place Order', to: '/placeorder' },
];

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const reached = [step1, step2, step3, step4];

  return (
    <ol className='checkout-steps' aria-label='Checkout progress'>
      {STEPS.map((step, i) => (
        <li key={step.to}>
          {reached[i] ? (
            <Nav.Link as={NavLink} to={step.to}>
              {step.label}
            </Nav.Link>
          ) : (
            <Nav.Link disabled>{step.label}</Nav.Link>
          )}
        </li>
      ))}
    </ol>
  );
};

export default CheckoutSteps;
