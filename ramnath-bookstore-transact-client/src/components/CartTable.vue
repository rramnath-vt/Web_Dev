<script setup lang="ts">
import type { BookItem } from "@/types";
import { useCartStore } from "@/stores/cart";
import {asDollarsAndCents} from "@/utils";
const cartStore = useCartStore();

const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};
const bookImagePrefix = `${import.meta.env.BASE_URL}/book-images`;

const updateCart = function (book: BookItem, quantity: number) {
  cartStore.cart.update(book, quantity);
};


</script>

<style scoped>
.cart-table {
  display: grid;
  grid-template-columns: max-content minmax(10em, 20em) repeat(3, max-content);
  row-gap: 1em;
  width: fit-content;
  margin: 0 auto;
}


@media (max-width: 1000px) {
  .cart-table {
    grid-template-columns: max-content 1fr repeat(3, max-content); 
    width: fit-content;
    margin: 0 auto;
  }

  .but-container2{

    position: relative;
    right: 150px;
  }

  .subtotal-container{
    position: relative;
    left: 70px;

  }

  
}

.ctabutton {
  background-color: #F1A104;
  color: black;
  font-size: larger;
  font-weight: bold;
  border-radius: 4%;
  border: none;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
}

.ctabutton2 {
  background-color: #f7d784;
  color: black;
  font-size: large;
  font-weight: bold;
  border-radius: 3%;
  border: 2px solid;
  border-color: #ed7e0e;
  box-shadow: none;
}

.ctabutton3 {
  background-color: #e4b368;
  color: black;
  font-size: large;
  font-weight: bold;
  border-radius: 3%;
  border: 2px solid;
  border-color: #ed7e0e;
  box-shadow: none;
}

ul {
  display: contents;
}

ul > li {
  display: contents;
}


.table-heading {
  background-color: #cc5500;
  color: white;
}

.table-heading > * {
  background-color: #cc5500;
  padding: 0.5em;
}

.heading-book {
  grid-column: 1 / 3;
}

.heading-price {
  grid-column: 3 / 5;
  text-align: right;
}

.heading-subtotal {
  text-align: right;
  grid-column: -2 / -1;
}

.cart-book-image {
  padding: 0 1em;
}

.cart-book-image > * {
  margin-left: auto;
  margin-right: 0;
}

img {
  display: block;
  width: 100px;
  height: auto;
}



.cart-book-price {
  padding-left: 1em;
  text-align: right;
}

.cart-book-quantity {
  padding-left: 1em;
  padding-right: 1em;
}

.cart-book-subtotal {
  text-align: right;
  padding-left: 1em;
  padding-right: 1em;
}

/* Row separators in the table */

.line-sep {
  display: block;
  height: 2px;
  background-color: gray;
  grid-column: 1 / -1;
}

/* Increment/decrement buttons */

.icon-button {
  border: none;
  cursor: pointer;
}

.inc-button {
  font-size: 1.125rem;
  color: #ed7e0e;
  background-color: #f7d784;
  margin-right: 0.25em;
}

.inc-button:hover {

  color:#cc5500;
}

.dec-button {
  font-size: 1.125rem;
  color: #ed7e0e;
  background-color: #f7d784;
}

.dec-button:hover {
  color: #cc5500;;
}

/* Chevron buttons */



input[type="number"] {
  width: 4em;
}

select {
  background-color: var(--primary-color);
  color: black;
  border: 2px solid var(--primary-color-dark);
  border-radius: 3px;
}

.button-link {
  display: flex;
  justify-content: center;
  align-items: center;
 
}

 
.subtotal-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
  margin-right:220px;
  
  font-weight: bold;
}
.but-container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.but-container2{
    display: flex;
    flex-direction: row;
    margin-left: 10em;
    justify-content:flex-start;
}

.cart-text{
  text-align: center;
  font-size: 20px;
}

.cart-book-quantity {
  position: relative;
}

.fa-trash {
  position: relative;
  top: 120px;
  left: 70px;
  
}

.other {
  background-color: #DCBA88;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 300px; /* Adjust the width percentage as needed */
  margin: 0 auto; /* Add this line to horizontally center the box */
}

.fa-trash:hover{cursor: pointer; color: #cc5500;} 
.ctabutton:hover, .ctabutton2:hover, .ctabutton3:hover{ background-color: #cc5500; cursor: pointer;}





</style>

<template>

<div v-if="cartStore.count > 0">
    <br><br><h3 style="text-align: center;"> Your Order</h3><br>
    <div class ="but-container2">

<button class="button ctabutton2" @click="cartStore.cart.clear()">Empty Cart</button>
</div><br><br>
<div v-if="cartStore.count > 1"> <div class = "cart-text">You have added {{cartStore.count}} books in your cart</div> </div>
<div v-else> <div class = "cart-text">You have added 1 book in your cart </div> </div>
<br><br><div class="cart-table" style="background-color: #f7d784;">
    <ul>
      <li class="table-heading">
        <div class="heading-book">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Book</div>
        <div class="heading-price">Price / Quantity</div>
        <div class="heading-subtotal">Amount</div>
      </li>

      <template v-for="item in cartStore.cart.items" :key="item.book.bookId">
  <li>
    <div class="cart-book-image">
      <img
        :src="`${bookImagePrefix}/${bookImageFileName(item.book)}`"
        :alt="item.book.title"
        width="100px"
        height="auto"
      />
    </div>
    <div class="cart-book-title">{{ item.book.title }}</div>
    <div class="cart-book-price">
      {{ asDollarsAndCents(item.book.price) }}
    </div>
    <div class="cart-book-quantity">
      <span class="quantity">{{ item.quantity }}</span
      >&nbsp;
      <button
        class="icon-button inc-button"
        @click="updateCart(item.book, item.quantity + 1)"
      >
        <i class="fas fa-plus-circle"></i>
      </button>
      <button
        class="icon-button dec-button"
        @click="updateCart(item.book, item.quantity - 1)"
      >
        <i class="fas fa-minus-circle"></i>
      </button>
      <i class="fa-solid fa-trash" style="float: right;" @click="updateCart(item.book, 0)"></i>
    </div>
    <div class="cart-book-subtotal">{{ asDollarsAndCents(item.book.price* item.quantity)}}</div>
  </li>

  <li class="line-sep"></li>

</template>
    </ul>
  </div>
  <div class="subtotal-container">
    <span>Sub Total:&nbsp;&nbsp;</span>
    <span class="subtotal-amount">{{ asDollarsAndCents(cartStore.cart.subtotal) }}</span>
  </div><br>
  <div class ="but-container">

    <router-link to="/category/Classics" style="text-decoration: none;">
  
    <button class="button ctabutton2">Continue Shopping</button>
  
</router-link>

  <router-link to="/checkout" style="text-decoration: none;">
  
    <button class="button ctabutton">Proceed to Checkout</button>
  
</router-link>

</div>
</div>
  <div v-else class="other"><br><br>
  <h4 style="text-align: center;">Your cart is empty</h4>
  <router-link to="/category/Classics" class="button-link" style="text-decoration: none;">
        <button class="button ctabutton">Start Shopping</button>
    </router-link>


</div><br><br>

</template>
