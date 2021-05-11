<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<v-row justify="center">
					<v-card outlined class="ma-5">
						<v-card-title><translate>Select a date and time for your appointment</translate></v-card-title>
						<v-row class="pa-3">
							<v-col>
								<v-row justify="center" class="ma-3">
									<v-date-picker dark v-model="date" :locale="$language.current"></v-date-picker>
								</v-row>
							</v-col>
							<v-col>
								<v-row justify="center" class="ma-3">
									<v-select v-model="time" :items="availableTimes" outlined style="width: 290px; max-width: 290px;"></v-select>
								</v-row>
							</v-col>
						</v-row>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn @click="requestAppointment" :disabled="!date || !time" color="success" depressed><translate>Request appointment</translate></v-btn>
						</v-card-actions>
					</v-card>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from 'axios'
export default {
	name: 'Appointments',
	data() {
		return {
			date: new Date().toISOString().substr(0, 10),
			time: null,
		}
	},
	computed: {
		user() {
			return this.$store.getters.user
		},
		availableTimes() {
			return [
				{
					text: this.$gettext('Select a time'),
					value: null
				},
				'08:00',
				'08:30',
				'12:30',
				'14:15',
			]
		}
	},
	methods: {
		requestAppointment() {
			axios.post(
				'http://localhost:3123/appointments/addAppointment',
				{
					datetime: new Date(this.date + 'T' + this.time),
				},
				{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.getters.token } })
				.then(() => {
					this.$emit('snackbar', this.$gettext('Request sent'))
				})
				.catch(error => {
					this.$emit('snackbar', error.message, 'error')
				})
		},
	}
}
</script>