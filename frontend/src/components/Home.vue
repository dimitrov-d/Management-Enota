<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col>
				<v-card outlined>
					<v-card-title>
						<v-btn fab disabled small class="mr-5"><v-icon>mdi-account</v-icon></v-btn>
						{{user.name}}
						{{user.surname}}
						<v-spacer></v-spacer>
						<v-btn fab depressed small><v-icon>mdi-cog</v-icon></v-btn>
					</v-card-title>
					<v-card-text>
						<translate>Email:</translate> {{user.email}}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col>
				<v-card outlined>
					<v-card-title>
						<translate>Current applications</translate>
					</v-card-title>
					<v-card-text>
						<translate>No current applications</translate>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col>
				<v-card outlined>
					<v-card-title>
						<translate>Scheduled appointments</translate>
					</v-card-title>
					<v-card-text>
						<translate>No scheduled appointments</translate>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
// import axios from 'axios'
export default {
	name: 'Home',
	data() {
		return {
			
		}
	},
	computed: {
		user() {
			return this.$store.getters.user
		}
	},
}
</script>