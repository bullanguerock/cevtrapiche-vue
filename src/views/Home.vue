<template>
  <!-- HERO -->
  <section class="hero is-black is-fullheight">
    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
          Se vienen cositas
        </p>
        <p class="subtitle">
          *.*
        </p>
      </div>
    </div>    
    
  </section>
    
  <div class="home">  
    <div class="columns is-multiline is-centered">
      <div class="column is-12">
          <h2 class="is-size-5 has-text-centered">Hot</h2>
      </div>

        <ProductBox 
          v-for="product in latestProducts"
          v-bind:key="product.id"
          v-bind:product="product" />
      
      <div class="column is-12">
          <h2 class="is-size-5 has-text-centered">Promociones</h2>
      </div>

        <ProductBox 
          v-for="product in latestProducts"
          v-bind:key="product.id"
          v-bind:product="product" />
      
      <div class="column is-12">
          <h2 class="is-size-5 has-text-centered">Recien llegados</h2>
      </div>

        <ProductBox 
          v-for="product in latestProducts"
          v-bind:key="product.id"
          v-bind:product="product" />

    
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import ProductBox from '@/components/ProductBox'

export default {
  name: 'Home',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    ProductBox
  },
  mounted() {
    this.getLatestProducts()
    document.title = 'Home | Cervezas Artesanales'
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)
      
      await axios
        .get('/api/v1/latest-products/')
        .then(response => {
          this.latestProducts = response.data
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  padding: 0px;
}
</style>
