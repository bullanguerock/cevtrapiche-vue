<template>
    <div class="page-fail">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Algo Ha salido mal</h1>

                <p>:(</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Fail',
    mounted() {
        document.title = 'Fail | DBeers'
    },
}
</script>