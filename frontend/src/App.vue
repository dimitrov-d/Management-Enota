<template>
	<v-app>
		<v-main app>
			<v-app-bar v-if="!$route.meta.requiresVisitor" app dense dark flat hide-on-scroll>
				<v-toolbar-title>E-Nota</v-toolbar-title>
				
				<v-spacer></v-spacer>
				
				<v-btn @click="logout" depressed light dense>LOGOUT</v-btn>
				
				<template v-slot:extension>
					<v-tabs align-with-title>
						<v-tab to="/">Home</v-tab>
						<v-tab to="/Applications">Applications</v-tab>
						<v-tab to="/Appointments">Appointments</v-tab>
					</v-tabs>
				</template>
			</v-app-bar>
			
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

