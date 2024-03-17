<template>
    <div class="container d-flex justify-content-center ">
      <div class="d-flex align-items-center" >
        <main-menu />
        <zapsat-dochazku />
      </div>
    </div>
</template>

<script>
import MainMenu from '../components/MainMenu.vue'
import ZapsatDochazku from '../components/ZapsatDochazku.vue'
export default {
name: 'App',
    components: {
    MainMenu,
    ZapsatDochazku,
},
}
</script>
<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
</style>