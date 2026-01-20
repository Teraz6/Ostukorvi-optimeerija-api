<script>
import { useAuth } from '@/utils/useAuth'

    export default {
        name: "ProductsTable",
        props: {
            items: Array
        },
        setup() {
        const { profile, isAdmin, checkProfile, logout } = useAuth();

        return { 
            profile, 
            isAdmin, 
            checkProfile, 
            logout 
            };
        },
        methods: {
            async deleteProduct(ProductID) {
                // Confirmation prevents accidental clicks
            if (!confirm("Are you sure you want to delete this product?")) return;
            try {
                const response = await fetch(`http://localhost:8080/products/${ProductID}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    // This 'emits' a signal to the parent (ProductView.vue) 
                    // to remove the item from the 'allProducts' array instantly.
                    this.$emit('product-deleted', ProductID);
                } else {
                    alert("Server error: Could not delete product.");
                }
            } catch (error) {
                console.error("Delete request failed:", error);
            }}
        },
    }
</script>

<template>
    <RouterLink v-if="isAdmin" to="/add-product" class="view-btn">
        Add Product
    </RouterLink>
    <div class="table-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.ProductID">
                    <td class="name-column">{{ item.Name }}</td>
                    <td class="name-column">{{ item.Category }}</td>
                    <td class="nr-column">{{ item.Price }}€</td>
                    <td class="btn-group">
                        <RouterLink 
                            :to="'/product/' + item.ProductID" 
                            class="view-btn">
                            View Details
                        </RouterLink>
                        <RouterLink v-if="isAdmin" :to="'/products/' + item.ProductID + '/update'"
                            class="view-btn">
                            Edit
                        </RouterLink>
                        <button v-if="isAdmin" @click="deleteProduct(item.ProductID)" class="delete-btn">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>