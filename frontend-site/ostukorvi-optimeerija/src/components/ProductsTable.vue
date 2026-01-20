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
  <div class="actions-bar">
    <RouterLink v-if="isAdmin" to="/add-product" class="view-btn">
        Add Product
    </RouterLink>
  </div>

  <div class="product-grid">
    <div v-for="item in items" :key="item.ProductID" class="product-card">
      <div class="card-image">
        <img 
          v-if="item.ImageUrl" 
          :src="item.ImageUrl" 
          alt="Product image" 
          class="preview-img-card"
        >
        <div v-else class="no-image">No Image</div>
      </div>

      <div class="card-details">
        <h3 class="name-column">{{ item.Name }}</h3>
        <p class="category-tag">{{ item.Category }}</p>
        <p class="price-tag">{{ item.Price }}€</p>
      </div>

      <div class="card-actions">
        <RouterLink :to="'/product/' + item.ProductID" class="view-btn">
          Details
        </RouterLink>
        
        <template v-if="isAdmin">
          <RouterLink :to="'/products/' + item.ProductID + '/update'" class="edit-btn">
            Edit
          </RouterLink>
          <button @click="deleteProduct(item.ProductID)" class="delete-btn">
            Delete
          </button>
        </template>
      </div>
    </div>
  </div>
</template>