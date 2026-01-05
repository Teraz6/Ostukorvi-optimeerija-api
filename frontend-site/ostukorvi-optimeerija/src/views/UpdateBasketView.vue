<script>
export default {
    name: "UpdateBasketView",
    props: {
        //in router props must be set to 'true'
        seekID: {
        type: String,
        required: true
        }
    },
    data() {
        return {
        basket: {
            Name: '',
            Description: ''
        }
        }
    },
    async created() {
        try {
            const response = await fetch(`http://localhost:8080/baskets/${this.seekID}`);
            this.basket = await response.json();
        } 
        catch (error) {
            console.error("Error fetching basket details:", error);
        }
    },
    methods: {
        async updateBasket() {
            try {
                const response = await fetch(`http://localhost:8080/baskets/${this.seekID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.basket)
                });

                if (response.ok) {
                alert("Basket updated successfully!");
                this.$router.push('/baskets'); // Redirect back to list
                } else {
                alert("Error updating basket");
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
        <h1>Add New Basket</h1>
        <form @submit.prevent="updateBasket">
            <div class="form-group">
                <label>Basket Name</label>
                <input v-model="basket.Name" type="text" required>
            </div>

            <div class="form-group">
                <label>Description</label>
                <input v-model="basket.Description" type="text" required>
            </div>

            <div class="button-group">
                <button type="submit" class="save-btn">Update Basket</button>
                <button type="button" class="cancel-btn" @click="$router.push('/baskets')">Cancel</button>
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