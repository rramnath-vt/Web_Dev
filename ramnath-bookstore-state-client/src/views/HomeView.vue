<script setup lang="ts">
import TheHomeCategoryList from "@/components/TheHomeCategoryList.vue";
</script>

<style scoped>

.home-page {
  display: flex;
  min-height: 600px;
  flex-direction: row;
}
.intro-section {
  background-color: #DCBA88;
  max-height: 220px;
  max-width: 600px;
  text-align: center;
  top: 170px;
  left: 20px;
  position: relative;
  line-height: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 15%;
  margin-right: 20px;
}
.top-pick {
  background-color: #DCBA88;
  /*max-height: 500px;
  max-width: 600px;*/
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  top: 60px;
  left: 60px;
  position: relative;
  padding-top: 1px;
}
.welcome-text {
  width: 20em;
}

.category-image-items {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
}

.category-image-items a {
  text-align: center;
  cursor: pointer;
}

.category-image-items div {
  padding: 0.5em 0;
  background: rgba(0, 0, 0, 0.5); /* last # is percent opacity */
  color: white;
  transform: translateY(-2.25em);
  margin-bottom: -2em;
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

.ctabutton:hover{
  background-color: #cc5500;
}
@media (max-width: 1000px) {
  .home-page {
    flex-direction: column;
  }

  .intro-section {
    position: relative;
    top:10px;
    left:10px;
  }
  .context{font-size: 14px;}

  .top-pick {
    position: relative;
    top:20px;
    left:2px;
    margin-bottom: 20px;

  }


}
@media (min-width: 601px) {
.context{
font-size: 20px;}}

</style>
<template>
  <div class="home-page">
    <section class = "intro-section">
      <p><h2>WELCOME TO BIBLIOHOUSE !!!!</h2> <br>
        <span class="context">Prepare to immerse yourself in a world-class reading adventure with our
          extraordinary collections.</span>
        <br><br>
        <router-link to="/category/Classics"><button class="button ctabutton">SHOP NOW !!!</button></router-link> </p>
    </section>
    <section>
      <div class ="top-pick">
        <h4> The Top Picks of the Month!!</h4>
        <router-link to="/category/Classics">
        <table>

          <tr>
            <td><img src="/public/book-images/9781496737533.gif"></td>
            <td><img src="/public/book-images/9780593404515.gif"></td>
            <td><img src="/public/book-images/9781419763854.gif"></td>

          </tr>
          <tr>
            <td><img src="/public/book-images/moby-dick.gif"></td>
            <td><img src="/public/book-images/harry-potter-and-the-sorcerers-stone.gif"></td>
            <td><img src="/public/book-images/little-dorrit.gif"></td>

          </tr>
        </table>
        </router-link>
      </div>
    </section>
  </div>
</template>
