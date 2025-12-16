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
    
    <table class="custom-table">
        <thead>
            <tr>
                <td colspan="2" class="text-center">
                    <RouterLink :to="'/products'" class="view-btn">
                        Back to products
                    </RouterLink>
                </td>
            </tr>   
        </thead>
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

.text-center {
    text-align: center;
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
</style>