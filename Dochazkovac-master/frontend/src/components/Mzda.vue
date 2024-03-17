<template>
<transition name="fade">
<div v-if="isOpen">
    <div class="content">
      <div class="header">
        <button @click="closeDialog">Zavřít</button>
        <h1>Mzda</h1>
      </div>
      <div class="inputs">
        <select class="custom-select" id="inputGroupSelect01" v-model="projectId">
          <option v-for="project in projectData" :key="project.id" :value="project.id">
            {{ project.project_name }}
          </option>
        </select>
        <div class="datepicker">
          <date-picker v-model="date" valueType="date" type="month" format="MMMM-YYYY" placeholder="Datum"></date-picker>
        </div>
        <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="1"
            :placeholder="'Mzda činí ' + monthPay + ',-'"
            v-if="monthPay"
            style="resize:none"
        ></textarea>
      </div>
      <button @click="getMonthPay">Načíst</button>
    </div>
  </div>
</transition>
  
</template>

<script>
import eventBus from "../utils/eventBus.js";
import {getData} from "../api/project";
import send from "../utils/axios";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import {getMonthPay} from "../api/statistics";
export default {
  components:{DatePicker},
  data() {
    return {
      isOpen: false,
      projectId: 0,
      projectData: [],
      date:null,
      strDate:"",
      monthPay: null
    };
  },
  async created() {
    this.projectData = await send(getData)
    console.log(this.projectData);
    this.projectId = this.projectData[0].id;
  },
  methods:{
    async getMonthPay(){
      this.monthPay = await send(getMonthPay,{date: this.date, project: this.projectId });
      console.log(this.monthPay);
    },
    closeDialog() {
      this.isOpen = false;
      console.log(this.isOpen)
    }
  },
  mounted() {
    eventBus.$on("openMzda", () => {
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.content {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1000;
  background-color: rgba(51, 89, 136, 0.90);
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
      &:hover{
        background-color: rgba(207, 19, 19, 0.863);
      }
    }
    h1 {
      margin-top: 10px;
      color: white;
    }
  }
  select {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
    inputs{
        margin: 20px 0px;
        width: 200px;
        height: 50px;
        border-radius: 5px;
        background-color: white;
        border: none;
        text-align: center;
        color:rgb(77,109,150) ;
    }
  }
  textarea{
    margin: 20px 0px;
    text-align: center;
  }
  button{
  margin: 10px 0px;
        width: 150px;
        height: 40px;
      border-radius: 10px;
      background-color: rgb(0,123,255);;
      border: none;
      transition: 0.4s ease;
      color: white;
      &:hover{
        color: white;
        background-color: rgb(1, 93, 192);
      }
}
}
</style>


