<template>
  <div class='vca-flicking'>    
    <div class='display-card-list-inner'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IScroll from '../../features/iscroll'
/**
 * vca-flicking
 * @description UiComponent/flicking
 * @param {string} [navi=carousel | number]
 * @param {boolean} [enableFocus]
 * @param {string} [focusLoopScope=page | all]
 *
 * @example
 * <vca-flicking>
 *   <vca-flicking-item>hello</vca-flicking-item>
 *   <vca-flicking-item>hello</vca-flicking-item>
 *   <vca-flicking-item>hello</vca-flicking-item>
 *   <vca-flicking-item>hello</vca-flicking-item>
 *   <vca-flicking-item>hello</vca-flicking-item>
 * </vca-flicking>
 */
export default {
  name: 'vca-flicking',
  props: {
    navi: {
      type: String,
      default: 'carousel' // carousel | number
    },
    enableFocus: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    focusLoopScope: {
      type: String,
      default: 'page',
      validator (value) {
        return ['all', 'page'].indexOf(value) > -1
      }
    }
  },
  data () {
    return {
      paddingHeight: 0,
      paddingWidth: 0
    }
  },
  mounted () {
    this.makeScroll()
  },
  updated () {
    this.makePositions()
    this.refreshScroll()
  },
  beforeDestroy () {
    if (this.$scroll) {
      this.$scroll.destroy()
      this.$scroll = undefined
    }
    this.destroyNavi()
  },
  methods: {
    makePositions () {
      var itemCountInPage = 1 // single item component
      var len = 0
      var realIdx = 0

      if (this.$slots.default) {
        len = this.$slots.default.length
      }
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight

      for (var i = 0; i < len; i++) {
        if (this.$slots.default[i].tag === undefined) {
          continue
        }
        var nowPage = Math.floor(realIdx / itemCountInPage)

        this.$slots.default[i].elm.style.width = ((this.width / this.col) - (2 * this.paddingWidth)) + 'px'
        this.$slots.default[i].elm.style.height = ((this.height / this.row) - (2 * this.paddingHeight)) + 'px'

        this.$slots.default[i].elm.style.left = (nowPage * this.width) + ((realIdx % this.col) * (this.width / this.col)) + 'px'
        this.$slots.default[i].elm.style.top = Math.floor((realIdx % itemCountInPage) / this.col) * (this.height / this.row) + 'px'
        realIdx++
      }

      // scrollers의 width를 명시적으로  늘려줄 경우, scroller의 transition 시간을 0으로 세팅하고 바꿔줘야함.
      // scroll 동작이 끝나는 시점에 transitionDuration이 0이 아닌 시간으로 설정되 있을 수 있음.
      // 그렇게 되면 이 부분에서 width를 바꿀 때 에니매이션이 적용됨. 그려면 scroll.refresh가 호출 될때 정상적인 clientWidth값이 넘어오지 않게됨.
      // list 에서는 필요없음. scroller의 width나 height를 명시적으로 설정하지 않기 때문
      this.$el.firstChild.style.transitionDuration = '0ms'
      this.$el.firstChild.style.webkitTransitionDuration = '0ms'
      this.$el.firstChild.style.width = this.width * Math.ceil((realIdx / itemCountInPage)) + 'px'
    },
    refreshScroll () {
      if (this.$scroll) {
        let beforeTotalPage = this.$scroll.pages.length
        this.$scroll.refresh()
        let afterTotalPage = this.$scroll.pages.length
        if (beforeTotalPage !== afterTotalPage) { // update when total page number is changed
          this.makePageNavi()
        }
      } else {
        this.makeScroll()
      }
    },
    makeScroll () {
      console.log('makeScroll()')
      if (this.$el.querySelectorAll('.display-card-list-inner > *').length === 0 || this.$slots.default === undefined || this.$slots.default.length === 0) {
        return
      }
      let opt = {
        probeType: 2,
        scrollY: false,
        scrollX: true,
        bounce: false,
        mouseWheel: false,
        // scrollbars: true,
        fadeScrollbars: true,
        // interactiveScrollbars: false,
        click: true,
        snap: true,
        disableMouse: !('onmousedown' in window),
        disablePointer: true,
        disableTouch: !('ontouchstart' in window)
      }
      this.makePositions()

      this.naviWrapper = this.$root.$el
      this.$scroll = new IScroll(this.$el, opt)
      this.makePageNavi()
      this.$scroll.on('scrollEnd', this.scrollEnd)
    },
    makePageNavi () {
      this.$nextTick(() => {
        const pages = this.$scroll.pages.length
        const currentPage = this.$scroll.currentPage.pageX
        this.destroyNavi()
        if (pages <= 1) {
          return
        }

        this.naviContainer = document.createElement('div')
        this.naviContainer.className = 'card-navi-container'
        if (this.navi === 'number') {
          this.numberNavi = document.createElement('div')
          this.numberNavi.classList.add('number')
          this.numberNavi.innerHTML = (currentPage + 1) + ' / ' + pages
          this.naviContainer.appendChild(this.numberNavi)
        } else if (this.navi === 'carousel') {
          this.dots = []

          for (var i = 0; i < pages; i++) {
            let dot = document.createElement('div')
            let dotContainer = document.createElement('div')
            dotContainer.className = 'dotContainer'
            dot.className = 'dot'
            if (i === currentPage) {
              dot.classList.add('sel')
            }
            dotContainer.appendChild(dot)
            this.naviContainer.appendChild(dotContainer)
            dotContainer.addEventListener('click', this.changePage, false)
            dot.idx = dotContainer.idx = i
            this.dots.push(dot)
          }
        }
        this.naviWrapper.appendChild(this.naviContainer)
      })
    },
    scrollEnd () {
      if (this.naviContainer) {
        if (this.navi === 'number') {
          const pages = this.$scroll.pages.length
          const currentPage = this.$scroll.currentPage.pageX + 1
          this.numberNavi.innerHTML = currentPage + ' / ' + pages
        } else {
          this.naviContainer.querySelector('.sel').classList.remove('sel')
          this.dots[this.$scroll.currentPage.pageX].classList.add('sel')
        }
      }
    },
    changePage (evt) {
      this.$scroll.goToPage(evt.target.idx, 0, 300)
    },
    destroyNavi () {
      if (this.naviContainer) {
        this.naviWrapper.removeChild(this.naviContainer)
        this.naviContainer = undefined
        this.numberNavi = undefined
        this.dots = []
      }
    },
    itemsPerPage () {
      return this.col * this.row
    },
    onPageLeft () {
      if (this.$focus.isFocusOn()) {
        let foundIndex = this.$scroll.currentPage.pageX
        if (foundIndex > 0) {
          this.$scroll.goToPage(foundIndex - 1, 0, 300)
          this.setFocusItemOnCurrentPage(true)
        }
      }
    },
    onPageRight () {
      if (this.$focus.isFocusOn()) {
        const lastPageIndex = this.$scroll.pages.length - 1
        let foundIndex = this.$scroll.currentPage.pageX
        if (foundIndex < lastPageIndex) {
          this.$scroll.goToPage(foundIndex + 1, 0, 300)
          this.setFocusItemOnCurrentPage(true)
        }
      }
    },
    setFocusItemOnCurrentPage (ascending = true) {
      let items = document.querySelectorAll('.vca-flicking-item')
      let foundIndex = this.$scroll.currentPage.pageX
      let isLastPage = this.$scroll.currentPage.pageX === this.$scroll.pages.length - 1
      let pageItems = !isLastPage || items.length % this.itemsPerPage() === 0 ? this.itemsPerPage() : items.length % this.itemsPerPage()
      let pageDefaultFocusItemIndex = foundIndex * this.itemsPerPage()
      if (!ascending) {
        pageDefaultFocusItemIndex += pageItems - 1
      }
      if (this.focusLoopScope === 'page') {
        let addIndex = 0
        for (let count = 0; count < pageItems; count++) {
          if (items[pageDefaultFocusItemIndex] && items[pageDefaultFocusItemIndex].classList.contains('disable')) {
            ascending ? addIndex++ : addIndex--
          } else {
            break
          }
        }
        if (pageItems === addIndex) {
          return
        }
        pageDefaultFocusItemIndex += addIndex
      }
      this.$focus.setFocusOnByElement(items[pageDefaultFocusItemIndex])
    },
    getFocusItemIndex () {
      let items = document.querySelectorAll('.vca-flicking-item')
      let index = -1
      let count = 0
      for (let item of items) {
        if (item.classList.contains('display-focus')) {
          index = count
          break
        }
        count++
      }
      return index
    }
  }
}
</script>

<style lang='scss' scoped>
@import './flicking.css';
</style>