<script>
  export default {
  data() {
    return {
      product: {
        Name: '',
        Price: 0,
        Category: '',
        Description: '',
        ImageUrl: '',
      },
      categories: [
            "Puu- ja köögiviljad",
            "Piimatooted ja munad",
            "Liha ja kala",
            "Pagaritooted",
            "Joogid",
            "Kuivained",
            "Maiustused ja suupisted",
            "Külmutatud tooted",
            "Kodukeemia",
            "Tervis ja ilu",
            "Kastmed ja õlid",
            "Valmistoit",
            "Toidulisandid"
        ].sort(),
    }
  },
  methods: {
    async saveProduct() {
      try {
        const response = await fetch('http://localhost:8080/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.product)
        });

        if (response.ok) {
          alert("Product added successfully!");
          this.$router.push('/products'); // Redirect back to list
        } else {
          alert("Error adding product");
        }
      } catch (error) {
        console.error("Connection error:", error);
      }
    }
  }
}
</script>

<template>
    <div class="form-container">
        <h1>Add New Product</h1>
        <form @submit.prevent="saveProduct">
            <div class="form-group">
                <label>Product Name</label>
                <input v-model="product.Name" type="text" required>
            </div>

            <div class="form-group">
                <label>Price €</label>
                <input v-model="product.Price" type="number" step="0.01" required>
            </div>

            <div class="form-group">
                <label for="category-select">Product Category</label>
                <select id="category-select" v-model="product.Category" required>
                    <option value="" disabled>-- Please choose an option --</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">
                        {{ cat }}
                    </option>
                </select>
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
                <button type="submit" class="save-btn">Save Product</button>
                <button type="button" class="cancel-btn" @click="$router.push('/products')">Cancel</button>
            </div>
        </form>
    </div>
</template>