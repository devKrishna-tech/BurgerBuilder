import Layout from './components/Layout/Layout'
import { Route, Switch } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'

const App = () => {
  return (
    <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
    </div>
  );
}

export default App;
