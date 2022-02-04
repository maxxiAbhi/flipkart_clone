import './App.css';
import React, { useEffect } from 'react';
import Home from './container/homePage';
import ProductListPage from './container/ProductListPage';
import {Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { isUserLogin } from './actions/auth';
import ProductDetailsPage from './container/ProductDetailsPage'
import CartPage from './container/cartPage'
import {updateCart} from './actions/cart.action'
import CheckoutPage from './container/CheckoutPage'
import OrderDetailsPage from './container/OrderDetailsPage'
import OrderPage from './container/OrderPage'

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogin());
    }
  }, [auth.authenticate]);

  useEffect(() => {
      dispatch(updateCart());
  }, [auth.authenticate]);

  
  return (
    <>
    <main>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/cart" component={CartPage}  />
                <Route path="/checkout" component={CheckoutPage} />
                <Route path="/account/orders" component={OrderPage} />
                <Route path="/order_details/:orderId" component={OrderDetailsPage} />
                <Route path="/:slug/:productId/p" component={ProductDetailsPage} />
                <Route path="/:slug" component={ProductListPage}  />
                
            </Switch>
        </main>
    </>
  );
}

export default App;
