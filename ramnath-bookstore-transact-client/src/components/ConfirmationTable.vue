<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import {asDollarsAndCents} from "@/utils";
import { useOrderDetailsStore } from "@/stores/orderDetails";
import type { BookItem, OrderDetails } from "@/types";

const cartStore = useCartStore();
const orderDetailsStore = useOrderDetailsStore();
const orderDetails: OrderDetails = orderDetailsStore.orderDetails;

// A helper function - optional to use
const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
  return orderDetails.books[index];
};

function getBookPrice(bookId: number) {
  for (let book of orderDetails.books) {
    if (book.bookId === bookId) {
      return book.price;
    }
  }
}
</script>



<style scoped>
table {
  border: 1.5px black solid;
  width: fit-content;
  margin-top: 1em;
  margin-bottom: 1em;

}

td {
  display: table-cell;
  padding: 0.5em 0.5em;
  background-color: white;
  vertical-align: middle;
}

tr:nth-child(even) > td {
  background-color: lightgray;
}

.total-display {
  text-align: right;
  font-style: italic;
}
.book-title {
  min-width: 20rem;
}
</style>


<template>
  <table>
    <tr v-for="(item, index) in orderDetails.lineItems" :key="item.bookId">
      <td class="book-title">
        {{ orderDetails.books[index].title }}&nbsp;x&nbsp;{{ item.quantity }}
      </td>
      <td>
        {{ asDollarsAndCents(orderDetails.books[index].price * item.quantity) }}
      </td>
    </tr>
    <tr>
      <td class="total-display">Sub-total</td>
      <td>{{ asDollarsAndCents(orderDetails.order.amount - 500) }}</td>
    </tr>
    <tr>
      <td class="total-display">Surcharge</td>
      <td>{{ asDollarsAndCents(500) }}</td>
    </tr>
    <tr>
      <td class="total-display">Total</td>
      <td>{{ asDollarsAndCents(orderDetails.order.amount) }}</td>
    </tr>
  </table>
</template>

