<script>
import { useAuth } from '@/utils/useAuth';
    export default {
    name: "SingleProductView",
    props: {
        // This comes from your router (ensure 'props: true' is set in your router config)
        seekID: {
        type: String,
        required: true
        }
    },
    setup() {
        const { isAdmin } = useAuth();

        return {
            isAdmin
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
    <div class="form-container">
        <h1>{{ thisProduct.Name }}</h1>

        <div v-if="item.ImageUrl" class="form-group">
            <img :src="thisProduct.ImageUrl" alt="Product image" class="image-preview">
        </div>

        <div class="form-group">
            <h4 class="bold">Product ID:</h4>
            <label>{{ thisProduct.ProductID }}</label>
        </div>

        <div class="form-group">
            <h4 class="bold">Product Category:</h4>
            <label>{{ thisProduct.Category }}</label>
        </div>

        <div class="form-group">
            <h4 class="">Price:</h4>
            <label>{{ thisProduct.Price }}</label>
        </div>

        <div class="form-group">
            <h4 class="bold">Description</h4>
            <label>{{ thisProduct.Description }}</label>
        </div>

        <div class="btn-group">
            <RouterLink :to="'/products'" class="back-btn">
                Back to products
            </RouterLink>
            <RouterLink v-if="isAdmin" :to="`/products/${thisProduct.ProductID}/update`" class="view-btn">
                Edit
            </RouterLink>
        </div>
    </div> 
</template>