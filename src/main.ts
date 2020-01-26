import Vue from 'vue'
import Vuex from 'vuex'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './components/App.vue'
import router from './pages/router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import './registerServiceWorker'
import '@/assets/styles/global.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import vueHeadful from 'vue-headful'
import VueSessionStorage from 'vue-sessionstorage'

Vue.use(VueSessionStorage)

Vue.component('vue-headful', vueHeadful)
Vue.prototype.$titleSuffix = ' | SW5E'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? to.meta.title + Vue.prototype.$titleSuffix
    : 'SW5E'
  next()
})

axios.defaults.withCredentials = true

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://localhost:44341/'
})

axiosInstance.interceptors.response.use((response: any) => {
  return response
}, (error: any) => {
  if (error.response && 'token-expired' in error.response.headers && !error.response.isRetryRequest) {
    error.config.isRetryRequest = true
    return axiosInstance.get(`${process.env.VUE_APP_sw5eapiurl}/api/Auth/refresh`).then((response) => {
      store.dispatch('auth/storeAuth', response.data)
      return axiosInstance(error.config)
    }, error => {
      return Promise.reject(error)
    })
  }

  return Promise.reject(error)
})

Vue.prototype.$http = axiosInstance

Vue.use(VueAxios, axiosInstance)
Vue.use(VueAuthenticate, {
  // storageType: 'cookieStorage',
  withCredentials: true,
  tokenPath: 'userName',
  tokenName: 'userName',
  tokenPrefix: 'sw5e',
  baseUrl: process.env.VUE_APP_sw5eapiurl,
  logoutUrl: '/api/Auth/logout',
  providers: {
    google: {
      clientId: '644887359543-sl9f31k8jtcr9srs7k4k1oi4dnd4qpu9.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/login',
      url: '/api/ExternalAuth/google'
    },
    facebook: {
      clientId: '214659266224660',
      redirectUri: 'http://localhost:8080/login',
      url: '/api/ExternalAuth/facebook'
    },
    discord: {
      name: 'discord',
      clientId: '604454073957089301',
      redirectUri: 'http://localhost:8080/login',
      url: '/api/ExternalAuth/discord',
      authorizationEndpoint: 'https://discordapp.com/api/oauth2/authorize',
      scope: [ 'identify', 'email' ],
      scopeDelimiter: ' ',
      responseParams: {
        code: 'code'
      },
      oauthType: '2.0',
      responseType: 'code',
      defaultUrlParams: [ 'response_type', 'client_id', 'redirect_uri', 'scope' ]
    }
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
