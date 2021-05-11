<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col>
				<v-card outlined>
					<v-card-title >
						<v-btn fab disabled small class="mr-5"><v-icon>mdi-account</v-icon></v-btn>
						{{user.name}}
						{{user.surname}}
					</v-card-title>
					<v-card-text>
						<v-row>
							<v-col cols="12" md="4" >
								<v-text-field :label="$gettext('Email')" v-model="user.email" :readonly="!editingProfile" dense outlined hide-details></v-text-field>
							</v-col>
							<v-col cols="12" md="4">
								<v-text-field :label="$gettext('Phone')" v-model="user.phone" :readonly="!editingProfile" dense outlined hide-details></v-text-field>
							</v-col>
							<v-col cols="12" md="4">
								<v-text-field label="EMŠO" v-model="user.emso" :readonly="!editingProfile" dense outlined hide-details></v-text-field>
							</v-col>
							<v-col cols="12" md="4">
								<v-text-field :label="$gettext('Address')" v-model="user.address" :readonly="!editingProfile" dense outlined hide-details></v-text-field>
							</v-col>
							<v-col cols="12" md="4">
								<v-text-field :label="$gettext('City')" v-model="user.city" :readonly="!editingProfile" dense outlined hide-details></v-text-field>
							</v-col>
						</v-row>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn v-show="!editingProfile" @click="editingProfile = true" depressed><translate>Edit</translate></v-btn>
						<v-btn v-show="editingProfile" @click="editingProfile = false" depressed dark color="error"><translate>Cancel</translate></v-btn>
						<v-btn v-show="editingProfile" @click="saveProfile" depressed dark color="success"><translate>Save</translate></v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col>
				<v-card outlined>
					<v-card-title>
						<translate>Current applications</translate>
					</v-card-title>
					<v-card-text v-if="!application">
						<translate>No current applications</translate>
					</v-card-text>
					<v-card-text v-else>
						<v-row>
							<v-col>
								<v-card outlined>
									<v-card-title>
										<translate>{{application.name}}</translate>
									</v-card-title>
									<v-card-text>
										<v-row class="pl-3 pb-3">
											<v-card v-for="(requirement,i) in application.requirements" :key="i" class="d-flex flex-wrap mt-4 mr-4" outlined width="200px" height="200px">
												<v-card-title>
													<translate>{{requirement.name}}</translate>
												</v-card-title>
												<v-card-text style="text-align: center;">
													<v-badge :value="requirement.completed" bordered color="success" icon="mdi-check" overlap>
														<v-btn fab tile outlined :disabled="requirement.completed" x-large><v-icon>mdi-file</v-icon></v-btn>
													</v-badge>
												</v-card-text>
											</v-card>
										</v-row>
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
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
					<v-card-text v-if="!appointments.length">
						<translate>No scheduled appointments</translate>
					</v-card-text>
					<v-card-text v-else>
						<v-row>
							<v-col>
								<v-chip v-for="(a, i) in appointments" :key="i" class="ma-2" close @click:close="removeAppointment(i)" ><v-icon left>mdi-calendar</v-icon>{{new Date(a.datetime).toLocaleString($language.current)}}</v-chip>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from 'axios'
export default {
	name: 'Home',
	data() {
		return {
			editingProfile: false,
			appointments: [
				new Date('2021-05-10T08:00'),
				new Date('2021-05-17T08:30'),
			],
			application: {
				name: 'Student Visa',
				requirements: [
					{
						name: 'Application form',
						completed: true
					},
					{
						name: 'ID card scan',
						completed: true
					},
					{
						name: 'Bank statements',
						completed: false
					},
				],
			},
			applications: []
		}
	},
	computed: {
		user() {
			return this.$store.getters.user
		}
	},
	created() {
		axios.post(
			'http://localhost:3123/applications/getApplication',
			{ user: { id: this.user._id} },
			{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.getters.token } })
			.then(response => {
				this.applications = response.data
			})
			.catch(error => {
				this.$emit('snackbar', error.message, 'error')
			})
		
		
		axios.get(
			'http://localhost:3123/appointments',
			{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.getters.token } })
			.then(response => {
				this.appointments = response.data
			})
			.catch(error => {
				this.$emit('snackbar', error.message, 'error')
			})
	},
	methods: {
		saveProfile() {
			this.editingProfile = false
			this.$emit('snackbar', this.$gettext('Profile saved'))
		},
		removeAppointment(i) {
			if(window.confirm(this.$gettext('Are you sure you want to remove this appointment?'))) {
				axios.post(
					'http://localhost:3123/appointments/deleteAppointment',
					{
						appId: this.appointments[i]._id,
					},
					{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.getters.token } })
					.then(() => {
						this.appointments.splice(i, 1)
						this.$emit('snackbar', this.$gettext('Appointment removed'))
					})
					.catch(error => {
						this.$emit('snackbar', error.message, 'error')
					})
			}
		},
	},
}
</script>