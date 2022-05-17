<template>
    <div>
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="#f1c40f" v-bind="attrs" v-on="on" class="px-2" style="width: 100%">
                    <v-icon dark>
                        mdi-pencil
                    </v-icon>
                    Editar
                </v-btn>
            </template>
            <v-card>
                <v-form @submit.prevent="updateProduct()">
                    <v-card-title>
                    <span class="text-h5">Atualizar dados do Produto</span>
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
                            Atualizar
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data(){
        return{
            form: {
                id: this.id,
                image: this.image,
                name: this.name,
                description: this.description,
                price: parseFloat(this.price)
            },
            dialog: false,
            token: localStorage.getItem('token')
        }
    },
    props: {
        id: Number,
        name: String,
        image: String,
        description: String,
        price: String
    },
    methods: {
        async updateProduct(){
            var data = JSON.stringify(this.form);
            var dataJson = JSON.parse(data);

            var {id, ...newData} = dataJson;

            const req = {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }

            await axios.put(`http://localhost:3000/products/${id}`,newData, req);
            
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
