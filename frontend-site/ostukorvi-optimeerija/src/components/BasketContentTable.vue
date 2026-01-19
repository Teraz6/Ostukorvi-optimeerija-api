<script>
import { calculateTotal } from '../utils/basketTotalPrice';
import { calculateProductTotal } from '../utils/productTotalPrice';

    export default {
        name: "BasketContentTable",
        props: {
            items: Array
        },
        computed: {
            totalBasketPrice() {
                return calculateTotal(this.items);
            }
        },
        methods: {
            calculateProductTotal,
            async removeProduct(ProductID) {
                if(!confirm("Are you sure you want to remove this product?")) return;
                try {
                    const BasketID = this.$route.params.seekID
                    const response = await fetch(`http://localhost:8080/baskets/${BasketID}/products/${ProductID}`,
                        {method: 'DELETE'}
                    );

                    if (response.ok) {
                        this.$emit('product-removed', ProductID);
                    } else {
                        alert("Server error: Could not remove product.");
                    }
                } catch (error) {
                    console.error("Remove request failed:", error)
                }
            },
            async updateQuantity(item) {
                const originalQty = item.BasketItem.Quantity;

                try {
                    const BasketID = this.$route.params.seekID;
                    const qty = item.BasketItem.Quantity;

                    if (qty < 1) {
                        item.BasketItem.Quantity = 1;
                        return;
                    }

                    const response = await fetch(`http://localhost:8080/baskets/${BasketID}/products/${item.ProductID}?Quantity=${qty}`, 
                        { method: 'PUT' }
                    );

                    if (!response.ok) {
                        alert("Failed to update quantity")
                        item.BasketItem.Quantity = originalQty;
                    } else {
                        console.log(`Updated ${item.Name} to ${qty}`);
                    }
                } catch (error) {
                    alert("Could not update quantity.")
                    item.BasketItem.Quantity = originalQty;
                    console.error("Update failed:", error)
                }
            }
        }   
    }
</script>

<template>
    <RouterLink :to="'/basket/'+ $route.params.seekID +'/add-products'" class="view-btn">
        Add Products
    </RouterLink>
    <RouterLink to="/baskets" class="view-btn">
        Back
    </RouterLink>
    <div class="table-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th class="name-column">Name</th>
                    <th class="name-column">Category</th>
                    <th class="name-column">Price</th>
                    <th class="name-column">Quantity</th>
                    <th class="name-column">Total</th>
                    <th class="name-column">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.ProductID">
                    <td>{{ item.Name }}</td>
                    <td>{{ item.Category }}</td>
                    <td>{{ item.Price }}€</td>
                    <td>
                        <input 
                            type="number" 
                            min="1" 
                            v-model.number="item.BasketItem.Quantity" 
                            @change="updateQuantity(item)"
                            class="qty-input"/>
                        <span> pcs</span>
                    </td>
                    <td>{{ calculateProductTotal(item)}}€</td>
                    <td>
                        <button @click="removeProduct(item.ProductID)" class="delete-btn">
                            X
                        </button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="2" class="total-label">Total Price:</td>
                    <td></td>
                    <td colspan="3" class="total-amount">{{ totalBasketPrice }}€</td>
                </tr>
            </tfoot>
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
.nr-column {
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

.qty-input {
    width: 60px;
    padding: 4px 8px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.9rem;
    color: var(--color-text);
}

.qty-input:focus {
    outline: 2px solid #3b82f6;
    border-color: transparent;
}

tfoot {
    background-color: #f8fafc;
    border-top: 2px solid #edf2f7;
}

.total-row td {
    font-weight: 700;
    font-size: 1.1rem;
    color: #1e293b;
}

.total-label {
    text-align: right;
    color: #64748b;
    text-transform: uppercase;
    font-size: 0.8rem;
}

.total-amount {
    color: #2563eb !important; /* Make the price blue */
}
</style>