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
            Description: 'Standard product' // Default value
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

            <div class="button-group">
                <button type="submit" class="save-btn">Update Product</button>
                <button type="button" class="cancel-btn" @click="$router.push('/products')">Cancel</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.form-container { max-width: 500px; margin: 2rem auto; padding: 20px; background: var(--color-background-soft); border-radius: 12px; }
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
input { padding: 10px; border-radius: 6px; border: 1px solid var(--color-border); }
.save-btn { background: #3b82f6; color: white; padding: 10px; border: none; cursor: pointer; border-radius: 8px; }
.cancel-btn { background: #94a3b8; color: white; margin-left: 10px; padding: 10px; border: none; border-radius: 8px; }
</style>