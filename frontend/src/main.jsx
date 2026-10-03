import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/theme.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import store from './store';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Checkout, account and admin screens are split into their own chunks so
// shoppers browsing the catalog don't download PayPal or admin code up front.
const ShippingScreen = lazy(() => import('./screens/ShippingScreen'));
const PaymentScreen = lazy(() => import('./screens/PaymentScreen'));
const PlaceOrderScreen = lazy(() => import('./screens/PlaceOrderScreen'));
const OrderScreen = lazy(() => import('./screens/OrderScreen'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
const OrderListScreen = lazy(() => import('./screens/admin/OrderListScreen'));
const ProductListScreen = lazy(() =>
  import('./screens/admin/ProductListScreen')
);
const ProductEditScreen = lazy(() =>
  import('./screens/admin/ProductEditScreen')
);
const UserListScreen = lazy(() => import('./screens/admin/UserListScreen'));
const UserEditScreen = lazy(() => import('./screens/admin/UserEditScreen'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<HomeScreen />}
      />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
