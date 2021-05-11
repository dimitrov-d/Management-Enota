<template>
	<v-container fluid>
		<v-row>
			<v-col align="center">
				<v-form @submit.prevent="login">
					<v-card outlined max-width="500" class="mt-10">
						<v-card-title><translate>Login</translate></v-card-title>
						<v-card-text>
							<v-text-field outlined hide-details v-model="email" :label="$gettext('Email')" class="mb-5"></v-text-field>
							<v-text-field outlined hide-details v-model="password" :label="$gettext('Password')" type="password"></v-text-field>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn class="mb-2" :to="{ name: 'Register' }" text><translate>Register</translate></v-btn>
							<v-btn depressed dark type="submit" class="ml-2 mr-2 mb-2"><translate>Login</translate></v-btn>
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
				this.getUserInfo()
			})
			.catch(error => {
				this.$emit('snackbar', error.message, 'error')
			})
        },
		getUserInfo() {
			axios.get('http://localhost:3123/user',
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.getters.token
				}
			})
			.then(response => {
				this.$store.commit('setUser', response.data)
				this.$router.push({ name: 'Home' })
			})
			.catch(error => {
				this.$emit('snackbar', error.message, 'error')
			})
		}
    }
}
</script>