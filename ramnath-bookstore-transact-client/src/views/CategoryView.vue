

<script setup lang="ts">
import {watch} from "vue";
import TheCategoryNav from "@/components/TheCategoryNav.vue";
import TheCategoryBookList from "@/components/TheCategoryBookList.vue";
import { useRoute, useRouter } from "vue-router";
import { useBookStore } from "@/stores/book";
import { useCategoryStore } from "@/stores/category";

const route = useRoute();
const bookStore =useBookStore();
const categoryStore = useCategoryStore();
const router = useRouter();


watch(
  () => route.params.name,
  async (newName) => {
    try {
      await bookStore.fetchBooks(newName as string)
      categoryStore.setSelectedCategoryName(newName as string)
    } catch (e) {
      await router.push('/not-found')
    }
  },
  { immediate: true }
)

</script>

<style scoped></style>
<template>
<div>
<the-category-nav></the-category-nav>
<the-category-book-list> </the-category-book-list>
</div>
</template>

