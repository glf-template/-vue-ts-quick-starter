<template>
  <div id="app">
    <div class="header">
      <img alt="Vue logo" src="@/assets/images/logo.png" class="logo" />
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .header {
    .logo {
      width: 50px;
    }
  }

  .container {
    padding: 20px;
  }
}
</style>
