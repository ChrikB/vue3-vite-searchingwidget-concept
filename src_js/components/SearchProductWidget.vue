<template>
  <form style="max-width: 300px;margin:auto;">
    <Autocomplete 
       :nameOptions="productNames" 
       :selected="{value:search.name}" 
       @getSelected="updateParentProp" 
       ref="selected" 
    />
    <div class="mb-3 position-relative">
      <label for="productMaxPrice" class="form-label">Max Price</label>
      <input 
        type="range"  
        @change="updateParentProp"   
        v-model="search.price.max" 
        class="form-range" 
        min="1" 
        max="100" 
        step="1" 
        id="productMaxPrice"
        ref="pricefield" 
      >
      <span 
        class="max-price-pointer" 
        :style="{ left: pointerLeft + 'px' }"
      >{{search.price.max+"$"}}</span>
    </div>
    <div 
      class="note note-search-1 pt-3" 
      :class="{'visible':isPriceFilterMax}" 
      av-if="isPriceFilterMax"
    >You may hide results if price is not at max</div>
  </form>
</template>

<style scoped>
  .max-price-pointer{  
    position: absolute;
    top: 90%;
    width: 50px;
    background: #1c467a;
    border-radius: 5px;
    color: wheat;
  }
  .note.note-search-1{
    visibility: hidden;
  }
</style>

<script>
 import Autocomplete from './Autocomplete.vue';

 export default {
  name: 'SearchProductWidget',
  props: ['productNames', 'searchQ'],
  components: {
    Autocomplete
  },
  data(){
     return {
       search: {
         id: null,
         name: '',
         price: {
           min: 1,
           max: 100
         }  
       },
       pointerLeft: 200,
       isPriceFilterMax: true
     }
  },
  watch: {
    searchQ: {
      handler(newValue, oldValue) {
        this.search.name = this.searchQ.name;
        this.search.price.max = this.searchQ.price.max;
        this.setPointerPosition();
      },
      deep: true
    }   
  },
  created(){ 
  },
  
  mounted(){
    if(this.searchQ){ 
      this.search.name = this.searchQ.name;
      this.search.price.max = this.searchQ.price.max;
    }
    this.setPointerPosition();  
  },

  updated(){
    this.setPointerPosition();
     if (  this.$refs && this.$refs.pricefield ){
        this.isPriceFilterMax = parseInt(this.$refs.pricefield.getAttribute('max'),10) > this.search.price.max;
     }
  },
  methods:{
    setPointerPosition(){
      let rangeEl = document.getElementById('productMaxPrice');
      let uiWidth = parseInt(rangeEl.offsetWidth, 10);
      let d = uiWidth/parseInt(rangeEl.getAttribute('max'));
      this.pointerLeft = (this.search.price.max*d)-25;  
    },   
    updateParentProp(){  
      this.search.name = this.$refs.selected.selectedOption; 
      this.$emit('zcriteria', this.search);
    }
  }
 }

</script>