<template>
  <div>
    <navbar-component></navbar-component>
    <div class="loginView">
      <form-login/>
    </div>
  </div>
  
</template>

<script>
import FormLogin from '../components/FormLogin.vue'
import NavbarComponent from '../components/NavbarComponent.vue';

export default{
  name: 'LoginView',

  components: {
    FormLogin,
    NavbarComponent
  }
}
</script>

<style>
  .loginView{
    display: flex;
    justify-content: center;
  }
</style>

