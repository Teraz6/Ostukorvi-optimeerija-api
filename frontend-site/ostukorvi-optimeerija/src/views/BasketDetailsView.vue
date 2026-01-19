<script>
    export default {
        name: "BasketDetailsView",
        props: {
            seekID: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                basket: {
                    BasketID: "",
                    Name: "",
                    Description: ""
                }
            }
        },
        async created() {
            try {
                const response = await fetch(`http://localhost:8080/baskets/${this.seekID}`);
                this.basket = await response.json();
            } catch (error) {
                console.error("Error fetching basket details:", error);
            }
        }
    }
</script>
<template>
    <div class="form-container">
        <h1>{{ basket.Name }}</h1>
        <div class="form-group">
            <h4>Basket ID:</h4>
            <label>{{ basket.BasketID }}</label>
        </div>

        <div class="form-group">
            <h4>Description</h4>
            <label>{{ basket.Description }}</label>
        </div>

        <div class="btn-group">
            <RouterLink :to="'/baskets'" class="back-btn">
                Back to baskets
            </RouterLink>
            <RouterLink :to="`/products/${basket.BasketID}/update`" class="view-btn">
                Edit
            </RouterLink>
        </div>
    </div>
</template>