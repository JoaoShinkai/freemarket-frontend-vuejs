<template>
    <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="logged-button">
                    <font-awesome-icon icon="fa-solid fa-circle-user" />
                    Minha conta
                    <font-awesome-icon icon="fa-solid fa-angle-down" />
                </v-btn>
            
            </template>
            <v-list>
                    <v-list-item style="cursor: pointer">
                        <v-list-item-title @click="emitEvent()" class="navbar-link-option">Sair</v-list-item-title>
                    </v-list-item>
            </v-list>
        </v-menu>
</template>

<script>

export default {
    name: 'LoggedButtonComponent',

    methods: {
        emitEvent: function(){
            console.log('emit event');
            this.$emit("logout");
        }
    }

}
</script>

<style scoped>
    .logged-button{
        background-color: transparent !important;
        box-shadow: none;
    }
    .logged-button svg{
        margin: 0 6px;
    }
</style>
