import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import SingleProductView from '../views/SingleProductView.vue'
import AddProductView from '../views/AddProductView.vue'
import UpdateProductView from '../views/UpdateProductView.vue'
import BasketsView from '../views/BasketsView.vue'
import AddBasketView from '../views/AddBasketView.vue'
import UpdateBasketView from '../views/UpdateBasketView.vue'
import BasketDetailsView from '../views/BasketDetailsView.vue'
import BasketContentView from '../views/BasketContentView.vue'
import AddProductToBasket from '../views/AddProductToBasket.vue'
import ProfileView from '../views/ProfileView.vue'
import AddProfileView from '../views/AddProfileView.vue'
import SingleProfileView from '../views/SingleProfileView.vue'
import UpdateProfileView from '../views/UpdateProfileView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    },
    {
      path: '/basket/:seekID/products',
      name: 'products-in-basket',
      component: BasketContentView,
      props: true
    },
    {
      path: '/basket/:seekID/add-products',
      name: 'add-products-to-basket',
      component: AddProductToBasket,
      props:true
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
    },
    {
      path: '/profile/:seekID/update',
      name: 'update-profile',
      component: UpdateProfileView,
      props: true
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ],
})

export default router