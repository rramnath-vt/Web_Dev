<script setup lang="ts">
import { inject } from "vue";
import type { CategoryItem } from "@/types";
const categoryList = inject("categoryList") as CategoryItem[];
</script>

<style scoped>
.category-buttons {
  display: flex;
  flex-direction: row;
  text-align: center;
  background-color: #DCBA88;
  padding-left: 10px;
}

@media (max-width: 1030px) {
  .category-buttons {
    flex-direction: column;
  }
}



.button.category-button.router-link-active {
  background-color: #F1A104;
  color: black;
  margin-right: 130px;
  font-size: large;
}

.button.category-button {
  background-color: #DCBA88;

  color: black;

  margin-right: 130px;
  font-size: large;
}

.button.category-button:hover,
.button.category-button:active {
  background-color: #cc5500;
  color:white;

}
</style>

<template>
  <nav class="category-nav">
    <ul class="category-buttons">
      <li v-for="category in categoryList" :key="category.categoryId">
        <router-link
          :to="'/category/' + category.name"
          class="button category-button"
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
