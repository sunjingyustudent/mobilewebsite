<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <router-view v-wechat-title="$route.meta.title" img-set="/static/favicon.ico"></router-view>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
@import "./assets/css/reset.css";
@import "./assets/css/common.css";
@import "./assets/css/resetMintUi.css";
#app {
  font-family: "Microsoft YaHei";
}
</style>
