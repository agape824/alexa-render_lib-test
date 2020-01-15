<template>
  <div class="welcome-card">
    <h3>{{ title }}</h3>
    <p>1</p>
    <p>2</p>
    <p>3</p>
  </div>
</template>

<script>
/**
 * Welcome Card
 *
 * Data Fetching: Fetching After Navigation (created hook)
 *
 * @see init-state-item
 */
import * as routeTypes from '../router/route-types'

export default {
  name: routeTypes.WELCOME_CARD,
  data () {
    return {
      title: 'Things to try'
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
/* @font-face {
  font-family: "AmazonEmber_Lt_Local";
  src: url("../assets/font/AmazonEmber_Lt.woff") format("woff");
}
@font-face {
  font-family: "AmazonEmber_Rg_Local";
  src: url("../assets/font/AmazonEmber_Rg.woff") format("woff");
} */
.welcome-card {
  padding: 74px 0 0 134px;
  h3 {
    max-width: 98%;
    font-family: "AmazonEmber_Rg_Local";
    font-size: 68px;
    line-height: 200%;
    margin-bottom: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
  }
  p {
    max-width: 93%;
    font-family: "AmazonEmber_Lt_Local";
    font-size: 45px;
    line-height: 145%;
    padding-left: 65px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
  }
}
</style>
