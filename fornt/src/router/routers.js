import address from './address';
import classify from './classify';
import home from './home';
import mine from './mine';
import news from './news';
import notfound from './404';
import order from './order';
import service from './service';
import shop from './shop';
import cart from './cart';
import personinfo from './personinfo';
import login from './login';
export default [
  {
    path: '*',
    redirect: '404/entry'
  },
  {
    path: '/',
    redirect: 'login'
  }
].concat(home, classify, news, mine, service, notfound, order, address,shop,cart,personinfo,login);
