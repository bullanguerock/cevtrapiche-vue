<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-9">
                <figure class="image mb-6">
                    <img v-bind:src="product.get_image">
                </figure>

                <h1 class="title">{{ product.name }}</h1>

                <p>{{ product.description }}</p>
            </div>

            <div class="column is-3">
                <h2 class="subtitle">Information</h2>

                <p><strong>Price: </strong>${{ product.price }}</p>

                <p><strong>Inventory: </strong>{{ product.inventory }}</p>

                <div v-if="product.inventory">

                    <div class="field has-addons mt-6">
                        <div class="control">
                            <input type="number" class="input" min="1" v-bind:max="product.inventory" v-model="quantity">
                        </div>                        
                        
                        <div class="control">
                            <a class="button is-dark" @click="addToCart">Add to cart</a>
                        </div>

                    </div>
                </div>
                <div v-else>
                    <div class="field has-addons mt-6">
                        <div class="control">
                            <input type="number" disabled class="input" min="0" v-bind:max="product.inventory" value="0">
                        </div>                        
                        
                        <div class="control">
                            <a class="button" disabled>Add to cart</a>
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