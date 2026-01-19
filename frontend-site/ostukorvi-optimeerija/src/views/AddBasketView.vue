<script>
    export default {
        data() {
            return {
                basket: { 
                    Name:'',
                    Description:''
                }
            }
        },
        methods: {
            async saveBasket() {
                try {
                    const response = await fetch('http://localhost:8080/baskets', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(this.basket)
                    });
                    if (response.ok) {
                        alert("Basket created!");
                        this.$router.push('/baskets');
                    } else {
                        alert("Error adding basket!");
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
        <h1>Create New Basket</h1>
        <form @submit.prevent="saveBasket">
            <div class="form-group">
                <label>Name</label>
                <input v-model="basket.Name" type="text" required>
            </div>
            
            <div class="form-group">
                <label>Description</label>
                <input v-model="basket.Description" type="text" required>
            </div>
            
            <div class="btn-group">
                <button type="submit" class="save-btn">Create Basket</button>
                <button type="button" class="cancel-btn" @click="$router.push('/baskets')">Cancel</button>
            </div>
        </form>
    </div>
</template>