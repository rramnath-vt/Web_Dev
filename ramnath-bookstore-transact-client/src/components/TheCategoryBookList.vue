<script setup lang="ts">
import CategoryBookListItem from "@/components/CategoryBookListItem.vue";
import { useBookStore } from "@/stores/book";
const bookStore = useBookStore();
</script>

<style scoped>

ul {
  margin-left: 5px;
  bottom:100px;
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  gap: 0.5em;
}

@media (max-width: 650px) {
  ul{
    margin-left: 5px;
    bottom:100px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 0.5em;
  }
}

@media (min-width: 651px) and (max-width: 1000px){
  ul{
    margin-left: 5px;
    bottom:100px;
    display: grid;
    grid-template-columns: repeat(2,2fr);
    gap: 0.5em;
  }
}

</style>

<template>
  <ul>
    <template v-for="book in bookStore.bookList" :key="book.bookId">
      <category-book-list-item :book="book"></category-book-list-item>
    </template>
  </ul>
</template>
