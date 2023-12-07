<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { useCategoryStore } from "./stores/category";
const route = useRoute();
const categoryStore= useCategoryStore();
categoryStore.fetchCategories();
</script>

<style>

.backimage{

  background-image: url('https://mcdn.wallpapersafari.com/medium/0/80/KIiEkW.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  margin: 0;
  padding: 0;

}
.cart-view {
  margin-top: 20px;
}

</style>


<template>

  <div id="app">
    <the-header></the-header>
    <div class="backimage"><router-view :key="route.fullPath"></router-view></div>

    <the-footer></the-footer>
  </div>

</template>
