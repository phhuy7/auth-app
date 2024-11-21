import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/HomePage.vue';
import UserLogin from '../views/UserLogin.vue';
import PageDashboard from '../views/PageDashboard.vue';
import UserComponent from '../components/UserComponent.vue';
import PermissionComponent from '../components/PermissionComponent.vue';
import RoleComponent from '../components/RoleComponent.vue';
import UserRegister from '@/views/UserRegister.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
      path: '/register',
      name: 'register',
      component: UserRegister,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: PageDashboard,
      meta: { requireAuth: true },
      children: [
        {
          path: 'users',
          name: 'users',
          component: UserComponent,
        },
        {
          path: 'permissions',
          name: 'permissions',
          component: PermissionComponent,
        },
        {
          path: 'roles',
          name: 'roles',
          component: RoleComponent,
        }
      ]
    },
  ]
});
