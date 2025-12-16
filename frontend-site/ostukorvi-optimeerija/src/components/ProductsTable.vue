<script>
    export default {
        name: "ProductsTable",
        props: {
            items: Array
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
    <RouterLink to="/add-product" class="view-btn">
        Add Product
    </RouterLink>
    <div class="table-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th class="text-right">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.ProductID">
                    <td class="id-column">{{ item.ProductID }}</td>
                    <td class="name-column">{{ item.Name }}</td>
                    <td class="text-right">
                        <RouterLink 
                            :to="'/product/' + item.ProductID" 
                            class="view-btn">
                            View Details
                        </RouterLink>
                        <button @click="deleteProduct(item.ProductID)" class="delete-btn">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    overflow: hidden; /* Clips corners of the table to match container */
    margin: 2rem 0;
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Header Styling */
thead {
    background-color: #f8fafc;
}

th {
    padding: 16px 24px;
    text-align: left;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text);
    font-weight: 700;
    border-bottom: 2px solid #edf2f7;
}

/* Row Styling */
td {
    padding: 16px 24px;
    vertical-align: middle;
    color: var(--color-text);
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.95rem;
}

tr:last-child td {
    border-bottom: none;
}

tr:hover {
    background-color: #f1f5f9;
    transition: background-color 0.2s ease;
}

/* Specific Column Styling */
.id-column {
    font-family: monospace;
    color: var(--color-text);
}

.name-column {
    font-weight: 500;
    color: var(--color-text);
}

.text-right {
    text-align: right;
}

/* Modern Button Styling */
.view-btn {
    display: inline-block;
    padding: 8px 16px;
    background-color: #3b82f6;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s ease;
}

.view-btn:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);
}

.view-btn:active {
    transform: translateY(0);
}

/* New Modern Delete Button Style */
.delete-btn {
    padding: 8px 16px;
    background-color: #ef4444;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.1s, background-color 0.2s;
}

.delete-btn:hover {
    background-color: #dc2626;
    transform: translateY(-1px);
}

.delete-btn:active {
    transform: translateY(0);
}
</style>