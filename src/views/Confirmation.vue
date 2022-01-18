<template>
    <div class="page-confirmation">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Su pago esta siendo procesado.</h1>

                <p>Bip bop</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Confirmation',
    data() {
        return {
            errors: [],
            flow_token: '',
            status_order: null,
        }
    },
    created(){
        this.$store.commit('setIsLoading', true)
        this.flow_token = this.$route.query.token
        this.status_order = this.$route.query.status

    },
    mounted() {
        document.title = 'Confirmation | DBeers'       

        const stat = this.checkStatus(this.flow_token).then(results => {
            console.log(results.status_order)
            this.status_order = results.status_order
            this.redirect(this.status_order)                          
        }).catch(error => {
            console.log(error)
        })
                
               
    },
    methods: {
        redirect(stat){
            if (stat == '2')/* pagada */{
                this.$store.commit('setIsLoading', false)
                this.$store.commit('clearCart')
                return this.$router.push('/cart/success')                

            } else if (stat == '3') /* rechazada */{
                this.$store.commit('setIsLoading', false)
                return this.$router.push('/cart/fail')
                

            } else if (stat == '4') /* anulada */ {
                this.$store.commit('setIsLoading', false)
                return this.$router.push('/cart/fail')              
                                
            }
            else {
                this.$store.commit('setIsLoading', false)
                return this.$router.push('/cart')                 

            }
        },
        async checkStatus(token) {
            var results = []
            let payload = {
                'token': token,             
            };
            return await axios.post(`/api/v1/getstatus/`, payload)
                .then(response => {                    
                    
                    results = response.data
                    return results
                                        
                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again')
                    console.log(error)
                    
                })            
        }
    }
}
</script>