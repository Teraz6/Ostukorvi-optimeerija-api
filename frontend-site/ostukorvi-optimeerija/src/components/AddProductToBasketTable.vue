<script>
import { calculateProductTotal

 } from '../utils/productTotalPrice';
    export default {
        name: "AddProductToBasketTable",
        props: {
            items: Array
        },
        methods: {
            calculateProductTotal,
            async addProduct(item) {
                try {
                    const BasketID = this.$route.params.seekID
                    const qty = item.selectedQuantity || 1;

                    const response = await fetch(`http://localhost:8080/baskets/${BasketID}/products`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify
                            ({ 
                                ProductID: item.ProductID, 
                                Quantity: qty
                            })
                        }
                    );
                    if (response.ok) {
                        alert(`${item.Name} added to basket!`)
                        this.$emit('product-added', item.ProductID);
                    } else {
                        // alert("Server error: Could not add product to the basket.")
                        const errorDetail = await response.text(); 
                        alert("Server says: " + errorDetail);
                    }
                } catch (error) {
                    console.error("Add request failed:", error)
                }
            }
        }
    }
</script>

<template>
    <RouterLink :to="'/basket/' + $route.params.seekID + '/products'" class="back-btn">
        Back
    </RouterLink>
    <div class="table-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>  
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.ProductID">
                    <td>{{ item.Name }}</td>
                    <td>{{ item.Category }}</td>
                    <td>{{ item.Price }}€</td>
                    <td>
                        <input 
                            class="qty-input"
                            type="number"
                            min="1" 
                            placeholder="1"
                            v-model.number="item.selectedQuantity">
                    </td>
                    <td>{{ calculateProductTotal(item) }}€</td>
                    <td>
                        <button 
                            @click="addProduct(item)"
                            class="update-btn">
                            +
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>