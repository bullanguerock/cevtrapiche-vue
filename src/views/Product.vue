<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column">
                <figure class="image mb-6">
                    <img v-bind:src="product.get_image">
                </figure>
            </div>

            <div class="column">
                <div class="p-info has-text-centered">
                
                    <h1 class="title" style="color: #9c760e;">{{ product.name }}</h1>
                    <p>{{ product.description }}</p>

                    <p><strong>Precio </strong> ${{ product.price }}</p>

                    <p><strong>Inventario </strong>{{ product.inventory }}</p>

                    <div v-if="product.inventory">
                        <div class="field has-addons mt-6">
                            <div class="control">
                                <input type="number" class="input is-medium" min="1" v-bind:max="product.inventory" v-model="quantity">
                            </div>                        
                            
                            <div class="control">
                                <a class="button is-dark" @click="addToCart"><span class="icon" style="margin-right: .5rem;"><i class="fas fa-shopping-cart"></i></span> Agregar al carro</a>
                            </div>

                        </div>
                    </div>
                    <div v-else>
                        <div class="field has-addons mt-6">
                            <div class="control">
                                <input type="number" disabled class="input is-medium" min="0" v-bind:max="product.inventory" value="0">
                            </div>                        
                            
                            <div class="control">
                                <a class="button" disabled>Add to cart</a>
                            </div>

                        </div>
                    </div>

                </div>

                


            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'


export default {
    name: 'Product',
    data() {
        return {
            product: {},
            quantity: 1,
            stock: false,
        }
    },
    mounted() {
        this.getProduct()
    },
    methods: {
        async getProduct() {
            this.$store.commit('setIsLoading', true)

            const category_slug = this.$route.params.category_slug
            const product_slug = this.$route.params.product_slug
            
            await axios
                .get(`/api/v1/products/${category_slug}/${product_slug}`)
                .then(response => {
                    this.product = response.data

                    document.title = this.product.name + ' | Dbeers'
                })
                .catch(error => {
                    console.log(error)
                })
                
            this.$store.commit('setIsLoading', false)
        },
        addToCart() {
            console.log(this.product.inventory)
            if (this.product.inventory >= this.quantity){
                if (isNaN(this.quantity) || this.quantity < 1) {
                    this.quantity = 1
                }

                const item = {
                    product: this.product,
                    quantity: this.quantity
                }

                this.$store.commit('addToCart', item)

                this.product.inventory = this.product.inventory - this.quantity

                toast({
                    message: 'The product was added to the cart',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
            }
            else {
                toast({
                    message: 'No hay stock suficiente',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })

            }
        }
    },
}
</script>
<style scoped>
img {
    position: relative;
    margin: auto;
    padding: 1rem;
    max-height: 50vh;
    width: auto;
}
.column {
    justify-content: center;
    align-self: center;
    align-items: center;
}
.p-info{
    position: relative;
    max-height: auto;
    margin: 1rem;
    padding: 1rem;
    
}
.p-info {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.p-info::after {
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
.p-info:hover {
  -webkit-transform: scale(1.01, 1.01);
  transform: scale(1.01, 1.01);
}

.p-info:hover::after {
    opacity: 1;
}.field.has-addons {
    justify-content: center;
}
</style>