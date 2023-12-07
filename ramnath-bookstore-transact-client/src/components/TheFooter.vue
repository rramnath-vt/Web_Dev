<script setup lang="ts">
</script>

<style scoped>
footer {
  background-color: #C9CC4D;
  display: flex;
  gap: 1em;
  padding: 1em;
}

@media (max-width: 1000px) {
  footer {
    flex-direction: column;
  }
}

.copyright{
  margin-right: 200px;
}

.links{
  margin-right: 350px;
}



i.fa-brands.fa-facebook {

  color: #454545;
  font-size: 20px;
  margin-right: 5px;
}

i.fa-brands.fa-square-x-twitter {

  color: #454545;
  font-size: 20px;
  margin-right: 5px;
}

i.fa-brands.fa-instagram {

  color: #454545;
  font-size: 20px;
}

i.fa-brands.fa-facebook:hover, i.fa-brands.fa-instagram:hover, i.fa-brands.fa-square-x-twitter:hover{
  color: blue;
}

.link1:active{
  font-weight: bolder;
}

.link1{
  text-decoration: none;
}



</style>

<template>
  <footer class="container">
    <section class="copyright">
      <b><i class="fa-regular fa-copyright"></i> 2023 BiblioHouse Ltd</b></section>
    <section class="links">
      <router-link to ="/" style = "color:#3300FF;" class="link1">Contact Us</router-link><span style="padding: 5px;"></span>
      <router-link to ="/" style = "color:#3300FF;" class="link1"> Directions</router-link><span style="padding: 5px;"></span>
      <router-link to ="/" style = "color:#3300FF;" class="link1">Privacy</router-link>
    </section>
    <section class="social-media-icons">
      <a href="https://www.facebook.com"><i class="fa-brands fa-facebook"></i></a>
      <a href="https://www.twitter.com"><i class="fa-brands fa-square-x-twitter"></i></a>
      <a href="https://www.instagram.com"><i class="fa-brands fa-instagram"></i></a>
    </section>
  </footer>
</template>
