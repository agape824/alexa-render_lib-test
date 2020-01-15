<template>
  <div class="body-template-2">
    <h3 class="sub-title">{{ payload.title.subTitle }}</h3>
    <h4 class="main-title">{{ payload.title.mainTitle }}</h4>
    <div class="skill-icon">
      <img :src="skillIconUrl" alt="">
    </div>
    <vca-scroll-view>
      <div class="context">
        <p>{{ payload.textField }}</p>
      </div>
      <div class="img">
        <img :src="imgUrl" alt="">
      </div>
    </vca-scroll-view>
  </div>
</template>

<script>
import scrollView from './components/scroll-view'

/**
 * Vue component/instance options order를 따라 개발해주세요.
 * https://vuejs.org/v2/style-guide/#Component-instance-options-order-recommended
 */
export default {
  name: 'BodyTemplate2',
  components: {
    'vca-scroll-view': scrollView
  },
  props: {
    uiViewToken: {
      type: String,
      required: true // for automaticTimeoutMixin
    },
    payload: {
      type: Object,
      required: true
    }
  },
  // prop payload를 가공해서 사용해야 할 경우
  computed: {
    skillIconUrl () {
      if (this.payload.skillIcon) {
        return this.payload.skillIcon.sources[0].url
      } else {
        return ''
      }
    },
    imgUrl () {
      return this.payload.image.sources[0].url
    }
  },
  created () {
    console.log('c')
  }
}
</script>

<style lang="scss" scoped>
.aivi-st3-1 .body-template-2 {
  width: 1280px;
  height: 667px;
}
.body-template-2 {
  width: inherit;
  height: inherit;
  .sub-title {
    padding-top: 22px;
    margin-left: 193px;
    font-family: 'Amazon Ember';
    font-size: 37px;
    line-height: 135%;
    color: #afafaf;
  }
  .main-title {
    margin-left: 192px;
    font-family: 'Amazon Ember';
    font-size: 37px;
    line-height: 137%;
  }
  .skill-icon {
    position: absolute;
    top: 30px;
    right: 22px;
    width: 88px;
    height: 88px;
    text-align: center;
    overflow: hidden;
  }
  .skill-icon > img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .context {
    margin: 26px 0 0 48px;
    width: 49%;
    height: 100%;
    overflow: visible;
    font-size: 37px;
    line-height: 151%;
  }
  .context > p {
    font-family: 'Amazon Ember Light';
    font-size: 37px;
    line-height: 151%;
  }
  .img {
    position: fixed;
    top: 20px;
    left: 560px;
    width: 440px;
    /* height: 440px; */
    border: 2px solid #3d3d3d;
    background: #222222;
    box-sizing: border-box;
  }
  .img img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>