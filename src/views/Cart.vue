<template>
    <div class="page-cart">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Cart</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="cartTotalLength">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Stock</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <CartItem
                            v-for="item in cart.items"
                            v-bind:key="item.product.id"
                            v-bind:initialItem="item"
                            v-on:removeFromCart="removeFromCart" />
                    </tbody>
                </table>

                <p v-else>You don't have any products in your cart...</p>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Summary</h2>

                <strong>${{ cartTotalPrice }}</strong>, {{ cartTotalLength }} items

                <hr>

                <router-link to="/cart/checkout" class="button is-dark">Checkout</router-link>
                <br>

                <router-link to="/cart" class="button is-dark" @click="inventoryReservation">Test inventory</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CartItem from '@/components/CartItem.vue'
export default {
    name: 'Cart',
    components: {
        CartItem
    },
    data() {
        return {
            cart: {
                items: [],
            }
        }
    },
    mounted() {
        this.cart = this.$store.state.cart
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        },
        inventoryReservation(){
            this.$store.commit('setIsLoading', true)

            let ite = this.cart.items
            
            /* Por cada item checkea y reserva inventario */    
            for (let [key, value] of Object.entries(ite)){

                let url = value.product.get_absolute_url
                
                /* checkeo de inventario*/
                let inven = 0
                axios
                .get(`/api/v1/products${url}`)
                .then(response => {
                    inven = response.data.inventory

                    /* reserva inventario */
                    let inventoryNew = null
                    if (value.quantity <= inven){
                        /* calculeishon */
                        inventoryNew = inven - value.quantity

                        const data = {
                            "id": value.product.id,
                            "name": value.product.name,
                            "inventory": inventoryNew
                        }

                    
                        axios
                        .put(`/api/v1/product/update/${value.product.id}/`, data)
                        .then(response => {
                            console.log(response.data)                          
                        })
                        .catch(error => {
                            
                            console.log(error) 
                        })

                    } else {
                        console.log('No hay suficiente stock')
                    }                   
  

                })
                .catch(error => {
                    console.log(error)
                })
                
                this.$store.commit('setIsLoading', false)
            }
        }       
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
    }
}
</script>