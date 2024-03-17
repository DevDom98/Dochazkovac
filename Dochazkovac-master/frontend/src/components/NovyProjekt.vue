
<template>
  <transition name="fade">
    <div v-if="isOpen">
      <div class="content">
        <div class="header">
          <button @click="closeDialog">Zavřít</button>
          <h1>Uložit nový projekt</h1>
        </div>
        <div class="inputs">
          <input
            type="text"
            placeholder="Název Projektu"
            v-model="projectName"
          />
          <input type="text" placeholder="Název Firmy" v-model="companyName" />
          <input
            type="text"
            placeholder="Hodinová mzda"
            v-model="hourPay"
          />
        </div>
        <button @click="send">Uložit</button>
      </div>
    </div>
  </transition>
</template>

<script>
import eventBus from "../utils/eventBus.js";
import send from "../utils/axios.js";
import {createProject, getData} from "../api/project.js";
export default {

  data() {
    return {
      isOpen: false,
      companyName: "",
      hourPay: '',
      projectName: "",
    };
  },
  methods: {
    send: function () {
      var data = {
        project_name: this.projectName,
        company_name: this.companyName,
        hour_pay: Number(this.hourPay),
      };
      send(createProject, data);
      console.log(this.data);
      alert('Data byla uložena!');
        this.isOpen = false;
        console.log(this.isOpen);
        this.projectName = '';
        this.hourPay = 0;
        this.companyName = ''
    },
    getProject(){
     send(getData)
    },
    closeDialog(){
      this.isOpen = false;
    },
    save() {
      console.log(this.companyName);
      console.log(this.hourPay);
      console.log(this.projectName);
    },
  },
  mounted() {
    eventBus.$on("openNovyProjekt", () => {
      this.isOpen = true;
      console.log(this.isOpen);
    });
  },
};
</script>
<style lang="scss">
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.content {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1000;
  background-color: rgba(51, 89, 136, 0.9);
  border-radius: 10%;
  padding: 20px;
  .header {
    button {
      margin-right: 250px;
      width: 80px;
      border-radius: 10px;
      background-color: white;
      color: black;
      border: none;
      transition: 0.4s ease;
      &:hover {
        background-color: rgba(207, 19, 19, 0.863);
      }
    }
    h1 {
      margin-top: 10px;
      color: white;
    }
  }
  .inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
    input {
      margin: 20px 0px;
      width: 200px;
      height: 50px;
      border-radius: 10px;
      background-color: white;
      border: none;
      text-align: center;
      color: rgb(77, 109, 150);
    }
  }
  button {
    margin: 10px 0px;
    width: 150px;
    height: 40px;
    border-radius: 10px;
    background-color: rgb(0, 123, 255);
    border: none;
    transition: 0.4s ease;
    color: white;
    &:hover {
      color: white;
      background-color: rgb(1, 93, 192);
    }
  }
}
</style>


