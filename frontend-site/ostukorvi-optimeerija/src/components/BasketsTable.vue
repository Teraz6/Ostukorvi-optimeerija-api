<script>
    export default {
        name: "BasketsTable",
        props: {
            items: Array,
            default: () => []
        },
        methods: {
            async deleteBasket(BasketID) {
                if (!confirm("Are you sure you want to delete this product?")) return;
                try {
                    const response = await fetch(`http://localhost:8080/baskets/${BasketID}`, {
                        method: 'DELETE',
                        credentials: 'include'
                    });

                    if (response.ok) {
                        this.$emit('basket-deleted', BasketID);
                    } else {
                        alert("Error: You don't have a permission");
                    }
                } catch (error) {
                    console.error("Delete request failed:", error);
                }
            }
        }
    }
</script>

<template>
    <RouterLink to="/add-basket" class="view-btn">
        Add Basket
    </RouterLink>

    <div class="table-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Total price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.BasketID">
                    <td class="name-column">{{ item.Name }}</td>
                    <td class="name-column">{{ item.TotalPrice ? item.TotalPrice + ' €' : '0.00 €'}}</td>
                    <td class="btn-group btn-right">
                        <RouterLink :to="'/basket/' + item.BasketID + '/products'"
                            class="view-btn">
                            Open Basket
                        </RouterLink>

                        <RouterLink :to="'/basket/' + item.BasketID"
                            class="view-btn">
                            View Details
                        </RouterLink>

                        <RouterLink :to="'/baskets/' + item.BasketID + '/update'"
                            class="view-btn">
                            Edit
                        </RouterLink>

                        <button @click="deleteBasket(item.BasketID)" class="delete-btn">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>