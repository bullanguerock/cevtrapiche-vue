<template>
    <tr>
        <td><router-link :to="item.product.get_absolute_url">{{ item.product.name }}</router-link></td>
        <td>${{ item.product.price }}</td>
        <td>
            {{ item.quantity }}
            <a @click="decrementQuantity(item)">-</a>
            <a @click="incrementQuantity(item)">+</a>
        </td>
        <td>{{ item.product.inventory }}</td>
        <td>${{ getItemTotal(item) }}</td>
        <td><button class="delete" @click="removeFromCart(item)"></button></td>
    </tr>
</template>

<script>
import axios from 'axios'
export default {
    
    name: 'CartItem',
    props: {
        initialItem: Object
    },
    data() {
        return {
            item: this.initialItem,
            stockCounter: null
        }
    },
    methods: {
        testInterval() {
            this.stockCounter = setInterval(() => {
                this.getStock()
            }, 10000)
        },
        async getStock() {
            const url = this.item.product.get_absolute_url
            
            await axios
                .get(`/api/v1/products${url}`)
                .then(response => {
                    this.item.product.inventory = response.data.inventory 

                })
                .catch(error => {
                    return console.log(error)
                })
            
            
        },
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        decrementQuantity(item) {
            item.quantity -= 1
            if (item.quantity === 0) {
                this.$emit('removeFromCart', item)
            }
            this.updateCart()
        },
        incrementQuantity(item) {
            if (item.quantity < item.product.inventory){
                item.quantity += 1
                this.updateCart()
            }
        },
        updateCart() {
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },
        removeFromCart(item) {
            this.$emit('removeFromCart', item)
            this.updateCart()
        },
    },
    beforeMount(){
        this.testInterval()        
    },
    beforeRouteLeave (to, from, next) {
        if(this.stockCounter)
            clearInterval(this.stockCounter);
        next();
    },  
}
</script>