<script setup lang="ts">
import {ref, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, required, email } from "@vuelidate/validators";
import { useCartStore } from "@/stores/cart";
 import { isCreditCard, isMobilePhone } from "@/validators";
 import CheckoutFieldError from "@/components/CheckoutFieldError.vue";
 import {useRouter} from "vue-router";
 import {asDollarsAndCents} from "@/utils";
import { OrderDetails, ServerErrorResponse } from "@/types";
import { useOrderDetailsStore } from "@/stores/orderDetails";



const cartStore = useCartStore();
const orderDetailsStore = useOrderDetailsStore();
const cart = cartStore.cart;
const router = useRouter();
const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();

const years: number[] = [];
// Loop from current year to end year
for (let i = currentYear; i <= 2099; i++) {
  years.push(i);
}

const form = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  ccNumber: "",
  ccExpiryMonth: new Date().getMonth() + 1,
  ccExpiryYear: new Date().getFullYear(),
  checkoutStatus: "",
});



const rules = {
  name: {
    required: helpers.withMessage("Please provide a name.", required),
    minLength: helpers.withMessage(
      "Name must have at least 4 letters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Name can have at most 45 letters.",
      maxLength(45)
    ),
  },
  address: {
    required: helpers.withMessage("Please provide an address.", required),
    minLength: helpers.withMessage(
      "The Address must have at least 4 letters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "The Address can have at most 45 letters.",
      maxLength(45)
    ),
  },
  

  phone: {
    required: helpers.withMessage("Please provide a phone number.", required),
    isPhoneNumber: helpers.withMessage("Please provide a valid phone number", (value) => {
      if (typeof value === 'string' && value.trim() !== '') { // Check if value is a string
        return isMobilePhone(value); // Validate phone number format
      }
      return true; // If value is not a string, don't trigger this validation
    })
},
  email: {
    required: helpers.withMessage("Please provide an email address.", required),
    email: helpers.withMessage("Please provide a valid email address.", email),
    
  },

  ccNumber: {
    required: helpers.withMessage("Please provide a credit card number.", required),
    iscreditCardNumber: helpers.withMessage("Please provide a valid credit card number", (value) => {
      if (typeof value === 'string'  && value.trim() !== '') { // Check if value is a string
        return isCreditCard(value); // Validate credit card number format
      }
      return true; // If value is not a string, don't trigger this validation
    })
},
  ccExpiryMonth: {
    required: helpers.withMessage("Please provide a credit card number.", required)},
  ccExpiryYear: {
    required: helpers.withMessage("Please provide a credit card number.", required)},

  //   TODO: Add more validations for these and other fields that need more validation.
};
const v$ = useVuelidate(rules, form);

const defaultServerErrorMessage = "An unexpected error occurred, please try again."
const serverErrorMessage = ref(defaultServerErrorMessage);

async function submitOrder() {
  console.log("Submit order");
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    form.checkoutStatus = "ERROR";
  } else {
    try {
      form.checkoutStatus = "PENDING";
      serverErrorMessage.value = defaultServerErrorMessage;

      const placeOrderResponse: OrderDetails | ServerErrorResponse =
        await cartStore
          .placeOrder({
            name: form.name,
            address: form.address,
            phone: form.phone,
            email: form.email,
            ccNumber: form.ccNumber,
            ccExpiryMonth: form.ccExpiryMonth,
            ccExpiryYear: form.ccExpiryYear,
          })

      if ("error" in placeOrderResponse) {
        form.checkoutStatus = "SERVER_ERROR";
        serverErrorMessage.value = placeOrderResponse.message
        console.log("Error placing order", placeOrderResponse);
      } else {
        form.checkoutStatus = "OK";
        orderDetailsStore.setOrderDetails(placeOrderResponse as OrderDetails)
        await router.push({name: "confirmation-view"});
      }

    } catch (e) {
      form.checkoutStatus = "SERVER_ERROR";
      serverErrorMessage.value = defaultServerErrorMessage;
      console.log("Error placing order", e);
    }
  }
}

/* NOTE: For example yearFrom(0) == <current_year> */
function yearFrom(index: number) {
  return new Date().getFullYear() + index;
}



</script>

<style scoped>
/* TODO: Adapt these styles to your page */

.checkout-page-body {
  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 1em;
  
}

form {
  display: flex;
  flex-direction: column;
  background-color:  #DCBA88;
  padding:50px;
}

form > div {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5em;
}

form > div > input,
form > div > select {
  background-color: #666666;
  margin-left: 0.5em;
}

form > div > .error {
  color: red;
  text-align: right;
  font-size: 16px;
}

.checkoutStatusBox {
  margin: 1em;
  padding: 1em;
  text-align: center;
  background-color: #DCBA88;
}


.button-link {
  display: flex;
  justify-content: center;
  align-items: center;
 
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
  margin-bottom: 10px;
}

.ctabutton:hover{ background-color: #cc5500;
}

input[type="text"] {
  background-color: white;
  border: none;
}
select {
  background-color: white !important;
  border: none;
}

.name_cont{
  display: flex;
  flex-direction: column;
  margin-left: 37px;
}

.phone_cont{
  display: flex;
  flex-direction: column;
  margin-left: 35px;
}

