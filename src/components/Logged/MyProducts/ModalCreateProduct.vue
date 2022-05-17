<template>
    <div>
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-2" fab dark color="#40407a" v-bind="attrs" v-on="on">
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-form @submit.prevent="createProduct()">
                    <v-card-title>
                    <span class="text-h5">Informações do Produto</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                                <v-row>
                                    <v-col cols="12" style="display: flex; justify-content: center">
                                        <div class="modal-product-image">
                                            <img :src="form.image" alt="">
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="URL da imagem" required v-model="form.image"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Nome do item" required v-model="form.name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Descrição" required v-model="form.description"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Preço" type="number" required v-model="form.price"></v-text-field>
                                    </v-col>
                                </v-row>
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
                            Criar
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios';

export default{
    data(){
        return {
            form: {
                image: '',
                name: '',
                description: '',
                price: ''
            },
            dialog: false,
            token: localStorage.getItem('token')
        }
    },
    methods: {
        async createProduct(){
            const data = JSON.stringify(this.form);
            const dataJson = JSON.parse(data);
            
            var req = {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }

            const user = await axios.post('http://localhost:3000/users/session-validate', {}, req)

            dataJson.userId = user.data.id;

            await axios.post('http://localhost:3000/products', dataJson, req);

            this.$router.go();
        }
    }
    
}
</script>

<style scoped>
.modal-product-image{
    width: 120px;
    height: 120px;
    position: relative;
}
.modal-product-image img{
    width: 100%;
    height: 100%;
}
</style>
