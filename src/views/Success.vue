<template>
    <div class="page-success">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Thank you</h1>

                <p>Tu orden fue procesada, seras redirigido en 5 segundos</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Success',
    mounted() {
        document.title = 'Success | DBeers'
    },
    created(){
        setTimeout( () => this.$router.push('/my-account'), 5000)        
    }
}
</script>