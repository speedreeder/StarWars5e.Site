<script lang="ts">
  import { namespace } from 'vuex-class'
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import RoutesList from '@/components/RoutesList.vue'
  import { UserType, AuthType } from '../../types/utilityTypes'

  const userModule = namespace('user')
  const authModule = namespace('auth')

  @Component({
    components: {
      RoutesList
    }
  })
  export default class MyInfoPage extends Vue {
    @userModule.State user!: UserType
    @userModule.Action fetchUser!: (userName: string) => void
    @authModule.State auth!: AuthType

    created () {
      if (this.isLoggedIn) {
        this.fetchUser(this.auth.userName)
      }
    }

    get isLoggedIn () {
      return this.auth.userName
    }

    get userData () {
      return this.user
    }
  }
</script>

<template lang="pug">
  div
    div(v-if="isLoggedIn")
      h1 Logged in as {{ userData.userName }}
      p Last logged in: {{ userData.lastLoginTimeUtc.toString() }}
      p Using service: {{ userData.mostRecentAuthType }}
      p Registered: {{ userData.registrationDateUtc.toString() }}
    div(v-if="!isLoggedIn")
      h1 Not logged in!
</template>
