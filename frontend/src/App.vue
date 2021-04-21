<template>
	<v-app>
		<v-btn v-if="$store.getters.loggedIn" @click="logout" depressed dark>LOGOUT</v-btn>
		
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				
			}
		},
		methods: {
			logout() {
				this.$store.commit('setToken', null)
				this.$router.push('Login')
			}
		}
	}
</script>

