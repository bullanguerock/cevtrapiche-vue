<template>
  <div style="width: 100%; margin: auto; background-color: #0a0a0a;">
    <Slider/>
  </div>  
    
  <div class="home" style="padding-bottom: 5%;">  
    <div class="columns is-multiline is-centered is-align-items-self-end">

      <div class="column is-12">
          <h2 class="is-size-1 has-text-centered ">Hot
          </h2>
      </div>
      
        <ProductSlider 
          v-bind:items="latestProducts"/>

      <div class="column is-12">
          <h2 class="is-size-1 has-text-centered">Promos</h2>
      </div>
      
        <ProductSlider 
          v-bind:items="latestProducts"/>
      
      <div class="column is-12">
          <h2 class="is-size-1 has-text-centered">Recien llegados</h2>
      </div>

        <ProductSlider 
          v-bind:items="latestProducts"/>

    
    </div>

      <div class="column is-12">
      <h2 class="is-size-1 has-text-centered">Cervecerias</h2>
    </div>
    <div style="width: 100%; margin: auto; padding:2% 15% 5% 15%;">
      <BrandSlider/>
    </div> 
  </div>

  
</template>

<script>
import axios from 'axios'

import ProductBox from '@/components/ProductBox'
import Slider from '@/components/Slider'
import BrandSlider from '@/components/BrandSlider'
import ProductSlider from '@/components/ProductSlider'

export default {
  name: 'Home',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    ProductBox,
    Slider,
    BrandSlider,
    ProductSlider,
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
          return response.data
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>

<style scoped>

h2 {
    color: #9c760e;
}

.home{
  background-color: rgb(224, 223, 208);
}

</style>
