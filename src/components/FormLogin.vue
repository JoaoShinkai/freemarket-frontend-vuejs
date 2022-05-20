<template>
    <div class="login">
        <div> Acesse sua conta</div>
        
        <v-form @submit.prevent="submit()">
            <v-container>
                <v-text-field
                    v-model="form.email"
                    label="Email"
                    name="email"
                    outlined
                    :rules="[rules.required]"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="form.password"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="showPass ? 'text' : 'password'"
                    name="password"
                    label="Password"
                    outlined
                    counter
                    @click:append="showPass = !showPass"
                ></v-text-field>
                 <v-btn type="submit" color="primary">Login</v-btn>
            </v-container>
        </v-form>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name : 'FormLogin',
    data () {
      return {
        form: {
            email: '',
            password: ''
        },
        showPass: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },
    methods: {
        async submit(){
            
            var data = JSON.stringify(this.form);
            var dataJson = JSON.parse(data);
            
            const res = await axios.post('http://localhost:3000/users/auth', dataJson);

            if(res.data.token){
                localStorage.setItem('token', res.data.token);
                this.$router.push({name: 'home'});
            }
        }
    }
}
</script>

<style>
    .login{
        background-color: #f5f6fa;
        margin: 40px 0;
        min-width: 40%;
        border-radius: 6px;
        padding: 18px;
    }
</style>
