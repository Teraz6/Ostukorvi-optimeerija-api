<script>
    // import ProductDetailsTable from '../components/ProductDetailsTable.vue'
    export default {
    name: "SingleProductView",
    props: {
        // This comes from your router (ensure 'props: true' is set in your router config)
        seekID: {
        type: String,
        required: true
        }
    },
    data() {
        return {
        thisProduct: {
            ProductID: "",
            Name: "",
            Category: "",
            Price: 0,
            Description: ""
        }
        }
    },
    async created() {
    try {
        // Added 'this.' to seekID and added .json()
        const response = await fetch(`http://localhost:8080/products/${this.seekID}`);
        this.thisProduct = await response.json();
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}
    }
</script>
<template>
    <table class="table table-striped">
        <tbody>
            <tr>
                <td>Product ID</td>
                <td>{{ thisProduct.ProductID }}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{{ thisProduct.Name }}</td>
            </tr>
            <tr>
                <td>Category</td>
                <td>{{ thisProduct.Category }}</td>
            </tr>
            <tr>
                <td>Price</td>
                <td>{{ thisProduct.Price }}</td>
            </tr>
            <tr>
                <td>Description</td>
                <td>{{ thisProduct.Description }}</td>
            </tr>
        </tbody>
    </table>
</template>