<template>
  <div>
    <div class="col-sm right">
      <h1>Zapsat Docházku</h1>
      <form>
      <select class="custom-select" id="inputGroupSelect01" v-model="projectId">
        <option v-for="project in projectData" :key="project.id" :value="project.id">
          {{ project.project_name }}
        </option>
      </select>
      <div class="form-group">
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="1"
          placeholder="Počet Minut"
          style="resize:none"
          v-model="minute_count"
        ></textarea>
        <div class="datepicker">
          <date-picker v-model="date" valueType="date" type="date" format="DD-MMMM-YYYY" placeholder="Datum"></date-picker>
        </div>
        </div>
        <button type="button"  class="btn btn-primary" @click="send">
          ULOŽIT
        </button>
      </form>
      </div>
    </div>
</template>

<script>
import send from "../utils/axios";
import {getData} from "../api/project";
import {createRecord} from "../api/record";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components:{DatePicker},
  data() {
    return {
      projectName: '',
      minute_count: "",
      projectData:[],
      date: null,
      projectId: 0,
    };
  },
  async created() {
    this.projectData = await send(getData);
    this.projectId = this.projectData[0].id;
  },
  methods: {
    send: function(){
      var data = {
        date: this.date,
        minute_count: parseInt(this.minute_count),
        id_project: this.projectId
      };
        send(createRecord, data);
        this.projectName = "";
        this.minute_count = "";
        this.date = null;
        alert("Docházka byla uložena!");
    },
  }
};
</script>

<style scoped lang="scss">
.right {
  
  h1 {
    color: #4274b1;
    margin-top: 50px;
  }
  .custom-select, textarea, .datepicker {
    margin-top: 50px;
    width: 350px;
    text-align: center;
  }
  .form-group {
    margin: 50px 50px;
    .form-control{
      text-align: center;
    }
  }
  .date {
    margin-top: 50px;
    text-align: center;
  }
  .btn {
    margin-top: 50px;
    width: 300px;
    border-radius: 20px;
    font-size: 25px;
    height: 70px;
    transition: 0.3s ease-in;
  }
}
</style>