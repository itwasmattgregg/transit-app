<template>
  <div id="app">
    <div class="nav rounded-lg">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import "@/assets/styles/main.css";

export default {
  name: "app"
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav {
  padding: 30px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 0 0 10px 10px;
  padding: 15px 30px;
  a {
    font-weight: bold;
    display: inline-block;
    padding: 0 10px;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
