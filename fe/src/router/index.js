import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/HomePage.vue';
import UserLogin from '../views/UserLogin.vue';
import PageDashboard from '../views/PageDashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',  // Set the router mode to 'history'
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: PageDashboard,
    },
  ],
});
