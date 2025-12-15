<script>
    export default {
        name: "ProductsTable",
        props: {
            items: Array
        }
    }
</script>

<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Product Name</th>
            </tr>
        </thead>
        
        <tbody>
            <tr v-for="item in items" :key="item.ProductID">
                <td>{{ item.ProductID }}</td>
                <td>{{ item.Name }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped/>