<template>
  <div id="app" :class="[deviceModel]">
    <div id="zone-1">
      <button @click="onBack">BACK</button>
    </div>
    <ui-test/>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import UiTest from './components/UiTest.vue'
// import BodyTemplate2 from './views'

export default {
  name: 'app',
  components: {
    'ui-test': UiTest/* ,
    'display-card': BodyTemplate2 */
  },
  data () {
    return {
      deviceModel: 'aivi-st3-1'
    }
  },
  methods: {
    onBack (event) {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
} */
#zone-1 {
  width: 100%;
  height: 101px;
  background-color: gray;
}

.aivi-st3-1 {
  width: 1280px !important;
  height: 667px !important;
  background: #000000 !important;
  .obg-checkbox {
    margin: 31px 0 0 4px;
  }
}
.pivi-st3-1 {
  width: 1920px !important;
  height: 626px !important;
  background: #000000 !important;
}
.aivi-st3-1.zone-1 {
  height: 768px !important;
}
.aivi2 {
  width: 1145px !important;
  height: 592px !important;
  background: #000000 !important;
}
</style>
