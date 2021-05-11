<template>
<v-container fluid>
    <v-row>
        <v-col align="center">
            <v-form @submit.prevent="register">
                <v-card outlined max-width="500" class="mt-10">
                    <v-card-title>
                        <translate>Register</translate>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field outlined hide-details v-model="name" label="Name" class="mb-5"></v-text-field>
                        <v-text-field outlined hide-details v-model="surname" label="Surname" class="mb-5"></v-text-field>
                        <v-text-field outlined hide-details v-model="email" label="Email" class="mb-5"></v-text-field>
                        <v-text-field outlined hide-details v-model="password" label="Password" type="password"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
						<v-btn class="mb-2" :to="{ name: 'Login' }" text><translate>Login</translate></v-btn>
                        <v-btn depressed dark type="submit" class="ml-2 mr-2 mb-2"><translate>Register</translate></v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Register',
    data() {
        return {
            name: '',
            surname: '',
            email: '',
            password: '',
        }
    },
    methods: {
        register() {
            const data = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password,
            }
            axios.post('http://localhost:3123/auth/register', data)
                .then(() => this.$router.push({ name: 'Login' }))
                .catch(error => {
                    this.$emit('snackbar', error.message, 'error')
                })
        },
    }
}
</script>
