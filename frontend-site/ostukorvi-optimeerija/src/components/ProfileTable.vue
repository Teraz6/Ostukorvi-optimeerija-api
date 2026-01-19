<script>
    export default {
        name: "ProfileTable",
        props: {
            items: Array
        },
        emits: ["delete"]
    }
</script>

<template>
    <RouterLink to="/add-profile" class="view-btn">
     Add Profile
    </RouterLink>
    <div class="table-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th>Profile ID</th>
                    <th>Profile Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.ProfileID">
                    <td class="id-column">{{ item.ProfileID }}</td>
                    <td class="name-column">{{ item.Email }}</td>
                    <td class="btn-group">
                        <RouterLink 
                            :to="'/profile/' + item.ProfileID" 
                            class="view-btn">
                            View Details
                        </RouterLink>
                        <RouterLink
                            :to="'/profile/' + item.ProfileID + '/update'"
                            class="view-btn">
                            Update
                        </RouterLink>

                        <button
                            class="delete-btn"
                            @click="$emit('delete', item.ProfileID)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>