<template>
  <div
    class='vca-flicking-item'
    :class='{disable: disable}'
    @click="handleClick"
    @mousedown='down'
    @mouseup='up'
    @touchstart='down'
    @touchend='up'
    @touchcancel='up'
    @mouseleave='up'
    @mousecancel='up'
    @mousemove='move'
    @touchmove='move'
  >
    <slot></slot>
  </div>
</template>

<script>
/**
 * vca-flicking-item
 * @description UiComponent/flicking
 * @param {boolean} [disable=false]
 * @param {boolean} [clickPropagation=true]
 * @example
 * <vca-flicking-item>hello</vca-flicking-item>
 */
var vertiThreshold = 140
var horiThreshold = 40
export default {
  name: 'vca-flicking-item',
  vertiThreshold: vertiThreshold, // static varliable to make scroll
  horiThreshold: horiThreshold, // static varliable to make scroll
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    clickPropagation: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    down (e) {
      e = e.touches ? e.touches[0] : e
      this.$el.classList.add('active')
      this.clickDownPoint = {
        x: e.clientX,
        y: e.clientY
      }
    },
    up (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      this.$el.classList.remove('active')
    },
    move (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      if (this.clickDownPoint) {
        var deltaX = Math.abs(e.clientX - this.clickDownPoint.x)
        var deltaY = Math.abs(e.clientY - this.clickDownPoint.y)

        if (deltaX > horiThreshold || deltaY > vertiThreshold) {
          this.$el.classList.remove('active')
        }
      }
    },
    handleClick (e) {
      this.clickDownPoint = undefined

      this.$emit('click', e)
      var comps = this.$el.querySelectorAll('input, select, button')
      if (comps.length === 1 && this.clickPropagation === true) {
        for (var i = 0; i < comps.length; i++) {
          var ev = document.createEvent('MouseEvents')
          var target = comps[i]
          ev.initMouseEvent('click', false, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null)
          ev._constructed = true
          target.dispatchEvent(ev)
        }
      }
    }
  }
}
</script>

<style lang="scss">
/*
@import '../../styles/common/colors.variables';
*/
</style>

