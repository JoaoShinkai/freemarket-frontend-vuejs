import axios from 'axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserFavorites from '../views/Logged/UserFavorites';
import UserInfo from '../views/Logged/UserInfo';
import LoginView from '../views/LoginView.vue';
import ProductView from '../views/ProductView';
import RegisterView from '../views/RegisterView';
import UserProducts from '../views/UserProducts';

Vue.use(VueRouter)

async function validateSession(){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    
    try{
      await axios.post('http://localhost:3000/users/session-validate', {}, req);
    }catch(err){
      return false;
    }
    return true;
  }
  else{
    return false;
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView
  },
  {
    path: '/dashboard/products',
    name: 'dashboard_products',
    component: UserProducts,
    beforeEnter: async(to, from, next) => {
      await validateSession() ? next() : next('/login')
    }
  },
  {
    path: '/dashboard/info',
    name: 'dashboard_info',
    component: UserInfo,
    beforeEnter: async(to, from, next) => {
      await validateSession() ? next() : next('/login')
    }
  },
  {
    path: '/dashboard/favorites',
    name: 'dashboard_favorites',
    component: UserFavorites,
    beforeEnter: async(to, from, next) => {
      await validateSession() ? next() : next('/login')

    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
