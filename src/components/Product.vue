<template>
  <div class="item-container" >
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error d-none">{{ error }}</div>

    <div 
      class="item-data-container row g-0 apb-0"
      v-if="product&&product.id"  
      :class="{'comeout': product.comeout}"
    >
      <div 
        class="col product-thumb-cont"   
        @click="$router.push('/products/'+ product!.id)"   
      >

        <div class="position-relative" >

          <svg 
            xmlns="http://www.w3.org/2000/svg"  
            width="19" 
            height="19" 
            fill="currentColor" 
            class="bi bi-chat-left-heart-fill" 
            viewBox="0 0 16 16" 
            @click.stop="addFavorite"
            :class="{'loved': isFavorite()}"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
          </svg>
          <div class="d-none">{{ product.id }}</div>
          <img 
            class="w-100"
            v-bind:src="getPath(product.src)" 
            _src="../assets/ram-g9f64d818c_1280.jpg"
          >
          <div class="item-name position-absolute">{{ product.name }}</div>
          <div class="d-none">{{ product.name }}</div>
        </div>

        <div class="item-price mt-2 mb-2">{{ product.price }}<b>$</b></div>

      </div> 
      <div 
        class="product-details no-editable col" 
        v-if="details"
      >
        <div class="item-price amt-2 amb-2 text-end">{{ product.price }}<b> $</b></div>
        <form class="d-none">
          <div class="mb-3   g-1 row align-items-center item-id-div d-none">
            <div class="col">
              <label 
                for="inputProductId" 
                class="col-form-label px-2"
              >Id</label>
            </div>
            <div class="col">
              <input 
                type="text" 
                :value="product.id" 
                class="form-control" 
                id="inputProductId" disabled
              >
            </div>
          </div>
          <div class="mb-3  g-1 row align-items-center"> 
            <div class="col">
              <label 
                for="inputProductDateRelease" 
                class="col-form-label  px-2"
              >Name</label>
            </div>
            <div class="col">
              <input type="text" 
                :value="product.name" 
                class="form-control" 
                id="inputProductDateRelease" disabled
              >
            </div>
          </div>
          <div class="mb-3 g-1 row align-items-center"> 
            <div class="col">
              <label 
                for="inputProductDateRelease" 
                class="col-form-label  px-2"
              >Released</label>
            </div>
            <div class="col">
              <input 
                type="text" 
                :value="product.releaseDate"  
                class="form-control" 
                id="inputProductDateRelease" disabled
              >
            </div>
          </div>
        </form>

        <div class="table-responsive product-details-table ps-md-3 ps-lg-3"> 
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{{product.name}}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{{product.releaseDate}}</td>
              </tr>
              <tr>
                <th>Frequency</th>
                <td>{{product.clock}}</td>
              </tr>
            </tbody>
          </table>
        </div>


      </div>
    </div>
  </div>
</template>



