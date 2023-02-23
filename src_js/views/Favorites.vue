<template>
  <div class="product-list-view">
    <h5 class="mt-3 mb-3"></h5>
  </div>
  <div class="arow">
    <h5>My favorites</h5>
    <h6 
      class="mt-5" 
      v-if="favoriteProducts.length===0"
    >
      You have not favorites yet.<br>Click the 'heart' icon in top-left corner of each item to add it to favorites
    </h6>
    <div class="row items">
      <div  
        class="col-3 col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3" 
        v-for="product in favoriteProducts" 
      >
        <Product  
          :propProduct="product" 
          :details="false" 
          @updateFavorite="updateFavorite"
        />
      </div>
    </div>
  </div>
</template>


<script>
import Product from '../components/Product.vue'
export default {
name: 'Favorites',
components: {
    Product
},
data(){
  let THAT = this;
  return {
    favoriteProducts: THAT.myFavorites
  }
},
methods:{
  updateFavorite(){
    this.favoriteProducts = [...this.myFavorites];
  }
}
}
</script>