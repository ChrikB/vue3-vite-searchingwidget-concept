<template>
  <div class="post mw-30 m-auto" style="max-width:550px;">

     <Product  :id="$route.params.id[0]" :details="true"/> 
  
  </div>
  <div>
    <h5 class="mt-4 mb-4 text-center">Other Items</h5>
    <div class="row items">
      <template v-for="product in products">
        <div 
          class="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3  pb-4" 
          v-if="$route.params.id&&product.id!=parseInt($route.params.id[0],10)"
        >
          <Product 
            class="animation-none" 
            :propProduct="product" 
            :details="false"  
          />
        </div>
      </template>  
    </div>
  </div>
</template>

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

<script>
import Product from '../components/Product.vue'
import { useFetch } from '../common/fetchProducts.js'


export default {

  name: 'ProductView', 
  components: {
    Product
  },
  props: {
    criteria: {},
    id: {}
  },  
  data() {
    return {
      products: [],
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
  methods:{    

    synchPropData(){
     // this.searchQ.name = this.criteria.name; 
    //  this.searchQ.price.max = this.criteria.price.max;   
    },

    setSearchQuery(v){ return;
    //  this.searchQ = JSON.parse(JSON.stringify(v));
      this.searchQ.name = v.name;
      this.searchQ.price.max = v.price.max;
      this.searchQ.price.min = v.price.min;
      this.fetchProducts();
    },

    fetchProducts(){ 
      let that = this;
      let { data, error } = useFetch(import.meta.env.BASE_URL + '_data.json', that.searchQ, function(z){        
          that.products = z;            
      });
    }
    
  }
}
</script>