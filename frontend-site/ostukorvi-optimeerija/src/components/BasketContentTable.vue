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
    <div class="btn-group">
        <RouterLink :to="'/basket/'+ $route.params.seekID +'/add-products'" class="view-btn">
            Add Products
        </RouterLink>
        <RouterLink to="/baskets" class="back-btn">
            Back
        </RouterLink>
    </div>
    
    <div class="table-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th></th>
                    <th class="name-column">Name</th>
                    <th class="name-column">Category</th>
                    <th class="name-column">Price</th>
                    <th class="name-column">Quantity</th>
                    <th class="name-column">Total</th>
                    <th class="name-column"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.ProductID">
                    <td>
                        <img v-if="item.ImageUrl" :src="item.ImageUrl" alt="Product image" class="preview-img">
                    </td>
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