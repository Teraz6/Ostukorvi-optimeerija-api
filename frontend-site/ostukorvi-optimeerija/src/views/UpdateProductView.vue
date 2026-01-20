<script>
export default {
    name: "UpdateProductView",
    props: {
        //in router props must be set to 'true'
        seekID: {
        type: String,
        required: true
        }
    },
    data() {
        return {
        product: {
            Name: '',
            Price: 0,
            Category: '',
            Description: '',
            ImageUrl: ''
        }
        }
    },
    async created() {
        try {
            const response = await fetch(`http://localhost:8080/products/${this.seekID}`);
            this.product = await response.json();
        } 
        catch (error) {
            console.error("Error fetching product details:", error);
        }
    },
    methods: {
        async updateProduct() {
            try {
                const response = await fetch(`http://localhost:8080/products/${this.seekID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.product)
                });

                if (response.ok) {
                alert("Product updated successfully!");
                this.$router.push('/products'); // Redirect back to list
                } else {
                alert("Error updating product");
                }
            } catch (error) {
                console.error("Connection error:", error);
            }
        }
    },
}
</script>

<template>
    <div class="form-container">
        <h1>Add New Product</h1>
        <form @submit.prevent="updateProduct">
            <div class="form-group">
                <label>Product Name</label>
                <input v-model="product.Name" type="text" required>
            </div>

            <div class="form-group">
                <label>Price €</label>
                <input v-model="product.Price" type="number" step="0.01" required>
            </div>

            <div class="form-group">
                <label>Category</label>
                <input v-model="product.Category" type="text" required>
            </div>

            <div class="form-group">
                <label>Description</label>
                <input v-model="product.Description" type="text">
            </div>

            <div class="form-group">
                <label>Image url</label>
                <input v-model="product.ImageUrl" type="text">
            </div>

            <div v-if="product.ImageUrl" class="image-preview">
              <p>Preview</p>
              <img :src="product.ImageUrl" alt="Product Preview" class="preview-img">
            </div>

            <div class="btn-group">
                <button type="submit" class="save-btn">Update Product</button>
                <button type="button" class="cancel-btn" @click="$router.push('/products')">Cancel</button>
            </div>
        </form>
    </div>
</template>