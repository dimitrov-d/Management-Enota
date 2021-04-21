<template>
	<v-container fluid>
		<v-row>
			<v-col align="center">
				<v-form @submit.prevent="login">
					<v-card outlined max-width="500" class="mt-10">
						<v-card-title>Welcome</v-card-title>
						<v-card-text>
							<v-text-field outlined hide-details v-model="email" label="Email" class="mb-5"></v-text-field>
							<v-text-field outlined hide-details v-model="password" label="Password" type="password"></v-text-field>
							<v-card v-show="error" color="error" dark class="mt-5">
								<v-card-text>{{error}}</v-card-text>
							</v-card>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn depressed dark type="submit" class="mr-2 mb-2">LOGIN</v-btn>
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
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            error: null,
        }
    },
    methods: {
        login() {
            const loginData = {
                email: this.email,
                password: this.password
            }
            axios.post('http://localhost:3123/auth/login', loginData)
			.then(response => {
				this.$store.commit('setToken', response.data.accessToken)
				this.$router.push({ name: 'Home' })
			})
			.catch(error => {
				this.error = error.message
			})
        },
    }
}
</script>