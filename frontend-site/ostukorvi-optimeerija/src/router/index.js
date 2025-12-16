import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductsView from '../views/ProductsView.vue'
import SingleProductView from '../views/SingleProductView.vue'
import AddProductView from '../views/AddProductView.vue'

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
      props: true // This allows :seekID to be passed as a prop to the component
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: AddProductView,
    }
  ],
})

export default router
