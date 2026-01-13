import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductsView from '../views/ProductsView.vue'
import SingleProductView from '../views/SingleProductView.vue'
import AddProductView from '../views/AddProductView.vue'
import ProfileView from '../views/ProfileView.vue'
import AddProfileView from '../views/AddProfileView.vue'
import SingleProfileView from '../views/SingleProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/product/:seekID',
      name: 'product-details',
      component: SingleProductView,
      props: true
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: AddProductView,
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: ProfileView,
    },
    {
      path: '/add-profile',
      name: 'add-profile',
      component: AddProfileView,
    },
    {
      path: '/profile/:seekID',
      name: 'profile-details',
      component: SingleProfileView,
      props: true
    }
  ],
})

export default router