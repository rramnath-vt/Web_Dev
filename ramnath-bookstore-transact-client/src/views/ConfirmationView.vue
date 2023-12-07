<script setup lang="ts">
import ConfirmationTable from "@/components/ConfirmationTable.vue";
import { useCategoryStore } from "@/stores/category";
import { useOrderDetailsStore } from "@/stores/orderDetails";
import { computed } from "vue";

const categoryStore = useCategoryStore();
const orderDetailsStore = useOrderDetailsStore();
const orderDetails = orderDetailsStore.orderDetails;

const orderDate = computed(function () {
  let date = new Date(orderDetails.order.dateCreated);
  return date.toLocaleTimeString();
});

function getCCExpYear() {
  return new Date(orderDetails.customer.ccExpDate).getFullYear();
}

function getCCExpMonth() {
  let month = new Date(orderDetails.customer.ccExpDate).getMonth()+1;
  if (month < 10) {
    return "0" + month;
  } else {
    return month;
  }
}

function getMaskedCardNumber() {
  return orderDetails.customer.ccNumber.substring(
      orderDetails.customer.ccNumber.length - 4
  );
}
</script>

<style scoped>
#confirmationView {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem 0;
  padding: 1rem;
  border-bottom: 2.5px solid black;
}
.confirmationContent {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 3px solid black;
  background-color: #DCBA88;
  padding: 2rem;
}

.confirmationContent2 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 3px solid black;
  background-color: #DCBA88;
  padding: 2rem;
}

.button-link {
  display: flex;
  justify-content: center;
  align-items: center;
 
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

.ctabutton:hover{ background-color: #cc5500; cursor: pointer;}


.check-mark {
  width: 8rem;
}
.confirm-tagline {
  font-size: 1.5rem;
  margin: 1rem;
  color:#05154D;
  font-weight: bold;
}

.confirm{

}

.test{
font-weight: bold;
}

.customer-details {
  display: flex;
  width: 100%;
  flex-direction: column;
  font-style: italic;
}
</style>

<template>
  <div id="confirmationView">
    <div v-if="orderDetailsStore.hasOrderDetails()" class="confirmationContent">
      <div class="confirm-tagline"><i class="fa fa-check-circle" aria-hidden="true" style="color: #cc5500;"></i>&nbsp; Your Order is Confirmed</div>
      <div class="confirm">
        Confirmation number #{{ orderDetails.order.confirmationNumber }}
      </div>
      <div>
        Time: {{ new Date(orderDetails.order.dateCreated).toLocaleString() }}
      </div>
      <confirmation-table> </confirmation-table><br>
      <div class="customer-details">
        <div class="test">Customer Details:</div>
        <ul>
          <li>{{ orderDetails.customer.customerName }}</li>
          <li>{{ orderDetails.customer.address }}</li>
          <li>{{ orderDetails.customer.email }}</li>
          <li>Mobile: {{ orderDetails.customer.phone }}</li>
          <li>
            Card details: **** **** **** {{ getMaskedCardNumber() }} ({{
              getCCExpYear()
            }}
            /
            {{ getCCExpMonth() }})
          </li>
        </ul>
      </div>
      
      <router-link to="/" class="button-link" style="text-decoration: none; margin-top: 20px;">
        <button class="button ctabutton" @click="cartStore.cart.clear()">Back to Home</button>
    </router-link>


    </div>
    <div v-else class= "confirmationContent2" style="background-color: #DCBA88; height: 200px; width:300px"><h3>No order is present</h3>
      <router-link to="/category/Classics" class="button-link" style="text-decoration: none; margin-top: 20px;">
        <button class="button ctabutton">Start Shopping</button>
    </router-link>
    </div>
  </div>
</template>
