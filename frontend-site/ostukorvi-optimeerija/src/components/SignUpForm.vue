<script>
    export default {
        computed: {
            passwordError() {
                if (this.NewProfile.PlainPassword && this.passwordConfirm) {
                    return this.NewProfile.PlainPassword !== this.passwordConfirm;
                }
                return false;
            }
        },
        methods: {
            async signUp() {

                if (this.passwordError) {
                    alert("Please fix the errors");
                    return;
                }

                const response = await fetch(`http://localhost:8080/profiles`, {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(this.NewProfile),
                })

                if (response.ok) {
                    alert("Profile registered")
                    this.$router.push('/login')
                } else {
                    alert("Error creating a profile")
                }
            }
        },
        name: "SignUpForm",
        data() {
            return {
                NewProfile: {
                    Name: "",
                    Email: "",
                    PlainPassword: "",
                },
                passwordConfirm: ""
            }
        }
    };
</script>

<template>
    <div class="form-container">
        <h1>Sign up</h1>
        <form @submit.prevent="signUp">
            <div class="form-group">
                <label>Name:</label>
                <input v-model="NewProfile.Name" placeholder="Your Name" type="text" required/>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input v-model="NewProfile.Email" placeholder="Your@email.here" type="text" required/>
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input v-model="NewProfile.PlainPassword" type="password" required/>
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input v-model="passwordConfirm" type="password" />
                <span v-if="passwordError" style="color:red;">Passwords don't match</span>
            </div>
            <div class="btn-group">
                <button type="submit" class="save-btn">Register</button>
            </div>
        </form>
    </div>
</template>