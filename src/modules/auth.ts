import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { AuthType } from '@/types/utilityTypes'

@Module({ namespaced: true, name: 'auth' })
export default class Auth extends VuexModule {
  auth: AuthType = {
    userName: '',
    accessTokenExpiration: 0,
    accessTokenExpirationDate: new Date()
  }

  @MutationAction({ mutate: ['auth'] })
  async storeAuth (auth: AuthType) {
    let t = new Date()
    t.setSeconds(t.getSeconds() + auth.accessTokenExpiration)
    return {
      auth: {
        ...auth,
        accessTokenExpirationDate: t
      }
    }
  }

  @MutationAction({ mutate: ['auth'] })
  async clearAuth () {
    return {
      auth: {}
    }
  }
}
