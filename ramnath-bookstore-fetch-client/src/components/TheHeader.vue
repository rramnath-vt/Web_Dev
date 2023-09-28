<script setup lang="ts">
import TheHeaderDropdown from '@/components/TheHeaderDropdown.vue'
</script>

<style scoped>
header {
  background: #c9cc4d;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  gap: 1em;
  max-height: 200px;

}

.text-logo {
  font-family: 'Inde Flower', cursive;
}

.search-bar {
  padding: 0.5em;
}

@media (max-width: 1000px) {
  header {
    flex-direction: column;
  }
  .title-and-search-bar{position:relative;bottom: 25px;}
  .search-bar {max-width:150px;}
  i.fa-solid.fa-magnifying-glass{margin-left: 3px;}
  i.fa-solid.fa-cart-shopping {position:relative;bottom: 45px;}
  .shop .cart-count {
    position: relative;
    bottom:85px;
  }
  .login-dropdown{position: relative; bottom:45px;right:45px;}
  /*.bookstore-logo{order:1; z-index: 1;}
  .title-and-search-bar{order:2; z-index: 1;}
  .text-logo{color:red;}*/
}

.title-and-search-bar {
  display: flex;
  align-items: center;
}


.header-dropdown-and-cart {
  display: flex;
  align-items: center;
}

.text-logo {
  margin-right: 20px; /* Adjust the margin as needed */
}

.search-bar {
  /*margin-right: 10px;*/
  flex: 1;
  width: 300px;
  margin: 0 auto; /* Allow the search bar to grow and take available space */
  border-radius: 6%;
}

.search-button {
  /* Remove any line break between the search bar and the button */
  white-space: nowrap;
}

i.fa-solid.fa-magnifying-glass {
  border-radius: 50%;
  background-color: #ffcf52;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-left: 3px;
  margin-right: 20px;
}

i.fa-solid.fa-magnifying-glass:hover{
  background-color: #cc5500;
  color: white;
  cursor: pointer;
}

.button {
  margin-right: 10px; /* Adjust the margin as needed to create space between buttons */
}

i.fa-solid.fa-cart-shopping {
  color: #faff06;
  font-size: 28px;
  text-shadow: 1px 1px 0 black;

}

.cart-count {
  border-radius: 50%;
  background-color: #ffcf52;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-right: 95px;
  bottom: 40px;
  left: 25px;
  position: relative;
  font-size: 14px;
}


.button1 {
  background-color: #ffcf52;
  color: black;
  border: none;
  border-radius: 50%;
  width: 45px; /* Adjust the width and height to the same value */
  height: 45px; /* Same value as the width for a perfect circle */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.button1 span {
  font-size: 14px; /* Adjust the font size as needed */
  display: flex;
  align-items: center;
}

.button1 i {
  margin-right: 5px; /* Adjust the spacing between the icon and text */
}

.shop:hover i.fa-solid.fa-cart-shopping {
  animation: beat 0.5s linear;
  animation-fill-mode: both;
}

@keyframes beat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}




.button1:hover{
  background-color: #cc5500;
  color: white;
}

.image1 {
  height: 60px;
}

.image2 {
  height: 40px;
}


.loginfun {
  display: flex;
  align-items: center;
  text-align: center;
}

.loginfun img {
  margin-right: 4px; /* Add some spacing between the image and text */
}

.loginfun:hover {
  cursor: pointer;
  font-weight: bolder;
}

.loginfun:hover img {
  transform: scale(1.2); /* Scale the image on hover */
  transition: transform 0.3s; /* Add a smooth transition effect to the image */
}

.login-dropdown {
  position: relative;
}

.login-dropdown ul {
  background-color: white;
  position: relative;
  color: black;
  display: none;
}

.login-dropdown li {
  padding: 0.25em 0.5em;
}



.login-dropdown li:hover {
  /* background: lightgray; */
  background: #F1A104;
}

.login-dropdown:hover ul {
  margin-top: 5px;
  display: block;
  position: absolute;
  min-width: 8em;
  z-index: 1;
  cursor: pointer;
}
.shop{margin-top: 20px;}
.shop:hover{cursor: pointer}
.shop i.fa-solid.fa-cart-shopping:hover{
  font-weight: bold;
}
</style>

<template>
  <header class="container">
    <section class="bookstore-logo">
      <router-link to="/">
        <img class="image1" src="/site-images/bookstore-logo.png"/>
      </router-link>
    </section>
    <section class="title-and-search-bar">
      <h1 class="text-logo">BiblioHouse</h1>
      <div class="search-container">
        <form action="category.html" class="search-bar-right">
          <input type="text" class="search-bar" placeholder="Search by Title, Author or Keywords" />
          <i class="fa-solid fa-magnifying-glass"></i>
        </form>
      </div>
    </section>
    <section class="header-dropdown-and-cart">
      <the-header-dropdown></the-header-dropdown>

      <div class="shop"><i class="fa-solid fa-cart-shopping"></i>
      <div class="cart-count">0</div></div>
      <div class ="login-dropdown">
      <div class="loginfun"><img class="image2" src="/site-images/account.png"/>   Hi, Ramnath</div>
<!--      <button class="button button1"><i class="fa-solid fa-user"></i> RR</button>-->
        <ul>
          <li><router-link to="/" style= "color: black;text-decoration: none;">Profile</router-link></li>
          <li><router-link to="/" style= "color: black;text-decoration: none;">Orders</router-link></li>
          <li><router-link to="/" style= "color: black;text-decoration: none;">Recently Viewed</router-link></li>
          <li><router-link to="/" style= "color: black;text-decoration: none;">Membership</router-link></li>
          <li><router-link to="/" style= "color: black;text-decoration: none;">Manage Address</router-link></li>
          <li><router-link to="/" style= "color: black;text-decoration: none;">Account Settings</router-link></li>
          <li><router-link to="/" style= "color: black;text-decoration: none;">Logout</router-link></li>


        </ul>
      </div>
    </section>
  </header>
</template>
