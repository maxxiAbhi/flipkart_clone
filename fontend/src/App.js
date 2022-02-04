import './App.css';
import {Route, Switch } from 'react-router-dom';
import MyNavbar from './components/layouts/MyNavbar'
import Signin from './container/SignIn/'
import Signup from './container/SignUp/'
import Home from './container/Home/'
import Products from './container/Products';
import Orders from './container/Orders';
import Categorys from './container/Categorys';
import Page from './container/Page';

function App() {
  return (
    <>
    <MyNavbar />
     <main>
            <Switch>
                <Route path="/" component={Home} exact />

                
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />


                <Route path="/page" component={Page} />
                <Route path="/products" component={Products} />
                <Route path="/orders" component={Orders} />
                <Route path="/categorys" component={Categorys} />
                {/* <Route path="/signup" component={Signup} />
                <Route path="/signup" component={Signup} /> */}
            </Switch>
        </main>
     
    </>
  );
}

export default App;
