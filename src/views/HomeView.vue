<template>
  <div>
    <navbar-component></navbar-component>
    <div class="container-products py-12">
      <span class="container-products-group">
        <div v-for="(product) in products" :key="product.id">
          <card-component :id="product.id" :name="product.name" :image="product.image" :description="product.description" :price="product.price" class="card-product"/>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
  import CardComponent from '../components/CardComponent.vue';
  import NavbarComponent from '../components/NavbarComponent.vue';
  import verifyToken from '../auth/verifyToken';
  import axios from 'axios';

  export default {
    name: 'HomeView',

    components: {
      CardComponent,
      NavbarComponent
    },

    data(){
      return{
        products: [],
        token: localStorage.getItem('token'),
        isTokenValid: false
      }
    },

    methods: {
      async verifyToken(){
            const result = await verifyToken();

            if(result){
              this.isTokenValid = true;
            }
            else{
              this.isTokenValid = false;
            }
        } 
    },

    created(){
      axios.get('http://localhost:3000/products').then(res => {
        this.products = res.data;
      })

      this.verifyToken();
    } 
  }
</script>

<style>
  .container-products{
    padding: 20px 10%;
    display: flex;
  }
  .container-products-group{
    display: flex;
    grid-gap: 20px;
    flex-wrap: wrap;
  }
  
</style>
