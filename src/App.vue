<template>
  <div id="_app_" class="container-fluid">
    <div id="nav" class="pb-4">
      <router-link to="/about">About</router-link>
      <router-link to="/products/">Products</router-link>
      <router-link to="/favorites">My favorites</router-link>
      <router-link to="/products/1" class="new n-1"><span>2400 DDR4 8GB</span>
      </router-link>
      <router-link to="/products/2" class="new n-2"><span>1600 DDR3 8GB</span>
      </router-link>     
      <router-link to="/products/search?name=DDR5 32GB&maxPrice=80" class="new n-2"><span>DDR5</span></router-link>
    </div>
    <div class="note">
      <div>*Product photos are placeholders</div>
      <div>*Product names,prices and data are dummies</div>
    </div>
    <router-view />
  </div>
</template>



<script>

export default {
  name: 'App',
  components: {},
  mounted() {
    this.$router.push({ path: '/products/' });
  },
  methods: {}
};
</script>

