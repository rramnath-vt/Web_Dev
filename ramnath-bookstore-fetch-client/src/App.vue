<script setup lang="ts">
import { provide } from "vue";
import { RouterView, useRoute } from "vue-router";
import type { CategoryItem } from "@/types";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import sourceData from "@/db.json";
const route = useRoute();
const categoryList = sourceData.categories as CategoryItem[];
provide("categoryList", categoryList);
</script>

<style>

.backimage{

  background-image: url('https://mcdn.wallpapersafari.com/medium/0/80/KIiEkW.jpg');
  background-repeat: no-repeat;
  background-size: cover;

}

</style>


<template>
  <suspense>
  <div id="app">
    <the-header></the-header>
    <div class="backimage"><router-view :key="route.fullPath"></router-view></div>

    <the-footer></the-footer>
  </div>
</suspense>
</template>
