<template>
    <div class="product-card">
        <v-card class="mx-auto product-card-v-card" width="250">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <div class="product-image">
          <img class="product-image-img" :src="image" alt="">
        </div>
        

        <v-card-title class="product-card-title">{{ name }}</v-card-title>

        <v-card-text>
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

          <div class="my-4 text-subtitle-1">
            R$ {{ price }}
          </div>
        </v-card-text>

        <v-card-actions style="display: flex; justify-content: center; grid-gap: 6px; px-2">
            <modal-update-product style="flex: 1" :id="this.id" :name="this.name" :image="this.image" :description="this.description" :price="this.price"></modal-update-product>
            <modal-delete-product style="flex: 1" :idProduct="this.id" :nameProduct="this.name" />
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>

import ModalDeleteProduct from './ModalDeleteProduct.vue'
import ModalUpdateProduct from './ModalUpdateProduct.vue'

export default {
    name: 'CardComponent',

    props: {
      id: Number,
      name: String,
      image: String,
      description: String,
      price: String
    },
    components: {
      ModalDeleteProduct,
      ModalUpdateProduct
    }
}
</script>

<style scoped>
    .product-card{
      flex: 1;
      flex-basis: auto;
      height: 100%;
    }
    .product-image{
      width: 100%;
      height: 200px;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    } 
    .product-image-img{
      max-width: 100%;
      max-height: 100%;
    }
    .product-card-title{
      flex: 1;
      flex-basis: auto;
    }
    .product-card-v-card{
      display: flex;
      flex-direction: column;
      height: 100%;
    }
</style>
