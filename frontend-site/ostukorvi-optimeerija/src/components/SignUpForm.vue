<script>
    export default {
        methods: {
            async signUp() {
                console.log("button is clicked")
                    await fetch(`http://localhost:8080/profiles`, {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(this.NewProfile),
                })
            }
        },
        name: "SignUpForm",
        data() {
            return {NewProfile: {
                Name: "Your name",
                Email: "your@email.com",
                PlainPassword: ""
            }}
        }
    };
</script>

<template>
    <div class="form-container">
        <h1>Sign up</h1>
        <form @submit.prevent="signUp">
            <div class="form-group">
                <label>Name:</label>
                <input v-model="NewProfile.Name" type="text" required/>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input v-model="NewProfile.Email" type="text" required/>
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input v-model="NewProfile.PlainPassword" type="password" required/>
            </div>
            <!-- <div class="form-group">
                <label>Confirm password:</label>
                <input type="password" required/>
            </div> -->
            <div class="btn-group">
                <button type="submit" class="save-btn">Register</button>
            </div>
        </form>
    </div>
</template>