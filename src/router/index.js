import axios from 'axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ProductView from '../views/ProductView';
import RegisterView from '../views/RegisterView';
import UserProducts from '../views/UserProducts';

Vue.use(VueRouter)



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
    beforeEnter: async (to, from, next) => {
      if(localStorage.getItem('token') != undefined){

        var req = {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        
        try{
          await axios.post('http://localhost:3000/users/session-validate', {}, req);
        }catch(err){
          next('/login');
        }
        
        next();
      }
      else{
        next('/login')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
