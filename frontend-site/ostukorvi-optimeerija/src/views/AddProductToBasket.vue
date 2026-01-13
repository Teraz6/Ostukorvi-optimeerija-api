<script>
    import AddProductToBasketTable from '../components/AddProductToBasketTable.vue';
    export default {
        components: {
            AddProductToBasketTable
        },
        data() {
            return {
                allProducts: []
            }
        },
        async created() {
            const response = await(await fetch('http://localhost:8080/products'));
            const data = await response.json();
            this.allProducts = data.map(p=> ({...p, selectedQuantity: 1 }))
        }
    }
</script>

<template>
    <main>
        <AddProductToBasketTable :items="allProducts"/>
    </main>
</template>