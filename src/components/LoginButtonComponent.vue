<template>
    <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    color="#40407a"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    Entre ou cadastre-se
                </v-btn>
            
            </template>
            <v-list>
                <router-link to="/login" class="nav-link">
                    <v-list-item>
                    <v-list-item-title class="navbar-link-option">Entrar</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/register" class="nav-link">
                    <v-list-item>
                    <v-list-item-title class="navbar-link-option">Cadastrar</v-list-item-title>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-menu>
</template>

<script>

export default {
    name: 'LoginButtonComponent',

}
</script>

<style scoped>
    
</style>
