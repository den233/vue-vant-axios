import home from './home';
import mine from './mine';
import news from './news';
import notfound from './404';
import order from './order';
import shop from './shop';
import cart from './cart';
import personinfo from './personinfo';
import mingxi from './mingxi';
import login from './login';
import service from './service';
export default [
  {
    path: '*',
    redirect: '404/entry'
  },
  {
    path: '/',
    redirect: 'login/index'
  }
].concat(home, news, mine, notfound, order, shop, cart, personinfo, login, mingxi, service);
