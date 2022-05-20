<template>
    <div>
        <navbar-component />
        <div class="container-products-favorites py-12">
            <div class="px-4 py-3 divTitle">
                <div class="divTitle-title">
                    <font-awesome-icon icon="fa-solid fa-heart" />
                    Favoritos
                </div>
                
            </div>
            <div v-for="(product) in products" :key="product.id">
                <card-component :name="product.name" :image="product.image" :description="product.description" :id="product.id" />
            </div>
            
        </div>
        
    </div>
</template>

<script>

import NavbarComponent from '../../components/NavbarComponent.vue';
import CardComponent from '../../components/Logged/Favorites/CardComponent.vue';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export default{
    data() {
        return{
            token: localStorage.getItem('token'),
            products: []
        }
    },
    components: {
        NavbarComponent,
        CardComponent
    },
    methods: {
        async loadFavorites(){
            const decoded = jwt_decode(this.token);
            const userId = decoded.id;

            const req = {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }

            const favoriteProducts = await axios.get(`http://localhost:3000/users/${userId}/products/favorites`, req);

            this.products = favoriteProducts.data;
        }
    },
    async created(){
        await this.loadFavorites();
        console.log(this.products);
    }
}

</script>
<style scoped>
.container-products-favorites{
    padding: 20px 10%;
}
.divTitle{
    display: flex
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