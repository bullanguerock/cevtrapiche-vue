<template>
  <Carousel :pauseAutoplayOnHover="true" :transition="1000" :autoplay="5000" :wrap-around="true">
    <Slide v-for="slide in 5" :key="slide">
      <div class="carousel__item"><img src="https://kunstmanncl.vteximg.com.br/arquivos/ids/156106/vtex_dskp.png?v=637801976626130000"/></div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});
</script>

<style>
.img {
    width: 100%;
}
.carousel__item {
  height: auto;
  width: 100%;
  color:  var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 0px;
}

.carousel__prev,
.carousel__next {
    color: #0a0a0a;
    background-color: #0a0a0a00;
    box-sizing: content-box;
}

.carousel__prev{
    transform: translate(10%, 10%); 
}
.carousel__next{
    transform: translate(-10%,-10%);    
}

.carousel__pagination{
    background-color: #0a0a0a;
    padding-bottom: 1%;
}
.carousel__pagination-button {
  background-color: white;
}
.carousel__pagination-button--active {
  background-color: #ffe08a;
}
.carousel__prev--in-active,
.carousel__next--in-active {
  border: 3px solid white; opacity: 0%;
}
</style>