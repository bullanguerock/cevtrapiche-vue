<template>
<div class="lpslider">
  <Carousel :settings="settings" :breakpoints="breakpoints" :wrapAround="true">
    <Slide v-for="product in items" :key="product">
      <div class="carousel__item">
        <ProductBox 
          v-bind:key="product.id"
          v-bind:product="product" />
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

import ProductBox from '@/components/ProductBox'

export default defineComponent({
  name: 'Products',
  props: {
    items: Object
  },
  components: {
    Carousel,
    Slide,
    Navigation,
    ProductBox,
  },
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 2,
      snapAlign: 'center',
      autoplay: "4000",
      pauseAutoplayOnHover: false,
      transition: 2000,
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 2,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 3,
        snapAlign: 'start',
      },
    },
  }),
});
</script>
<style scoped>
.carousel__prev,
.carousel__next {
    background-color: #0a0a0a;
    box-sizing: content-box;
    border: 3px solid white; opacity: 100%;
}

</style>
