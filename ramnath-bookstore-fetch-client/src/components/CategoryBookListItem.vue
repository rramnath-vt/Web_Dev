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
  gap: 1em;
  margin-top: 10px;
  background-color: #dcba88;
  max-width: 340px;
  max-height: 265px;
  padding-left: 1em;
  margin-left: 10px;
  border-radius: 5%;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-right: 5px;
}

@media (max-width: 1000px) {
  .book-box{
    flex-direction: column;
    position: relative;
    right: 10px;
  }
}

.book-image-and-info {
  
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.book-image {
  margin-top: 10px;
}

.book-image img {
  height: 187px; /* Set the desired height */
  width: 129px; /* Set the desired width */
}



.book-info {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

.book-title {
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
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
  right: 20px;
}


i.fa-solid.fa-book-open-reader:hover {
  cursor: pointer;
  background-color: #cc5500;
  color: white;

}
.book-readnow{

  display: flex;
  flex-direction: row;
  align-items: safe;
 
}
</style>


<template>
  <li class="book-box">
    <div class="book-image-and-info">
      <div class="book-readnow">
      <div class="book-image">
        <img :src="`${bookImagePrefix}/${bookImageFileName(props.book)}`" :alt="book.title" />
      </div>
      <template v-if="book.isPublic">
        <i class="fa-solid fa-book-open-reader"></i>
      </template></div>
      <div class="book-info" :style="{ marginLeft: book.isPublic ? '-5px' : '25px' }">
        
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
