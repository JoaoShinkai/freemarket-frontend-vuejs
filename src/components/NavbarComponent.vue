<template>
    <div>
        <v-app-bar
        app
        color="#2c2c54"
        dark
        style="z-index: 100"
        >
            <div class="d-flex align-center">
                <v-app-bar-nav-icon v-if="isTokenValid" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <router-link to="/" class="nav-link">
                <div class="navbar-logo">
                    <img src="../assets/Logo.png" alt="">
                </div>
                Free Market
                </router-link>
            </div>
            

            <v-spacer></v-spacer>

            <login-button-component v-if="!isTokenValid"></login-button-component>
            <logged-button-component v-else @logout="logout()"></logged-button-component>
        </v-app-bar>

        <!-- ------------------------------------- MENU RETRÁTIL -------------------------------------------------------- --> 

        <v-navigation-drawer
        v-model="drawer"
        fixed
        bottom
        temporary
        v-if="isTokenValid"
        style="height: calc(100vh - 64px); top: auto;"
        >
        <v-list nav dense >
            <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
            >
                <router-link to="/">
                    <v-list-item class="px-5 py-4">
                        <font-awesome-icon class="mr-3" icon="fa-solid fa-house" />
                        <v-list-item-title>Inicio</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/dashboard/products">
                    <v-list-item class="px-5 py-4">
                        <font-awesome-icon class="mr-3" icon="fa-solid fa-bag-shopping" />
                        <v-list-item-title>Meus Produtos</v-list-item-title>
                    </v-list-item>
                </router-link>
                
                <router-link to="/dashboard/favorites">
                    <v-list-item class="px-5 py-4">
                        <font-awesome-icon class="mr-3" icon="fa-solid fa-heart" />
                        <v-list-item-title>Favoritos</v-list-item-title>
                    </v-list-item>
                </router-link>

                <v-list-item class="px-5 py-4">
                    <font-awesome-icon class="mr-3" icon="fa-solid fa-gear" />
                    <v-list-item-title>Configurações</v-list-item-title>
                </v-list-item>

                <router-link to="/dashboard/info">
                    <v-list-item class="px-5 py-4">
                        <font-awesome-icon class="mr-3" icon="fa-solid fa-circle-info" />
                        <v-list-item-title>Meus Dados</v-list-item-title>
                    </v-list-item>
                </router-link>
            </v-list-item-group>
        </v-list>
        </v-navigation-drawer>
    </div>
    
</template>

<script>

import axios from 'axios';
import LoginButtonComponent from './LoginButtonComponent.vue'
import LoggedButtonComponent from './LoggedButtonComponent.vue';

export default {
    name: 'NavbarComponent',

    data() {
        return{
            token: localStorage.getItem('token'),
            isTokenValid: false,
            drawer: false,
            group: null,
        }
    },
    methods: {
        async verifyToken(){
            if(this.token){
                    var req = {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }
                const result = await axios.post('http://localhost:3000/users/session-validate',{}, req);

                if(result.data.email){
                    this.isTokenValid = true;
                }
                else{
                    this.isTokenValid = false;
                }
            }
            else{
                this.isTokenValid = false;
            }
        },

        logout(){
            localStorage.removeItem('token');
            this.token = null;
            this.isTokenValid = false;
            this.$router.push({name: 'login'});
        }
    },
    created() {
        this.verifyToken();
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
    components: {
        LoginButtonComponent,
        LoggedButtonComponent
    }

}
</script>

<style scoped>
    .nav-link{
        color: white;
        display: flex;
        align-items: center;

    }
    .navbar-logo{
        width: 40px;
        height: 40px;
    }
    .navbar-logo img{
        width: 100%;
        height: 100%;
    }
    .v-navigation-drawer{
        top: 64px;
    }
</style>
