<template>
  <div class='obg-scroll-view' :class='{"disabled": lockout.status && !lockout.pageScroll}' >
    <div class='scroll-container' >
      <slot></slot>
      <div class='dummy-item' v-if="hideDummyItem == false && isEmpty == false" ></div>
    </div>
    <div class="obg-scroll-view-lockout-mask" v-if="lockout.status" v-obg-touch-swipe="onSwipeLockoutHandler" @ref="lockoutMask" @click="onClickLockoutMask">
      <p>{{lockout.label}}</p>
    </div>
  </div>
</template>

<script>
import IScroll from '../../features/iscroll'
import spm from './scroll-position-manager'
import Events from '../../features/events'
/**
 * @see Renault, Nissan
 * @class scrollview
 * @classdesc components/scroll-view
 * @param {boolean} [hideDummyitem=false]
 * @param {string} [scrollKey]
 * @param {boolean} [scrollbars=true]
 * @param {boolean} [fadeScrollbars=true]
 * @param {boolean} [preventDefault=true]
 * @param {boolean} [bounce=true]
 * @example
 * <vca-scroll-view>
 *  some content in here
 * </vca-scroll-view>
 */
export default {
  name: 'vca-scroll-view',
  props: {
    hideDummyItem: {
      type: Boolean,
      default: false
    },
    scrollKey: {
      type: String
    },
    scrollbars: {
      type: Boolean,
      default: true
    },
    fadeScrollbars: {
      type: Boolean,
      default: true
    },
    bounce: {
      type: Boolean,
      default: () => {
        let isNissan = window.applicationFramework && window.applicationFramework.util.getDeviceModel() === 'nissan9p'
        return !isNissan
      }
    },
    preventBounce: {
      type: Boolean,
      default: false
    },
    preventDefault: {
      type: Boolean,
      default: true
    },
    lockout: {
      type: Object,
      default: () => {
        return {
          status: false,
          label: 'This information is not available while driving.',
          pageScroll: true,
          popupLabel: 'Not available while driving',
          showToastPopup: false
        }
      }
    }
  },
  data () {
    return {
      isEmpty: true
    }
  },
  watch: {
    'lockout.status' (val, oldVal) {
      if (val) {
        this.$scroll.disable()
      } else {
        this.$scroll.enable()
      }
      this.$emit('disabled', val)
    }
  },
  mounted: function () {
    this.makeScroll()
    if (this.lockout.status) {
      this.$scroll.disable()
    }
  },
  updated: function () {
    this.refreshScroll()
  },
  beforeDestroy: function () {
    if (this.$scroll) {
      this.$scroll.destroy()
      this.$scroll = undefined
    }
  },
  methods: {
    scrollEnd () {
      if (this.scrollKey !== undefined && this.$router) {
        spm.set(this.scrollKey + this.$router.history.current.fullPath, this.$scroll.y)
      }
      Events.$emit('list:scrollend')
    },
    scrollStart () {
      Events.$emit('list:scrollstart')
    },
    onClickLockoutMask () {
      if (window.applicationFramework && this.lockout.showToastPopup) {
        const application = window.applicationFramework.applicationManager.getOwnerApplication(window.document)
        application.requestPopup(1, '', this.lockout.popupLabel, [])
      }
    },
    makeScroll: function () {
      if (this.$slots.default === undefined || this.$slots.default.length === 0) {
        this.isEmpty = true
        return
      }
      this.isEmpty = false
      this.$scroll = new IScroll(this.$el, {
        probeType: 2,
        bounce: this.bounce,
        preventBounce: this.preventBounce,
        mouseWheel: false,
        scrollbars: this.scrollbars,
        fadeScrollbars: this.fadeScrollbars,
        interactiveScrollbars: false,
        preventDefault: this.preventDefault,
        click: true,
        disableMouse: !(!('ontouchstart' in window) && ('onmousedown' in window)),
        disableTouch: !(('ontouchstart' in window) && ('onmousedown' in window)),
        disablePointer: true,
        deceleration: 0.001,
        dummyItem: !this.hideDummyItem
      })
      this.$scroll.on('scrollEnd', this.scrollEnd)
      this.$scroll.on('scrollStart', this.scrollStart)
      var lastPos = 0
      if (this.$router) { // 팝업의 컴포넌트로 list를 생서할 시 router는 전달되지 않으므로 라우터 검사 후 라우터 사용
        lastPos = spm.get(this.scrollKey + this.$router.history.current.fullPath)
      }
      if (this.$router && this.$router.isBack === true && lastPos !== undefined) {
        this.$scroll.scrollTo(0, lastPos, 0)    // scrollTo를 사용하면 iscroll의 pages속성을 업데이트하지않아 snap이 적용된 스크롤 동작이 정상적이지 않음. 그러나 scrollview는 snap을 사용하지 않음.
      }
    },
    refreshScroll: function () {
      if (this.$scroll) {
        if (this.$slots.default === undefined || this.$slots.default.length === 0) {
          this.isEmpty = true
          return
        } else {
          this.isEmpty = false
          this.$scroll.refresh()
        }
      } else {
        this.makeScroll()
      }
    },
    onSwipeLockoutHandler (obj) {
      if (this.lockout.pageScroll) {
        const wrapperHeight = this.$scroll.wrapperHeight
        const scrollHeight = this.$scroll.scrollerHeight
        const tranformString = this.$scroll.scroller.style.transform
        let currentY = (tranformString.match(/[-]+[0-9]+/g)) ? tranformString.match(/[-]+[0-9]+/g)[0] / 1 : 0
        let newY
        if (obj.direction === 'up') {
          newY = (currentY - wrapperHeight >= -scrollHeight + wrapperHeight) ? currentY - wrapperHeight : -scrollHeight + wrapperHeight
          // newIndex = (maxPageY - currentPageY <= itemsInPage) ? maxPageY - itemsInPage : currentPageY + itemsInPage
        } else if (obj.direction === 'down') {
          newY = (currentY >= -wrapperHeight) ? 0 : currentY + wrapperHeight
          // newIndex = (currentPageY < itemsInPage) ? 0 : currentPageY - itemsInPage
        }
        if (currentY !== newY) {
          this.$scroll.enable()
          this.$scroll.scrollTo(0, newY, 200)
          this.$scroll.disable()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped >
  .obg-scroll-view{
    position:relative;
    overflow:hidden;
    color:white;
    .dummy-item{
      width:100%;
    }
    &.disabled{
      .scroll-container {
        opacity: 0.1;
        & > div {
          pointer-events: none;
        }
      }
      &:before{
        opacity: 0.1;
      }
    }
    .obg-scroll-view-lockout-mask {
      position: absolute;
      width: 123%;
      height: 122%;
      top: -100px;
      left: -150px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
    }
  }
</style>

