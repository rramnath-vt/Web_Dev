<script setup lang="ts">
import type { CategoryItem } from "@/types";
let response = await fetch("http://localhost:8080/RamnathBookstoreFetch/api/categories/");
let data = await response.json();
let categoryList = data as CategoryItem[];
</script>

<style scoped>

.header-dropdown {
  position: relative;
}

@media (max-width: 600px) {

  .categories-button {display:flex; align-items:center;padding: 15px;line-height: 20px;position:relative;bottom: 45px;}

}

.categories-button {
  background-color: #FFCF52;
  line-height: 2em;
  color: black;
  height: 30px;
  margin-right: 90px;
  border-radius: 5%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  padding-left: 10px;
  padding-right: 10px;
}

.categories-button:hover{
  background-color: #cc5500;
  color: white;
}

.header-dropdown ul {
  background-color: white;
  color: black;
  display: none;
}

.header-dropdown li {
  padding: 0.25em 0.5em;
}

.header-dropdown a {
  color: black;
  text-decoration: none;
}

.header-dropdown li:hover {
  /* background: lightgray; */
  background: #F1A104;
}

.header-dropdown:hover ul {
  display: block;
  position: absolute;
  min-width: 8em;
  z-index: 1;
  cursor: pointer;
}

button {
  background: none;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0; /* Optionally, remove padding */
  margin: 0; /* Optionally, remove margin */
}
</style>

<template>
  <div class="header-dropdown">
    <button class="button categories-button">Categories<i class="fa-solid fa-caret-down"></i></button>
    <ul>
      <li v-for="category in categoryList" :key="category.categoryId">
        <router-link :to="'/category/' + category.name">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
