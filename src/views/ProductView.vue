<template>
  <div class="post mw-30 m-auto" style="max-width:550px;">

    <ProductComp  
      :id="$route.params.id[0]" 
      :details="true"
    /> 
  
  </div>
  <div>
    <h5 class="mt-4 mb-4 text-center">Other Items</h5>
    <div class="row items">
      <template v-for="product in products">
        <div 
          class="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3  pb-4" 
          v-if="$route.params.id&&product.id!=parseInt($route.params.id[0],10)"
        >
          <ProductComp 
            class="animation-none" 
            :propProduct="product" 
            :details="false"  
          />
          
        </div>
      </template>  
    </div>
  </div>
</template>



<script  lang="ts">
import  type {ProductName, Criteria, Product} from './../interfaces';
import { defineComponent } from 'vue';

import ProductComp   from '../components/Product.vue'
import { useFetch } from '../common/fetchProducts.js'


export default defineComponent({
  name: 'ProductView', 
  components: {
    ProductComp
  },
  props: {
    criteria: {
      type: Object
    },
    id:  {
      type: Array
    }
  },
  data() {
    return {
      products: [] as any[],
      searchQ: {
        id: null, 
        name: null,
        price: {
          min: 1, 
          max: 100
        }
      }
    }
  },
  mounted(){
    this.synchPropData();
    this.fetchProducts();
  },
  methods: {    

    synchPropData(){},

    setSearchQuery(){},

    fetchProducts() : any { 
      let that = this;
      let { data, error } = useFetch(import.meta.env.BASE_URL + '_data.json', that.searchQ, function(z: Array<Product>){        
          that.products = z;            
      });
    }

  }

});

</script>



<style>

.post .item-data-container {
  padding: 10px;
}
.post .col.product-thumb-cont{
  padding: 0px;
}

.post .product-thumb-cont .item-price{
  display: none;
}
.post .product-thumb-cont {
  cursor: default;
}
</style>