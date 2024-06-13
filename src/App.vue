<template>
  <Home />
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: Poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

/* BOTTOM BAR - BEGINING */
.BottomBaroutsideBox {
  position: fixed;
  width: 90%;
  bottom: 25px;
  left: 18px;
  z-index: 5;
  background: rgb(9, 93, 126);
  background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
  border-radius: 30px;
  text-align: center;
  box-shadow: 0px 3px 1px 1px #8c9ba1;
}


.BottomBarbuttonNav {
  background-color: #2c84a700;
  border: 0;
  cursor: pointer;
  margin-left: 30px;
  margin-top: 2px;
  margin-bottom: 2px;
  border-radius: 20px;
}

.BottomBarmarginLeftNo {
  margin-left: 0px;
}


.BottomBariconImg {
  width: 35px;
  height: 35px;
}

.BottomBaraward {
  width: 30px;
}

.BottomBarselected {
  /* background-color: rgba(255, 255, 255, 0.267); */
  border-radius: 30px;
  border: solid 3px rgb(255, 255, 255);
  padding-top: 2px;
  padding-left: 4px;
}

/* BOTTOM BAR - END */
</style>