<script  lang="ts">
  import  type {ProductName, Criteria, Product} from './../interfaces';
  import { defineComponent } from 'vue';

  import { useFetch } from '../common/fetchProducts.js'  


  declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
      myFavorites: Product[]
    }
  }




  export default defineComponent({

    name: 'ProductProp',
    props: {
      propProduct: {
        type: Object
      },
      id: {
        type: [Number, String] 
      },
      details: {
        type: Boolean
      }
    },
    data() { 
      return {
        loading: false,
        product: null as  Product|null,
        error: null,
      //  details: false,
        fetched: false,
        currentPathId: null as  string|null|boolean
      }
    },
    watch: {
      propProduct: {
        handler(newQuestion) {   
          this.init(); 
        },
        immediate: true
      }
    },
    created() { 
      // watch the params of the route to fetch the data again
      let that = this;
      this.$watch(
        () => this.$route.params,
        () => {    
          let idd: string|boolean = this.$route.params.id?this.$route.params.id[0]:false;
          if (this.currentPathId!= idd){
            this.currentPathId = idd;
            this.fetched = false;
          }
          this.fetchData( idd ) ; 
        },
        { immediate: true }
      );
  
    },
    methods: {
      isValidHttpUrl(str: string) {
        let url;
        try {
         url = new URL(str);
        } catch (_) {
          return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
      },


      getPath(x: string){ 
        /* means that img path is http */
        if ( this.isValidHttpUrl(x) ) {
          return x;
        }

        return new URL( import.meta.env.BASE_URL + x, import.meta.url).href;
      },


      isFavorite(){ 
        if (!this.product||!this.product.id) {
          return false;
        }
        let chek = this.myFavorites.find( (c: Product) => c.id === this.product!.id);
        if (chek === undefined) {
          return false;
        }
        return true;
      },

      addFavorite(){

        if (this.product&&this.product.id){ 
          let chek = this.myFavorites.find( (c: Product) => c.id === this.product!.id);
          if (chek === undefined) {
              this.myFavorites.push({...this.product});
          }else {
              this.myFavorites.splice(this.myFavorites.findIndex( (item: Product) => item.id === this.product!.id), 1);          
          }
        }
        this.$forceUpdate(); 
        this.$emit('updateFavorite', {x:'tes'} );
      },


      init() { 
          if (this.propProduct) {
            let p = this.propProduct;
            this['product'] = p as Product;
          }else {
            this['product'] = null;
          }
      },

      fetchData(forceId :string|boolean) { 
        let THAT = this;
        /* no need to fetch if item data pass directly from props */ 
        if (   (this.id && !this.product) || (this.id && this.product && this.product.id != this.id) 
          || (forceId && this.product && this.product.id == this.id && !this.fetched)
        ){ 
          this.fetched = false;
          this.loading = true;

          let idz;
          if(!THAT.id) {
            idz = "1";
          }else{
            idz = THAT.id.toString();
          }
          let idToGet = (forceId&&THAT.id!=forceId)?forceId:parseInt(  idz, 10);
          if (forceId && THAT.id && this.product && this.product.id == this.id) {
              idToGet = parseInt(forceId.toString() ,10);
          } else {
              idToGet = parseInt(idz, 10);
          }
        

          let { data, error } = useFetch(import.meta.env.BASE_URL + '_data.json', { id: idToGet}, function(z : Array<Product>){        
              THAT.product = z[0];  
              THAT.loading = false;       
              THAT.fetched = true;
          });
        
        }

      }



    }


  });



</script>





<style scoped>

.product-details-table td,
.product-details-table th{
  padding-top: 0;
  padding-bottom: 0;
  white-space: nowrap;
  text-align: left;
}

.post .item-container img{
  min-width: 200px!important; 
}


.product-thumb-cont{
  cursor:pointer;
  padding-left: 5px;/*test */
  padding-right: 5px;/*test */
  padding-top: 5px;/*test */
}
.item-data-container .bi-chat-left-heart-fill{
  position:absolute;
  fill: red; fill:green;
  cursor:pointer;
}
.item-data-container .bi-chat-left-heart-fill.loved,
.item-data-container .bi-chat-left-heart-fill:hover{
    fill:green;fill: red;
}



/* some animation for new-appeared results */
.item-data-container .bi-chat-left-heart-fill{
  animation-name: comeinz;
  animation-duration: 6s;
  animation-delay: 10s;
  animation-iteration-count: infinite;
}

@keyframes comeinz{
  0% {}
  5%,25% {
    transform: scale(1)
  }
  15%,35% {
    transform: scale(1.3);
  }
  40% {
    transform: scale(1)
  }
}

.item-data-container .bi-chat-left-heart-fill.loved {
  animation: none;
}


.item-data-container{

  border: 1px solid rgba(0,0,0,0.2); /*test */
  border-radius: 5px;/*test */
  /*
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 5px;
  padding: 15px;
  margin: 10px;
  */
  _min-width: 200px;
}

.item-data-container a{
  text-decoration:none!important;
  padding:0;
}

.item-data-container .item-name{
  overflow:hidden;
  display:inline-block;
  left:0;
  right:0;
  margin:0 auto;
  width:100px;
 /* width: 100%;padding: 10px; bottom:20px;top:auto;*/
  top:50%;transform: translate(0%,-50%);
  color:white;
  font-size: 19px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 5px;padding:5px;
 }

.item-data-container .item-price{ 
  aheight: 20px; 
  font-size: 19px;
  color:green;
}

/*keep the form for update functionality, 
but make it look like not a form if is not editable */
.product-details form .col{
  text-align: left;
}
.product-details.no-editable form .item-id-div{
  adisplay: none;
}
.product-details.no-editable form>div{
   margin-bottom: 2px!important;
 }
.product-details.no-editable input.form-control,
.product-details.no-editable input:disabled{
  background-color: transparent;
  border-width: 0;
  padding:2px;
  margin:0;
}
</style> 