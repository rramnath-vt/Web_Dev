<script setup lang="ts">
import CartTable from "@/components/CartTable.vue";
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const clearCart = function () {
  cartStore.clearCart();
};
</script>
<style scoped>
h1 {
  
  text-align: center;
}
</style>

<template>
    <div style="background-color:  #DCBA88;">
  <cart-table></cart-table>
  </div>
</template>