<template>
    <div>
        <navbar-component></navbar-component>
        <div class="container">
            <div v-if="product.id" class="product">
                <div class="product-image">
                    <img :src="product.image" alt="">
                </div>
                <div class="product-container">
                    <div class="product-container-title">{{ this.product.name }}</div>
                    <div class="product-container-rating">
                        <v-row
                        align="center"
                        class="mx-0"
                        >
                            <v-rating
                            :value="4.5"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                            ></v-rating>

                            <div class="grey--text ms-4">
                            4.5 (413)
                            </div>
                        </v-row>
                    </div>
                    <div class="product-container-price">
                        R$ {{ this.product.price }}
                    </div>
                    <div class="product-container-description">
                        {{ this.product.description }}
                    </div>
                    <div class="product-container-info">
                        <div class="product-container-info-title">Informações do vendedor</div>
                        <div class="product-container-info-group">
                            <div>
                                <font-awesome-icon icon="fa-solid fa-user" />
                                {{ this.product.user.firstName }} {{ this.product.user.secondName }}
                            </div>
                            <div>
                                <font-awesome-icon icon="fa-solid fa-phone" />
                                {{ this.product.user.phone }}
                            </div>
                            <div>
                                <font-awesome-icon icon="fa-solid fa-location-dot" />
                                {{ this.product.user.street }}, {{ this.product.user.city }}, {{ this.product.user.state }}
                            </div>
                        </div>
                        
                    </div>
                    <div>
                        <v-btn color="#2c2c54" style="color: white; padding: 24px 0" block>
                            <font-awesome-icon class="mr-2" icon="fa-regular fa-heart" /> Adicionar aos favoritos
                        </v-btn>
                    </div>
                        
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

import NavbarComponent from '../components/NavbarComponent.vue'
import axios from 'axios'

export default{
    name: 'ProductView',

    data() {
        return{
            product: {}
        }
    },
    components: {
        NavbarComponent
    },
    methods: {
        async loadProduct(){
            try{
                const idProduct = this.$route.params.id;

                if(isNaN(idProduct)){
                    this.$router.push({name: 'home'});
                }

                const result = await axios.get(`http://localhost:3000/products/${idProduct}`);

                if(!result.data){
                    this.$router.push({name: 'home'});
                }
               this.product = result.data;
                
            }catch(err){
                console.log(err);
                this.$router.push({name: 'home'});
            }
        }
    },
    created: async function(){
        await this.loadProduct();
    }

}
</script>

<style scoped>
    .container{
        padding: 40px 7%;
    }
    .product{
        display: flex;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    }
    .product-image{
        width: 50%;
        position: relative;
        padding: 5%;
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .product-image img{
        max-height: 100%;
        max-width: 100%;
    }
    .product-container{
        width: 50%;
        /* border: solid 2px red; */
        padding: 20px;
        display: flex;
        flex-direction: column;
    }
    .product-container-title{
        font-size: 26px;
        font-weight: bold;
    }
    .product-container-rating{
        padding: 16px 0;
    }
    .product-container-price{
        font-size: 40px;
        font-weight: bold;
        color: #2c2c54;
        padding: 16px 0;
    }
    .product-container-description{
        padding: 16px 0;
    }
    .product-container-info{
        padding: 10px 10px;
        flex: 1;
        border: solid 1px lightgrey;
        border-radius: 6px;
        margin: 20px 0;
    }
    .product-container-info-title{
        padding: 10px;
        border-bottom: solid 1px lightgrey;
    }
    .product-container-info-group{
        display: flex;
        padding: 20px 20px;
        flex-wrap: wrap;
    }
    .product-container-info-group div{
        flex: 1;
        white-space: nowrap;
        padding: 4px 0;
    }
    
</style>
