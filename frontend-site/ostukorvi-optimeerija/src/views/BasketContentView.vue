<script>
    import BasketContentTable from '../components/BasketContentTable.vue';
    export default {
        components: {
            BasketContentTable
        },
        data() {
            return{
                allProducts: []
            }
        },
    async created() {
        const BasketID = this.$route.params.seekID
        this.allProducts = await (await fetch(`http://localhost:8080/baskets/${BasketID}/products`)).json()
        }
    }
</script>

<template>
    <main>
        <BasketContentTable :items="allProducts" @product-removed="id => allProducts = allProducts.filter(p => p.ProductID !== id)" />
    </main>
</template>