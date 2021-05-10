<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<v-row justify="center">
					<v-card outlined class="ma-5">
						<v-card-title style="word-break: break-word;"><translate>Select a date and time for your appointment:</translate></v-card-title>
						<v-row class="pa-3">
							<v-col>
								<v-row justify="center" class="ma-2">
									<v-date-picker dark v-model="date" :locale="$language.current"></v-date-picker>
								</v-row>
							</v-col>
							<v-col>
								<v-row justify="center" class="ma-2">
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
		<v-snackbar v-model="snackbar" color="success">
			<translate>Request sent</translate>
			<template v-slot:action="{ attrs }">
				<v-btn color="success" fab small depressed v-bind="attrs" @click="snackbar = false"><v-icon dark>mdi-close</v-icon></v-btn>
			</template>
		</v-snackbar>
	</v-container>
</template>

<script>
export default {
	name: 'Appointments',
	data() {
		return {
			date: new Date().toISOString().substr(0, 10),
			time: null,
			availableTimes: [
				{
					text: this.$gettext('Select a time'),
					value: null
				},
				'08:00',
				'08:30',
				'12:30',
				'14:15',
			],
			snackbar: false,
		}
	},
	watch: {
		'$language.current'() {
			this.availableTimes = [
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
			// var dateTime = new Date(this.date + 'T' + this.time)
			this.snackbar = true
		},
	}
}
</script>