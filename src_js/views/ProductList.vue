<template>
  <div class="product-list-view">
    <h5 class="mt-3 mb-3">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="currentColor" 
        class="bi bi-search" 
        viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
      <u class="p-2">Search Products</u>
    </h5>
  </div>
  <div class="search-widget-container">
    <SearchProductWidget 
      :productNames="productNames" 
      :searchQ="searchQ" 
      @zcriteria="setSearchQuery"
    />
  </div>
  <div>
    <h5 class="mb-4 mt-4 h-title title-animated">Results</h5>
    <div class="row items">
      <div  
        class="col-3 col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 pb-4" 
        v-for="product in products" 
      >
        <Product  
          :propProduct="product" 
          :details="false"
        />

      </div>
    </div>
  </div>
</template>



<style scoped>

.search-widget-container {
  border-bottom:1px solid gray;
  padding: 20px;
  margin-bottom: 20px;
}

</style>



<script>

import SearchProductWidget from '../components/SearchProductWidget.vue' 
import Product from '../components/Product.vue'
import { useFetch } from '../common/fetchProducts.js'

export default {

  name: 'Products',
  components: {
    Product,
    SearchProductWidget
  },
  props: {
    criteria: {}
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
      },
      productNames: []
    }
  },
  watch: {
    /* watch prop for url change using the same component */
    criteria(newCriteria, oldCriteria) { 
      this.synchPropData();
      this.fetchProducts();
    }
  },
  mounted(){
    let that = this;
    /* fetch all and extract names for dropdown options */
    this.productNames = [];
    useFetch(import.meta.env.BASE_URL + '_data.json', {id:null, name:null, price:{min:1,max: 100}}, function(z){               
        z.forEach((item) => {
        that.productNames.push({name: item.name}); 
      });          
    });
    this.synchPropData();
    this.fetchProducts();
  },
  methods:{    

    synchPropData(){
      this.searchQ.name = this.criteria.name; 
      this.searchQ.price.max = this.criteria.price.max;   
    },

    setAutocompleteOptions(){
      let that = this;
      this.productNames = [];
      this.products.forEach((item) => {
        that.productNames.push({name: item.name});
      });        
    },

    setSearchQuery(v){ 
      this.searchQ.name = v.name;
      this.searchQ.price.max = v.price.max;
      this.searchQ.price.min = v.price.min;
      this.fetchProducts();
    },

    fetchProducts(){ 
      let that = this;     
      let { data, error } = useFetch(import.meta.env.BASE_URL + '_data.json', that.searchQ, function(z){   
        
        let timeOut = 0;
        that.products.forEach((item) => {
          let fade = true;
          z.forEach((zitem) => {
            /* item exists in both new and old results */
            if (item.id === zitem.id) {
              fade = false;
            }
          }); 
          if (fade===true){
            timeOut = 1000;
          }    
          item.comeout = true;     
        });   

        setTimeout(function(){  that.products = z;   }, timeOut);  //that.products = z;        
      });
    }
    
  }
}

</script>