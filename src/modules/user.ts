import axios from 'axios'
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { UserType } from '@/types/utilityTypes'

@Module({ namespaced: true, name: 'user' })
export default class Users extends VuexModule {
  user: UserType = {
    userName: '',
    mostRecentAuthType: '',
    lastLoginTimeUtc: new Date(),
    registrationDateUtc: new Date()
  }

  @MutationAction({ mutate: ['user'] })
  async fetchUser (userName: string) {
    const results = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/User/${userName}`)
    return {
      user: results.data
    }
  }
}
