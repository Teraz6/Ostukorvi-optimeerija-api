import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductsView from '../views/ProductsView.vue'
import SingleProductView from '../views/SingleProductView.vue'
import AddProductView from '../views/AddProductView.vue'
import UpdateProductView from '../views/UpdateProductView.vue'
import BasketsView from '../views/BasketsView.vue'
import AddBasketView from '../views/AddBasketView.vue'
import UpdateBasketView from '../views/UpdateBasketView.vue'
import BasketDetailsView from '../views/BasketDetailsView.vue'

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
    },
    {
      path: '/products/:seekID/update',
      name: 'update-product',
      component: UpdateProductView,
      props: true
    },
    {
      path: '/baskets',
      name: 'baskets',
      component: BasketsView,
    },
    {
      path: '/add-basket',
      name: 'add-basket',
      component: AddBasketView,
    },
    {
      path: '/baskets/:seekID/update',
      name: 'update-basket',
      component: UpdateBasketView,
      props: true
    },
    {
      path: '/basket/:seekID',
      name: 'basket-details',
      component: BasketDetailsView,
      props: true
    }
  ],
})

export default router