.address_cont{
  display: flex;
  flex-direction: column;
  margin-left: 21px;

}

.email_cont{
  display: flex;
  flex-direction: column;
  margin-left:40px;

}
  

.cc_cont{
  display: flex;
  flex-direction: column;
  margin-left:1px;

}
.error-one{color:red}
.complete-one{color: darkgreen;}

.card-detail{text-align: center;}
.total-amount{font-weight: bold;}

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
</style>

<template>
  <div class="checkout-page"><br><br>
    <!-- TODO: Add an HTML section to display when checking out with an empty cart -->

    <section class="checkout-page-body" v-if="!cart.empty">
      <form @submit.prevent="submitOrder">
        <div class = "name_cont">
        <div>
          <label for="name">Name &nbsp;</label>
          <input
            type="text"
            size="20"
            id="name"
            name="name"
            v-model.lazy="v$.name.$model"
          />
        </div>
        <CheckoutFieldError :field-name="v$.name"/>
        
      </div>

      <div class = "address_cont">
        <div>
          <label for="address">Address &nbsp;</label>
          <input
            type="text"
            size="20"
            id="address"
            name="address"
            v-model.lazy="v$.address.$model"
          />
        </div>
        <CheckoutFieldError :field-name="v$.address"/>
        
      </div>

      
        <!-- TODO: Add address input and validation messages -->

       

        <div class ="phone_cont">
        <div>
          <label for="phone">Phone &nbsp;</label>
          <input
            class="textField"
            type="text"
            size="20"
            id="phone"
            name="phone"
            v-model.lazy="v$.phone.$model"
          />
        </div>

        <CheckoutFieldError :field-name="v$.phone"/>
      </div>
        <!-- TODO: Add phone validation message(s) -->
        <div class ="email_cont">
        <div>
          <label for="email">Email &nbsp;</label>
          <input type="text" size="20" id="email" name="email"  v-model.lazy="v$.email.$model"/>
        </div>
        <!-- TODO: Add email validation message(s) -->
        <CheckoutFieldError :field-name="v$.email"/>
      </div>
        <div class ="cc_cont">
        <div>
          <label for="ccNumber">Credit card &nbsp;</label>
          <input type="text" size="20" id="ccNumber" name="ccNumber"  v-model.lazy="v$.ccNumber.$model"/>
          <p id="result"></p>
        </div>
        <CheckoutFieldError :field-name="v$.ccNumber"/>
      </div>
        <!-- TODO: Add credit card validation message(s) -->

            <div>
              &nbsp;&nbsp;&nbsp;<label>Exp Date</label>
              &nbsp;<select v-model="v$.ccExpiryMonth.$model">
      <option v-for="(month, index) in months" :key="index" :value="index + 1">
        {{ month }} ({{ index + 1 }})
      </option>
    </select>
    <select v-model="v$.ccExpiryYear.$model">
      <option
        v-for="(year) in years"
        :key="year"
        :value="year"
      >
        {{ year }}
      </option>


                <!-- TODO: Complete this select tag for 'ccExpiryYear'. -->
              </select>
            </div>
        <!-- TODO (style): Use a single label for both month and date and put the on the same line. -->
        <!-- TODO (style): For example: Exp Date {Month} {Year}, with space between month/year selectors. -->
        <br>
        
        <input
          type="submit"
          name="submit"
          class="button ctabutton"
          :disabled="form.checkoutStatus === 'PENDING'"
          value="Complete Purchase"
        /><br>

        <span class = "card-detail">Your card will be charged&nbsp;<span class = "total-amount">{{ asDollarsAndCents(cartStore.cart.total) }}</span></span>
        <span class = "card-detail">(<span class = "total-amount">{{ asDollarsAndCents(cartStore.cart.subtotal) }}</span> + <span class = "total-amount">{{ asDollarsAndCents(cartStore.cart.surcharge) }}</span> Shipping)</span>
  <br>
        <!-- TODO (style): The submit button should not take up the entire width of the form. -->
        <!-- TODO (style): The submit button should be styled consistent with your own site. -->
      </form>
      <!-- TODO (style): Fix error message placement so they nearer to the correct fields. -->
      <!-- TODO (style): HINT: Use another <div> and label, input, and error, and use flexbox to style. -->

      <!-- TODO: Display the cart total, subtotal and surcharge. -->

      <section v-show="form.checkoutStatus !== ''" class="checkoutStatusBox">
        <div v-if="form.checkoutStatus === 'ERROR'">
          <span class= "error-one">Error: Please fix the problems above and try again.</span>
        </div>

        <div v-else-if="form.checkoutStatus === 'PENDING'">Processing...</div>

        <div v-else-if="form.checkoutStatus === 'OK'"><span class= "complete-one">Order placed...</span></div>

        <div v-else>{{ serverErrorMessage }}</div>
      </section>
    </section>
    <section class="other" v-else>
    <br> <h4 style="text-align: center;">Your cart is empty</h4>
  <router-link to="/category/Classics" class="button-link" style="text-decoration: none;">
        <button class="button ctabutton">Start Shopping</button>
    </router-link>

</section><br><br>
  </div>
</template>
