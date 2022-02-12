<template>
    
    <div class="column" >
        <div class="box">
            <figure class="image mb-4">
                <img v-bind:src="product.get_thumbnail">
            </figure>

            <h3 class="is-size-4 has-text-centered">{{ product.name }}</h3>
            <p class="is-size-6 has-text-grey has-text-centered">${{ product.price }}</p>

            <router-link v-bind:to="product.get_absolute_url" class="button is-fullwidth is-warning mt-4">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <p class="is-hidden-touch"><b>VER PRODUCTO</b></p>
                <p class="is-hidden-desktop"><b>VER</b></p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    }
}
</script>

<style lang="scss" scoped>
img {    
    max-height: 20rem;
}
.box {
  position: relative;
  display: inline-block;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  max-height: auto;
}
.box::after {
  content: '';
  content: "";
  border-radius: 5px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
/* Scale up the box */
.box:hover {
  -webkit-transform: scale(1.01, 1.01);
  transform: scale(1.01, 1.01);
}

.box:hover::after {
    opacity: 1;
}
</style>