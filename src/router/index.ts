import{createRouter, createWebHistory} from 'vue-router'
import About from '../views/About.vue'
import ProductComp from '../components/Product.vue'
import Products from '../views/ProductList.vue'

import ProductView from '../views/ProductView.vue'

import Favorites  from '../views/Favorites.vue'

const routes =[

  { path:'/', name: 'Products', component: Products , sensitive: true, 
    props: (route:any)  => ({ criteria: { name: null, price: {max: 100} } }) 
  },
  { path:'/favorites', name:'Favorites', component: Favorites },
  { path:'/about', name:'About', component: About },
  { path:'/products/search', name: 'ProductsSearch', component: Products , sensitive: true,
      props: (route:any) => ({ criteria: { name: route.query.name, price: {max:route.query.maxPrice} }      }) 
  },
  { path:'/products/', name: 'Products', component: Products , sensitive: true,
      props: (route:any) => ({ criteria: { name: null, price: {max: 100} }      }) 
  },
  { path:'/products/:id+', name: 'ProductView', component: ProductView , sensitive: true, props: true},
  { path:'/aproducts/:id+', name: 'Product', component: ProductComp , sensitive: true, props: true}
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes 
});
export default router;
