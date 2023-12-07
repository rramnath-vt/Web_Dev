<script setup lang="ts">
</script>

<style scoped>
.container {

  background-color: #DCBA88;
  height:500px;
 
}


.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12rem;
  margin: 1rem;

}

.content {
  display: flex;
  justify-content: center;
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

</style>
<template>
  <div class="container">
    <div class="title">404</div>
    <div class="content">Page not found</div>
    <router-link to="/" class="button-link" style="text-decoration: none; margin-top: 50px;">
        <button class="button ctabutton" >Back to Home</button>
    </router-link>
  </div>
</template>
