<template>
    <div class="registerView">
        <navbar-component/>
        <div class="register">
            <div> Crie sua conta</div>
        
            <v-form @submit.prevent="submit()">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.firstName"
                                :error-messages="error.firstName"
                                label="Primeiro Nome"
                                name="firstName"
                                outlined
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.secondName"
                                :error-messages="error.secondName"
                                label="Último Nome"
                                name="secondName"
                                outlined
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field
                        v-model="form.cpf"
                        :error-messages="error.cpf"
                        label="CPF"
                        name="cpf"
                        outlined
                        required
                    ></v-text-field>
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-text-field
                                v-model="form.postalCode"
                                :error-messages="error.postalCode"
                                label="CEP"
                                name="postalCode"
                                outlined
                                max="8"
                                @keyup="consultCEP()"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field
                                v-model="form.city"
                                :error-messages="error.city"
                                label="Cidade"
                                name="city"
                                outlined
                                disabled
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field
                                v-model="form.state"
                                :error-messages="error.state"
                                label="Estado"
                                name="state"
                                outlined
                                disabled
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field
                        v-model="form.street"
                        :error-messages="error.street"
                        label="Logradouro"
                        name="street"
                        outlined
                        required
                    ></v-text-field>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.district"
                                :error-messages="error.district"
                                label="Bairro"
                                name="district"
                                outlined
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.number"
                                :error-messages="error.number"
                                label="Número"
                                name="number"
                                outlined
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field
                        v-model="form.phone"
                        :error-messages="error.phone"
                        label="Celular/Telefone"
                        name="phone"
                        outlined
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        v-model="form.email"
                        :error-messages="error.email"
                        label="Email"
                        name="email"
                        outlined
                        :rules="[rules.required]"
                        required
                    ></v-text-field>

                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.password"
                                :error-messages="error.password"
                                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="showPass ? 'text' : 'password'"
                                name="password"
                                label="Senha"
                                outlined
                                counter
                                @click:append="showPass = !showPass"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.confirmPassword"
                                :error-messages="error.confirmPassword"
                                :append-icon="showConfirmPass ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min, rules.pass]"
                                :type="showConfirmPass ? 'text' : 'password'"
                                name="confirmPassword"
                                label="Confirmar Senha"
                                outlined
                                counter
                                @click:append="showConfirmPass = !showConfirmPass"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    
                    <v-btn type="submit" color="primary" class="py-6" :disabled="isSendingData">
                        <v-progress-circular
                        indeterminate
                        color="gray"
                        class="mr-3"
                        v-if="isSendingData"
                        ></v-progress-circular>
                        Cadastrar
                        </v-btn>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script>

import NavbarComponent from '../components/NavbarComponent.vue'
import axios from 'axios'

export default {
    data(){
        return{
            form:{
                firstName: '',
                secondName: '',
                cpf: '',
                state: '',
                city: '',
                postalCode: '',
                street: '',
                number: '',
                district: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: '',
                birthDate: '2000-04-10 10:00:00'
            },
            error: {
                firstName: '',
                secondName: '',
                cpf: '',
                state: '',
                city: '',
                postalCode: '',
                street: '',
                number: '',
                district: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            isSendingData: false,
            showConfirmPass: false,
            showPass: false,
            validateData: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                pass: value => this.form.password == value || 'Password doesnt match',
            },
        }
    },
    components:{
        NavbarComponent
    },
    methods: {
        async submit(){
            this.validateData = true;
            this.cleanErrors();
            if(this.form.firstName.length < 2){
                this.validateData = false;
                this.error.firstName = 'O nome deve conter no mínimo 2 caracteres';
            }
            if(this.form.secondName.length < 2){
                this.validateData = false
                this.error.secondName = 'O sobrenome deve conter no mínimo 2 caracteres';
            }
            if(this.form.cpf.length < 11){
                this.validateData = false
                this.error.cpf = 'O CPF deve conter 11 números';
            }
            if(this.form.postalCode.length != 8){
                this.validateData = false;
                this.error.postalCode = 'CEP inválido';
            }
            if(this.form.state.length != 2){
                this.validateData = false;
                this.error.state = 'CEP inválido';
            }
            if(this.form.city.length < 1){
                this.validateData = false;
                this.error.city = 'CEP inválido';
            }
            if(this.form.street.length < 5){
                this.validateData = false;
                this.error.street = 'Mínimo 5 caracteres';
            }
            if(this.form.number == ""){
                this.validateData = false;
                this.error.number = 'Campo obrigatório';
            }
            if(this.form.district == ""){
                this.validateData = false;
                this.error.district = 'Campo obrigatório';
            }
            if(this.form.phone.length < 10){
                this.validateData = false
                this.error.phone = 'Número incompleto';
            }
            if(this.form.email == ""){
                this.validateData = false
                this.error.email = 'Campo obrigatório';
            }
            else if(!this.validateEmail(this.form.email)){
                this.validateData = false
                this.error.email = 'Campo deve ser um email válido';
            }
            if(this.form.password < 8){
                this.validateData = false
                this.error.password = 'Mínimo 8 caracteres';
            }
            if(this.form.password != this.form.confirmPassword){
                this.validateData = false
                this.error.confirmPassword = 'Senhas devem ser iguais';
            }


            if(this.validateData){
                try{
                    this.isSendingData = true;
                    const data = JSON.stringify(this.form);
                    const dataJson = JSON.parse(data);

                    console.log(dataJson);

                    await axios.post('http://localhost:3000/users',dataJson);

                    this.isSendingData = false;

                    this.$router.push({name: 'login'});
                }catch(err){
                    console.log(err);
                    // this.$router.go();
                }
            }
            else{
                console.log('nok')
            }
        },
        async consultCEP(){
            if((this.form.postalCode).length == 8){
                const result = await axios.get(`https://viacep.com.br/ws/${this.form.postalCode}/json/`);

                this.form.city = result.data.localidade
                this.form.state = result.data.uf
            }
            else{
                this.form.city = ''
                this.form.state = ''
                this.error.postalCode = 'CEP inválido';

            }
        },
        cleanErrors(){
            this.error.firstName = '',
            this.error.secondName = '',
            this.error.cpf = '',
            this.error.state = '',
            this.error.city = '',
            this.error.postalCode = '',
            this.error.street = '',
            this.error.number = '',
            this.error.district = '',
            this.error.phone = '',
            this.error.email = '',
            this.error.password = '',
            this.error.confirmPassword = ''
        },
        validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
    }
}

</script>

<style scoped>
.registerView{
    display: flex;
    justify-content: center;
  }
  .register{
        background-color: #f5f6fa;
        margin: 40px 0;
        min-width: 40%;
        border-radius: 6px;
        padding: 18px;
    }
</style>
