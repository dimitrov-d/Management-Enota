<template>
	<v-app>
		<v-main app>
			<v-app-bar v-if="!$route.meta.requiresVisitor" app dense dark flat hide-on-scroll>
				<v-toolbar-title>E-Nota</v-toolbar-title>
				
				<v-spacer></v-spacer>
				
				<v-btn @click="logout" depressed light dense><translate>Logout</translate></v-btn>
				
				<template v-slot:extension>
					<v-tabs :key="guiReload" align-with-title>
						<v-tab to="/"><translate>Home</translate></v-tab>
						<v-tab to="/Applications"><translate>Applications</translate></v-tab>
						<v-tab to="/Appointments"><translate>Appointments</translate></v-tab>
					</v-tabs>
				</template>
			</v-app-bar>
			
			<router-view @snackbar="(m, c) => { snackbar.message = m; snackbar.colour = c || 'success'; snackbarVisible = true }" />
			
			<v-footer app height="52">
				<v-spacer></v-spacer>
				<v-select v-model="$language.current" :items="languages" outlined dense style="max-width: 200px;"></v-select>
			</v-footer>
		</v-main>
		<v-snackbar v-model="snackbarVisible" :color="snackbar.colour">
			{{snackbar.message}}
			<template v-slot:action="{ attrs }">
				<v-btn :color="snackbar.colour" fab small depressed v-bind="attrs" @click="snackbarVisible = false"><v-icon dark>mdi-close</v-icon></v-btn>
			</template>
		</v-snackbar>
	</v-app>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				guiReload: 0,
				snackbarVisible: false,
				snackbar: {
					message: '',
					colour: 'success',
				},
			}
		},
		computed: {
			languages() {
				var lang = []
				Object.keys(this.$language.available).forEach(l => {
					lang.push({
						text: this.$language.available[l],
						value: l
					})
				})
				return lang
			}
		},
		watch: {
			'$language.current'(val) {
				this.$store.commit('setLang', val)
				this.guiReload++
			}
		},
		created() {
			this.$language.current = this.$store.getters.lang
		},
		methods: {
			logout() {
				this.$store.commit('logout')
				this.$router.push('Login')
			}
		}
	}
</script>

<style>
.v-card__title, .v-card__title * {
	word-break: break-word !important;
}

.v-expansion-panel::before {
	box-shadow: none !important;
}
</style>