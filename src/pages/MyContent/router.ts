import PageNester from '@/components/PageNester.vue'
import MyContentPage from './MyContentPage.vue'
import MyInfoPage from './MyInfoPage.vue'
import Characters from './Characters.vue'
import { Route } from 'vue-router'

export default {
  path: '/myContent',
  component: PageNester,
  children: [
    {
      path: '/myContent',
      component: MyContentPage,
      meta: {
        title: 'My Content'
      }
    },
    {
      path: '/myContent/characters',
      component: Characters,
      props: ({ query }: Route) => query,
      meta: {
        title: 'Characters'
      }
    },
    {
      path: '/myContent/myInfo',
      component: MyInfoPage,
      meta: {
        title: 'My Info'
      }
    }
  ]
}
