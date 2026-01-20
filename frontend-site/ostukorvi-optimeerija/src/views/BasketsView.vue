<script>
    import BasketsTable from '@/components/BasketsTable.vue'
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
            try {
                const response = await fetch('http://localhost:8080/baskets', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    this.allBaskets = await response.json();
                } else if (response.status === 401) {
                    this.$router.push('/login');
                }
            } catch (error) {
                console.error("Failed to fetch baskets:", error);
            }
        }
    }
</script>

<template>
    <main>
        <BasketsTable :items="allBaskets" @basket-deleted="id => allBaskets = allBaskets.filter(b => b.BasketID !== id)"/>
    </main>
</template>