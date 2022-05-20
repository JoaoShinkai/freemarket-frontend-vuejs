<template>
    <div>
        <v-col
          cols="12"
        >
          <v-card
            color="white"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  style="color: #2b2b2b"
                  v-text="this.name"
                ></v-card-title>

                <v-card-subtitle style="color: #2b2b2b" v-text="this.description"></v-card-subtitle>

                <v-card-actions>
                    <router-link :to="{name: 'product', params: {id: this.id}}">
                        <v-btn
                            class="ml-2 mt-5"
                            outlined
                            rounded
                            small
                            color="#2c2c54"
                        >
                            Ver mais
                        </v-btn>
                    </router-link>
                  
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
                style="position: relative"
              >
                <img style="max-width: 100%; max-height: 100%; height:auto; width: auto" :src="this.image" alt="">
              </v-avatar>
            </div>
          </v-card>
        </v-col>
    </div>
</template>

<script>

export default{
    data(){
        return{

        }
    },
    props: {
        id: String,
        name: String,
        image: String,
        description: String
    }
}

</script>
