<template>
  <div>
    <button id="btn-wwe" @click="testWakeWord"></button>
    <ul class="ui-test">
      <li v-for="(item, index) in list" :key="index" @click="onClick(item)">
        <!--<router-link v-bind:to="'/display-card/body-template-2/1'">{{ item }}</router-link>-->
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import router from '../router'
import * as samplePayload from '../views/sample/payload'

export default {
  name: 'UiTest',
  data () {
    return {
      list: [
        'BodyTemplate1',
        'BodyTemplate2',
        'ListTemplate1',
        'LocalSearchListTemplate1',
        'WeatherTemplate',
        'AlexaCommsTemplate',
        'RenderPlayerInfo',
        'AlarmComesDue',
        'TimerIsDone',
        'ReminderComesDue'
      ]
    }
  },
  methods: {
    // TEST: vr-wwe-test - Target에서 WWE를 테스트하기 위한 hidden button event
    testWakeWord () {
      this.$store.dispatch('appRequest', { cmd: 'vr-wwe-test' })
    },
    onClick (item) {
      const dummyData = {
        cmd: 'render-template',
        param: {
          uiComponentProps: {
            uiViewToken: 'UI_VIEW_TOKEN',
            payload: {}
          }
        }
      }
      switch (item) {
        /* case 'AlarmComesDue':
          dummyData.param.uiComponentProps.payload = samplePayload.AlarmComesDue
          break
        case 'BodyTemplate1':
          dummyData.param.uiComponentProps.payload = samplePayload.BodyTemplate1
          break */
        case 'BodyTemplate2':
          dummyData.param.uiComponentProps.payload = samplePayload.BodyTemplate2
          break
        /* case 'ListTemplate1':
          dummyData.param.uiComponentProps.payload = samplePayload.ListTemplate1
          break
        case 'LocalSearchListTemplate1':
          dummyData.param.uiComponentProps.payload = samplePayload.LocalSearchListTemplate1
          break
        case 'WeatherTemplate':
          dummyData.param.uiComponentProps.payload = samplePayload.WeatherTemplate
          break
        case 'AlexaCommsTemplate':
          dummyData.param.uiComponentProps.payload = samplePayload.AlexaCommsTemplate
          break
        case 'RenderPlayerInfo':
          dummyData.param.uiComponentProps.payload = samplePayload.RenderPlayerInfo
          break
        case 'TimerIsDone':
          dummyData.param.uiComponentProps.payload = samplePayload.TimerIsDone
          break
        case 'ReminderComesDue':
          dummyData.param.uiComponentProps.payload = samplePayload.ReminderComesDue
          break */
        default:
          break
      }
      // this.$store.dispatch('onVpaNotify', dummyData, { root: true })
      console.log(dummyData)
      router.push({
        name: dummyData.param.uiComponentProps.payload.type,
        params: {
          uiViewToken: dummyData.param.uiComponentProps.uiViewToken,
          payload: dummyData.param.uiComponentProps.payload
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-test {
  position: absolute;
  z-index: 10;
  color: white;
}
#btn-wwe {
  position: absolute;
  width: 60px;
  height: 60px;
  // background-color: blue;
  bottom: 0px;
  z-index: 10;
}
</style>
