import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "@/views/CategoryView.vue";
import CartView from "@/views/CartView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import ConfirmationView from "@/views/ConfirmationView.vue";
import PageNotFoundView from "@/views/PageNotFoundView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      alias:["/home","/index.html"],
    },
    {
      path: "/cart",
      name: "cart-view",
      component: CartView,
    },
  
    {
      path: "/checkout",
      name: "checkout-view",
      component: CheckoutView,
    },
    {
      path: "/confirmation",
      name: "confirmation-view",
      component: ConfirmationView,
    },
    {
      path: "/category",
      redirect:"/category/Classics",
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: PageNotFoundView,
    },
    {
      path: "/category/:name",
      name: "category-view",
      component: CategoryView,
    }
    // Add more routes as needed
  ]
});

export default router;
