import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddBurger from '@/components/AddBurger'
import EditBurger from '@/components/EditBurger'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-burger',
      name: 'AddBurger',
      component: AddBurger
    },
    {
      path: '/edit-burger/:burger_slug',
      name: 'EditBurger',
      component: EditBurger
    }
  ]
})
