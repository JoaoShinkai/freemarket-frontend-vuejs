<template>
    <div>
        <navbar-component></navbar-component>
        
        <div class="container-products py-12">
            <div class="px-4 py-3 divTitle">
                <div style="display: flex; align-items: center">
                    <div class="divTitle-title">
                        <font-awesome-icon icon="fa-solid fa-bag-shopping" />
                        Meus itens
                    </div>
                </div>
                <div class="divAddProduct">
                    <modal-create-product/>
                </div>
            </div>
            <div class="container-products-group">
                <div v-for="(product) in products" :key="product.id">
                    <card-component :id="product.id" :name="product.name" :image="product.image" :description="product.description" :price="product.price" class="card-product"/>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

import NavbarComponent from '../components/NavbarComponent.vue'
import CardComponent from '../components/Logged/MyProducts/CardComponent.vue'
import ModalCreateProduct from '../components/Logged/MyProducts/ModalCreateProduct.vue'
import axios from 'axios';


export default {
    data() {
        return{
            products: [],
            token: localStorage.getItem('token')
        }
    },
    components: {
        NavbarComponent,
        CardComponent,
        ModalCreateProduct
    },
    created: async function(){
        const req = {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }
        const res = await axios.get('http://localhost:3000/products/my-products', req);
        this.products = res.data;
    }
}
</script>

<style scoped>
.divAddProduct{
    padding: 10px 0;
    display: flex;
    justify-content: end;
  }
  .container-products{
    padding: 20px 10%;
  }
  .container-products-group{
    display: flex;
    grid-gap: 20px;
    flex-wrap: wrap;
    padding: 12px;
  }
  .divTitle{
    display: flex;
    justify-content: space-between;
}
.divTitle-title{
    background-color: #2c2c54;
    color: white;
    font-size: 22px; 
    padding: 6px 18px;
    border-radius: 32px;
    user-select: none;
}
</style>
