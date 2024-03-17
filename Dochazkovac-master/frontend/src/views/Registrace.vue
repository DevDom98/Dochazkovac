<template>
    <div class="container bg-container rounded">
        <router-link to="/" class="prihlaseni">Zpět</router-link>
        <div class="wrapper">
            <h1 class="heading  col-12 text-white">Zaregistrujte se</h1>
            <form class="inputs">
                <div class="flexbox_name">
                    <input type="text" v-model="name" name="name" id="name" placeholder="Jméno" class="text-center input">
                    <input type="text" v-model="surname" name="surname" id="surname" placeholder="Příjmení" class="text-center input">
                </div>
            <input type="email" v-model="email" name="email" id="email" placeholder="E-mail" class="text-center input">
            <input type="password" v-model="password" name="password" id="password" placeholder="Heslo" class="text-center input">
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Potvrdit heslo" class="text-center input">
            <button class="register" type="submit">Registrovat</button>
            </form>
        </div>
    </div>
</template>

<script>
import send from "../utils/axios";
import {createUser} from "../api/user";
export default {
    name: 'Prihlaseni',
    data() {
        return {
            name: '',
            surname: '',
            email: '',
            password: '',
        }
    },
    methods: {
        register: function(){
            var data = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password
            };
            send(createUser, data)
        }
    },
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
.prihlaseni{
    color: #fff;
    position: absolute;
    top: 0;
    left: 10px;
}
.bg-container{
    position: relative;
    background-color: #4274b1;
    font-size: 25px;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.heading{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.input{
    margin: 10px;
}
.login{
    background-color: #fff;
    color: #4274b1;
    border: none;
    border-radius: 25px;
    padding: 5px 20px;
    margin-top: 20px;
}
</style>