<template>
	<v-app>
		<v-main app>
			<v-app-bar v-if="!$route.meta.requiresVisitor" app dense dark flat hide-on-scroll>
				<v-toolbar-title>E-Nota</v-toolbar-title>
				
				<v-spacer></v-spacer>
				
				<v-btn @click="logout" depressed light dense><translate>LOGOUT</translate></v-btn>
				
				<template v-slot:extension>
					<v-tabs align-with-title>
						<v-tab to="/"><translate>Home</translate></v-tab>
						<v-tab to="/Applications"><translate>Applications</translate></v-tab>
						<v-tab to="/Appointments"><translate>Appointments</translate></v-tab>
					</v-tabs>
				</template>
			</v-app-bar>
			
			<router-view/>
			
			<v-footer app height="52">
				<v-spacer></v-spacer>
				<v-select v-model="$language.current" :items="languages" outlined dense style="max-width: 200px;"></v-select>
			</v-footer>
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

