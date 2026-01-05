<script>
    import BasketsTable from '../components/BasketsTable.vue'
    export default {
        components: {
            BasketsTable
        },
        data() {
            return{
                allBaskets: []
            }
        },
        async created() {
            this.allBaskets = await(await fetch('http://localhost:8080/baskets')).json()
        }
    }
</script>

<template>
    <main>
        <BasketsTable :items="allBaskets" @basket-deleted="id => allBaskets = allBaskets.filter(b => b.BasketID !== id)"/>
    </main>
</template>