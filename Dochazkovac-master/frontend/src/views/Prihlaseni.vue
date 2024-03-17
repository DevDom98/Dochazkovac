<template>
    <div>
        <div class="container bg-container rounded">
            <div class="wrapper">
                <form>
                <h1 class="heading  col-12 text-white" >Docházkovač</h1>
                <div class="inputs ">
                <input type="email" v-model="email" name="email" id="email" placeholder="Email" class="input text-center">
                <input type="password" v-model="password" name="password" id="password" placeholder="Heslo" class="input text-center">
                </div>
                <button @click="login" type="submit" class="login">Přihlásit</button>
                </form>
                <p class="para">Nemáte účet?</p>
                <router-link to="/Registrace" class="register">Registrovat</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import send from "../utils/axios";
import {loginUser} from "../api/user";
export default {
    name: 'Prihlaseni',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login: function(){
            var data = {
                email: this.email,
                password: this.password
            };
            send(loginUser, data)
        }
    },
}
</script>

<style  lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
@import url('https://fonts.googleapis.com/css2?family=Teko:wght@300&display=swap');
.bg-container{
    background-color: #4274b1;
    font-size: 25px;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.heading{
    font-family: 'Teko', sans-serif;
    padding-top: 50px;
    font-size: 150px;
}
.inputs{
    margin: 25px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.input{
    border-radius: 25px;
    margin: 10px 0px;
    border: none;
    color: #4274b1 ;
}
.login{
    background-color: #fff;
    color: #4274b1;
    border: none;
    border-radius: 25px;
    padding: 5px 20px;
}
.para{
    margin-top: 50px;
    color: #fff;
}
.register{
    background-color: rgb(59, 224, 59);
    color: white;
    border: none;
    border-radius: 25px;
    padding: 5px 20px;
}
</style>