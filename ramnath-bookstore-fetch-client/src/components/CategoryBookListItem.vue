<script setup lang="ts">
import { defineProps } from 'vue'
import type { BookItem } from '@/types'

const props = defineProps<{
  book: BookItem
}>()

const bookImagePrefix = `${import.meta.env.BASE_URL}/book-images`
const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase()
  name = name.replace(/ /g, '-')
  name = name.replace(/'/g, '')
  return `${name}.gif`
}
</script>
<style scoped>
.book-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1em;
  margin-top: 10px;
  background-color: #dcba88;
  max-width: 500px;
  max-height: 265px;
  padding-left: 1em;
  margin-left: 20px;
  border-radius: 5%;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-right: 8px;
}

@media (max-width: 1000px) {
  .book-box{
    flex-direction: column;
    position: relative;
    right: 10px;
  }
}

.book-image-and-info {
  align-items: right;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.book-image {
  margin-top: 10px;
  width: fit-content;
  margin-right: 50px;
}

.book-image img {
  height: 187px; /* Set the desired height */
  width: 129px; /* Set the desired width */
}

.read-now-button {
  background-color: #0008;
  color: white;
  transform: translateY(-1.6em);
  margin-bottom: -1.6em;
  text-align: center;
  padding: 0.1em;
}

.read-now-button:hover,
.buy-now-button:hover {
  cursor: pointer;
}

.book-info {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

.book-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 3px;
  text-align: center;
  margin-top: 20px;
}

.book-author {
  font-size: 14px;
  text-align: center;
}

.book-price {
  font-style: italic;
  text-align: right;
  position: relative;
  right: 20px;
  bottom: 50px;
  font-size: 16px;
}

.buy-now-button {
  background-color: #f1a104;
  padding: 0.25em 1em;
  align-self: end;
  border: none;
  box-shadow: none;
  border-radius: 0;
  margin-left: 5px;
  bottom: 50px;
  right: 10px;
  position: relative;
  border-radius: 4%;
}

.buy-now-button:hover {
  background-color: #cc5500;;
  color: white;
}

i.fa-solid.fa-book-open-reader {
  border-radius: 50%;
  background-color: #f1a104;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: relative;
  right: 78px;
}

i.fa-solid.fa-book-open-reader:hover {
  cursor: pointer;
  background-color: #cc5500;
  color: white;
}
</style>

<template>
  <li class="book-box">
    <div class="book-image-and-info">
      <div class="book-image">
        <img :src="`${bookImagePrefix}/${bookImageFileName(props.book)}`" :alt="book.title" />
      </div>
      <template v-if="book.isPublic">
        <i class="fa-solid fa-book-open-reader"></i>
      </template>
      <div class="book-info">
        <div class="book-title">{{ book.title }}</div>
        <div class="book-author">{{ book.author }}</div>
      </div>
    </div>
    <div class="book-price">${{ (book.price / 100).toFixed(2) }}</div>
    <button class="buy-now-button">
      <i class="fa-solid fa-cart-plus" style="font-size: 16px"></i>
      <span style="font-size: 14px; font-weight: 600">Add to Cart</span>
    </button>
  </li>
</template>
