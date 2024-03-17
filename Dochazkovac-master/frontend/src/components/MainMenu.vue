<template>
  <div>
        <div class="col-sm left">
          <div class="d-flex flex-column buttons">
            <router-link class="logout" to="/">
              Odhlásit se
            </router-link>
            <button type="button" class="btn btn-primary btn-projekt" @click="openNovyProjekt">
              Nový projekt
            </button>
            <button type="button" class="btn btn-primary btn-mzda" @click="openMzda">Mzda</button>
          </div>
          <hr />
          <input
            class="form-control"
            type="text"
            :placeholder= "moneyCount + ' Kč'"
            readonly
          />
        </div>
        <novy-projekt />
        <mzda />
  </div>
</template>

<script>
import send from "../utils/axios";
import NovyProjekt from './NovyProjekt.vue'
import Mzda from './Mzda.vue'
import eventBus from '../utils/eventBus.js'
import {getData} from "../api/project";
import {getRecord} from "../api/record";
import {getMoneyCount} from "../api/statistics";
export default {
  components:{
     NovyProjekt,
     Mzda
  },
  data() {
    return {
      moneyCount: 0,
      recordData: [],
      projectData: [],
      minuteCount: 0,
      hourPay: 0,
      projectId:0,
      recordId:0
    }
  },
  async created(){
    this.moneyCount = await send(getMoneyCount);

  },

  methods: {
    count: function(){
      var data = {
        minute_count: this.minuteCount,
        hour_pay: this.hourPay,
      };
      send(getData, data);
      send(getRecord, data);
    },
    openNovyProjekt(){
      eventBus.$emit('openNovyProjekt')
    },
    openMzda(){
      eventBus.$emit('openMzda')
    }
  },
}
</script>

<style scoped lang="scss">
.left {
  background-color: #4274b1;
  border-radius: 50px;
  width: 300px;
  .buttons {
    .logout{
      color: #fff;
      position: absolute;
      top: 40px;
      left: 10px;
      font-size: 15px;
    }
    position: relative;
    .btn-projekt {
      margin-top: 200px;
    }
    .btn-mzda {
      margin-top: 50px;
    }
    .btn {
      border-radius: 20px;
      font-size: 25px;
      height: 70px;
      transition: 0.3s ease-in;
    }
  }
  hr {
    margin-top: 100px;
    background-color: #fff;
    height: 5px;
  }
  .form-control {
    margin-bottom: 15px;
    height: 50px;
    border-radius: 25px;
  }
  input{
    text-align: center;
    font-size: 30px;
  }
}

</style>
