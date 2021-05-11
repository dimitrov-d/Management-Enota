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
								<!-- <v-text-field :label="$gettext('City')" v-model="user.city" :readonly="!editingProfile" dense outlined hide-details></v-text-field> -->
								<v-select :label="$gettext('City')" v-model="user.city" :readonly="!editingProfile" dense outlined hide-details :items="[ '', 'Koper', 'Ljubljana', 'Maribor', ]"></v-select>
							</v-col>
						</v-row>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn v-show="!editingProfile" @click="editingProfile = true" depressed><translate>Edit</translate></v-btn>
						<v-btn v-show="editingProfile" @click="editingProfile = false" depressed dark color="error"><translate>Cancel</translate></v-btn>
						<v-btn v-show="editingProfile" @click="updateUser" depressed dark color="success"><translate>Save</translate></v-btn>
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
					<v-card-text v-if="!userApplications.length">
						<translate>No current applications</translate>
					</v-card-text>
					<v-card-text v-else>
						<v-card outlined>
							<v-expansion-panels accordion multiple>
								<v-expansion-panel v-for="(a, i) in userApplications" :key="i">
									<v-expansion-panel-header>
										{{applications[a.applicationType].name()}}
									</v-expansion-panel-header>
									<v-expansion-panel-content>
										<v-row class="pl-3 pb-3">
											<v-card v-for="(requirement, j) in applications[a.applicationType].requirements" :key="j" class="d-flex flex-wrap mt-4 mr-4" outlined width="200px" height="200px">
												<v-card-title>
													{{requirement()}}
												</v-card-title>
												<v-card-subtitle>
													<translate>Status:</translate> {{a.documents[requirement.name].confirmed || $gettext('processing')}}
												</v-card-subtitle>
												<v-card-text style="text-align: center;">
													<v-badge v-if="a.documents[requirement.name].confirmed" bordered color="success" icon="mdi-check" overlap>
														<v-btn fab tile disabled x-large><v-icon>mdi-file</v-icon></v-btn>
													</v-badge>
													<v-badge v-else bordered color="orange" icon="mdi-clock-outline" overlap>
														<v-btn fab tile disabled x-large><v-icon>mdi-file</v-icon></v-btn>
													</v-badge>
												</v-card-text>
											</v-card>
										</v-row>
										<v-row class="mb-0 mt-5">
											<v-spacer></v-spacer>
												<v-btn @click="closeApplication(a._id)" dark depressed><translate>Close application</translate></v-btn>
											<v-spacer></v-spacer>
										</v-row>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</v-card>
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
					<v-card-text v-if="!userAppointments.length">
						<translate>No scheduled appointments</translate>
					</v-card-text>
					<v-card-text v-else>
						<v-row>
							<v-col>
								<v-chip v-for="(a, i) in userAppointments" :key="i" class="ma-2" close @click:close="removeAppointment(i)" ><v-icon left>mdi-calendar</v-icon>{{new Date(a.datetime).toLocaleString($language.current)}}</v-chip>
							</v-col>
						</v-row>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn to="/Appointments" dark depressed><translate>New appointment</translate></v-btn>
						<v-spacer></v-spacer>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from 'axios'
import applications from '../applications'
export default {
	name: 'Home',
	data() {
		return {
			user: {},
			editingProfile: false,
			userAppointments: [],
			userApplications: [],
		}
	},
	computed: {
		applications() {
			return applications
		}
	},
	created() {
		this.getUser()
		
		axios.post(
			'http://localhost:3123/applications/getApplication',
			{ user: { id: this.user._id} },
			{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.getters.token } })
			.then(response => {
				this.userApplications = response.data
				this.userApplications.forEach(a => {
					a.documents[Object.keys(a.documents)[0]].confirmed = this.$gettext('confirmed')
				})
			})
			.catch(error => {
				this.$emit('snackbar', error.message, 'error')
			})
		
		axios.get(
			'http://localhost:3123/appointments',
			{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.getters.token } })
			.then(response => {
				this.userAppointments = response.data
			})
			.catch(error => {
				this.$emit('snackbar', error.message, 'error')
			})
	},
	methods: {
		closeApplication(id) {
			if(window.confirm(this.$gettext('Are you sure you want to close this application?'))) {
				axios.post(
					'http://localhost:3123/applications/deleteApplication',
					{
						appId: id,
					},
					{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.getters.token } })
					.then(() => {
						this.$emit('snackbar', this.$gettext('Application closed'))
					})
					.catch(error => {
						this.$emit('snackbar', error.message, 'error')
					})
			}
		},
		removeAppointment(i) {
			if(window.confirm(this.$gettext('Are you sure you want to remove this appointment?'))) {
				axios.post(
					'http://localhost:3123/appointments/deleteAppointment',
					{
						appId: this.userAppointments[i]._id,
					},
					{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.getters.token } })
					.then(() => {
						this.userAppointments.splice(i, 1)
						this.$emit('snackbar', this.$gettext('Appointment removed'))
					})
					.catch(error => {
						this.$emit('snackbar', error.message, 'error')
					})
			}
		},
		getUser() {
			axios.get('http://localhost:3123/user',
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + this.$store.getters.token
					}
				})
				.then(response => {
					this.user = response.data
					this.$store.commit('setUser', response.data)
				})
				.catch(error => {
					this.$emit('snackbar', error.message, 'error')
				})	
		},
		updateUser() {
			this.editingProfile = false
			axios.post(
				'http://localhost:3123/user/update',
				{
					name: this.user.name,
					email: this.user.email,
					phone: this.user.phone,
					emso: this.user.emso,
					address: this.user.address,
					city: this.user.city,
				},
				{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.getters.token } })
				.then(() => {
					this.getUser()
					this.$emit('snackbar', this.$gettext('User updated'))
				})
				.catch(error => {
					this.$emit('snackbar', error.message, 'error')
				})
		},
	},
}
</script>