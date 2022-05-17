<template>
    <div>
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="#d63031" v-bind="attrs" v-on="on" class="px-2"  style="width: 100%">
                    <v-icon dark>
                        mdi-delete
                    </v-icon>
                    Deletar
                </v-btn>
            </template>
            <v-card>
                <v-form @submit.prevent="deleteProduct()">
                    <v-card-title>
                    <span class="text-h5">
                        <v-icon style="color: #2b2b2b">
                            mdi-delete
                        </v-icon>
                        Excluir produto
                    </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            Deseja realmente apagar o produto <b>{{this.nameProduct }}</b>?
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                        >
                            Fechar
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            type="submit"
                        >
                            Confirmar
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data(){
        return{
            token: localStorage.getItem('token'),
            dialog: false,
        }
    },
    props: {
        idProduct: Number,
        nameProduct: String
    },
    methods: {
        async deleteProduct(){
            const req = {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }
            await axios.delete(`http://localhost:3000/products/${this.idProduct}`,req);

            this.$router.go();
        }
    }
}

</script>
