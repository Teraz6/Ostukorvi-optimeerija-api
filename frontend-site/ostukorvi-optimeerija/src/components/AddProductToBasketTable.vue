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
          
          <hr />

          <div class="form-group" style="margin-top: 10px;">
            <label style="font-size: 0.8em; display: block;">Quantity:</label>
            <input 
              class="qty-input"
              type="number"
              min="1" 
              style="width: 100%; padding: 5px; margin-bottom: 5px;"
              v-model.number="item.selectedQuantity"
              placeholder="1"
            >
            <p style="font-weight: bold; margin-top: 5px;">
              Total: {{ calculateProductTotal(item) }}€
            </p>
          </div>
        </div>

        <div class="card-actions">
          <button 
            @click="addProduct(item)" 
            class="view-btn" 
            style="width: 100%; text-align: center; border: none; cursor: pointer;"
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  </div>
</template>