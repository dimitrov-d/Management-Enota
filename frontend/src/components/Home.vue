<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col>
				<v-card outlined>
					<v-card-title >
						<v-btn fab disabled small class="mr-5"><v-icon>mdi-account</v-icon></v-btn>
						{{user.name}}
						{{user.surname}}
						<v-spacer></v-spacer>
						<v-btn v-if="!editingProfile" @click="editingProfile = true" fab depressed small><v-icon>mdi-pencil</v-icon></v-btn>
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
					<v-card-actions v-if="editingProfile">
						<v-spacer></v-spacer>
						<v-btn @click="saveProfile" depressed dark color="success"><translate>Save</translate></v-btn>
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
					<v-card-text v-if="!appointments.length">
						<translate>No scheduled appointments</translate>
					</v-card-text>
					<v-card-text v-else>
						<v-row>
							<v-col>
								<v-chip v-for="(a, i) in appointments" :key="i" class="ma-2" close @click:close="removeAppointment(i)" ><v-icon left>mdi-calendar</v-icon>{{a.toLocaleString($language.current)}}</v-chip>
							</v-col>
						</v-row>
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
			editingProfile: false,
			appointments: [
				new Date('2021-05-10T08:00'),
				new Date('2021-05-17T08:30'),
			]
		}
	},
	computed: {
		user() {
			return this.$store.getters.user
		}
	},
	methods: {
		saveProfile() {
			this.editingProfile = false
			this.$emit('snackbar', this.$gettext('Profile saved'))
		},
		removeAppointment(i) {
			if(window.confirm(this.$gettext('Are you sure you want to remove this appointment?'))) {
				
				this.appointments.splice(i, 1)
			}
		},
	},
}
</script>