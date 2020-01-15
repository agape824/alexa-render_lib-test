import WelcomeCard from '../views/WelcomeCard.vue'
import UiTest from '../components/UiTest.vue'
import BodyTemplate2 from '../views/BodyTemplate2.vue'
import * as types from './route-types'

const routes = [
  {
    path: '/',
    name: 'UiTest',
    component: UiTest
  },
  {
    path: '/display-card/welcome-card',
    name: types.WELCOME_CARD,
    component: WelcomeCard
  },
  {
    path: '/display-card/body-template-2/:uiViewToken',
    name: types.BODY_TEMPLATE_2,
    component: BodyTemplate2,
    props: true
  }
  /* {
    path: '/display-card/html-template-1/:uiViewToken',
    name: types.HTML_TEMPLATE_1,
    component: () => import('../views/DisplayCard/HtmlTemplate1.vue'),
    props: true
  },
  {
    path: '/display-card/html-template-2/:uiViewToken',
    name: types.HTML_TEMPLATE_2,
    component: () => import('../views/DisplayCard/HtmlTemplate2.vue'),
    props: true
  },
  {
    path: '/display-card/html-template-3/:uiViewToken',
    name: types.HTML_TEMPLATE_3,
    component: () => import('../views/DisplayCard/HtmlTemplate3.vue'),
    props: true
  },
  {
    path: '/display-card/html-carousel-template/:uiViewToken',
    name: types.HTML_CAROUSEL_TEMPLATE,
    component: () => import('../views/DisplayCard/HtmlCarouselTemplate.vue'),
    props: true
  },
  {
    path: '/display-card/html-player-info/:uiViewToken',
    name: types.HTML_PLAYER_INFO,
    component: () => import('../views/DisplayCard/HtmlPlayerInfo.vue'),
    props: true
  },
  {
    path: '/display-card/welcome-card',
    name: types.WELCOME_CARD,
    component: WelcomeCard
  },
  {
    path: '/display-card/alexa-comms-template/:uiViewToken',
    name: types.ALEXA_COMMS_TEMPLATE,
    component: () => import('../views/DisplayCard/AlexaCommsTemplate.vue'),
    props: true
  },
  {
    path: '/display-card/body-template-1/:uiViewToken',
    name: types.BODY_TEMPLATE_1,
    component: () => import('../views/DisplayCard/BodyTemplate1.vue'),
    props: true
  },
  {
    path: '/display-card/body-template-2/:uiViewToken',
    name: types.BODY_TEMPLATE_2,
    component: () => import('../views/DisplayCard/BodyTemplate2.vue'),
    props: true
  },
  {
    path: '/display-card/list-template1/:uiViewToken',
    name: types.LIST_TEMPLATE_1,
    component: () => import('../views/DisplayCard/ListTemplate1.vue'),
    props: true
  },
  {
    path: '/display-card/local-search-list-template1/:uiViewToken',
    name: types.LOCAL_SEARCH_LIST_TEMPLATE_1,
    component: () => import('../views/DisplayCard/LocalSearchListTemplate1.vue'),
    props: true
  },
  {
    path: '/display-card/local-search-detail-template1/:uiViewToken',
    name: types.LOCAL_SEARCH_DETAIL_TEMPLATE_1,
    component: () => import('../views/DisplayCard/LocalSearchDetailTemplate1.vue'),
    props: true
  },
  {
    path: '/display-card/weather-template/:uiViewToken',
    name: types.WEATHER_TEMPLATE,
    component: () => import('../views/DisplayCard/WeatherTemplate.vue'),
    props: true
  },
  {
    path: '/display-card/render-player-info/:uiViewToken',
    name: types.RENDER_PLAYER_INFO,
    component: () => import('../views/DisplayCard/RenderPlayerInfo.vue'),
    props: true
  },
  {
    path: '/display-card/alarm-comes-due/:uiViewToken',
    name: types.ALARM_COMES_DUE,
    component: () => import('../views/DisplayCard/AlarmComesDue.vue'),
    props: true
  },
  {
    path: '/display-card/timer-is-done/:uiViewToken',
    name: types.TIMER_IS_DONE,
    component: () => import('../views/DisplayCard/TimerIsDone.vue'),
    props: true
  },
  {
    path: '/display-card/reminder-comes-due/:uiViewToken',
    name: types.REMINDER_COMES_DUE,
    component: () => import('../views/DisplayCard/ReminderComesDue.vue'),
    props: true
  },
  {
    path: '/menu',
    name: types.ALEXA_MENU,
    component: () => import('../views/AlexaMenu.vue')
  },
  {
    path: '/menu/settings',
    name: types.ALEXA_MENU_SETTINGS,
    component: () => import('../views/AlexaMenu/Settings.vue'),
    props: true
  },
  {
    path: '/menu/settings/contact-list',
    name: types.ALEXA_MENU_SETTINGS_CONTACT_LIST,
    component: () => import('../views/AlexaMenu/Settings/ContactList.vue'),
    props: true
  },
  {
    path: '/menu/settings/handsfree-listening',
    name: types.ALEXA_MENU_SETTINGS_HANDSFREE_LISTENING,
    component: () => import('../views/AlexaMenu/Settings/HandsfreeListening.vue'),
    props: true
  },
  {
    path: '/menu/settings/notifications',
    name: types.ALEXA_MENU_SETTINGS_NOTIFICATIONS,
    component: () => import('../views/AlexaMenu/Settings/Notifications.vue')
  },
  {
    path: '/menu/settings/start-request-sound',
    name: types.ALEXA_MENU_SETTINGS_START_OF_REQUEST_SOUND,
    component: () => import('../views/AlexaMenu/Settings/StartRequestSound.vue')
  },
  {
    path: '/menu/settings/end-request-sound',
    name: types.ALEXA_MENU_SETTINGS_END_OF_REQUEST_SOUND,
    component: () => import('../views/AlexaMenu/Settings/EndRequestSound.vue')
  },
  {
    path: '/menu/things-to-try',
    name: types.ALEXA_MENU_THINGS_TO_TRY,
    component: () => import('../views/AlexaMenu/ThingsToTry.vue'),
    props: true
  },
  {
    path: '/menu/things-to-try/:category',
    name: types.ALEXA_MENU_THINGS_TO_TRY_DETAIL,
    component: () => import('../views/AlexaMenu/ThingsToTryDetail.vue'),
    props: true
  },
  {
    path: '/menu/language',
    name: types.ALEXA_MENU_LANGUAGE,
    component: () => import('../views/AlexaMenu/Language.vue'),
    props: true
  } */
]

export default routes
