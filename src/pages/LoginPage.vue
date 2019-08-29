<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Loading from '@/components/Loading.vue'
  import axios from 'axios'
  import { AuthType } from '../types'
  import Cookies from 'js-cookie'

  const authModule = namespace('auth')

  @Component({
    components: {
      Loading
    }
  })
  export default class LoginPage extends Vue {
    @authModule.Action storeAuth!: (auth: AuthType) => void
    @authModule.Action clearAuth!: () => void
    @authModule.State auth!: AuthType

    async authenticate (provider: string) {
      try {
        var response = await Vue.prototype.$auth.authenticate(provider)
        await this.storeAuth(response.data)
      } catch (e) {
        console.log(e)
      }
    }

    get isLoggedIn () {
      return this.auth.userName
    }

    async logout () {
      try {
        await Vue.prototype.$auth.logout({
          withCredentials: true,
          method: 'GET'
        })
      } catch (error) {
        console.log(error)
      } finally {
        await this.clearAuth()
      }
    }
  }
</script>

<template lang="pug">
  div
    div(v-if="isLoggedIn")
      h1 Logged in!
      v-btn(@click="logout()") Logout
    div(v-if="!isLoggedIn")
      v-btn(@click="authenticate('google')") google
      v-btn(@click="authenticate('facebook')") facebook
      v-btn(@click="authenticate('discord')") discord
</template>
