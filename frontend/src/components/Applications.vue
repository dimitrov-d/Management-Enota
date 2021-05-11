<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<v-row justify="center">
					<v-card outlined class="ma-5" width="671px">
						<v-card-title><translate>Select an application</translate></v-card-title>
						<v-card-text>
							<v-select @change="setDocuments" :items="types" v-model="application.applicationType" :placeholder="$gettext('Application type')" outlined dense></v-select>
						</v-card-text>
					</v-card>
				</v-row>
				<v-row v-if="application.applicationType && applications[application.applicationType]" justify="center">
					<v-card outlined class="ma-5 mt-0" width="671px">
						<v-card-title>{{applications[application.applicationType].name()}}</v-card-title>
						<v-card-text>
							<v-card outlined>
								<v-card-title>
									<translate>Fill in the required forms and upload them with all other documents below.</translate>
								</v-card-title>
								<v-card-text>
									<v-btn dark depressed>
										<v-icon>mdi-download</v-icon>
										<translate>Download forms</translate>
									</v-btn>
								</v-card-text>
							</v-card>
						</v-card-text>
						<v-card-text v-for="(requirement,i) in applications[application.applicationType].requirements" :key="i">
							<v-card outlined>
								<v-card-title>
									<v-badge icon="mdi-exclamation-thick" :value="application.documents[requirement.name] == null" inline color="error">
										{{requirement()}}
									</v-badge>
								</v-card-title>
								<v-card-text>
									<v-file-input @change="filesChanged" v-model="application.documents[requirement.name]" prepend-icon="mdi-file" outlined dense clearable></v-file-input>
								</v-card-text>
							</v-card>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn @click="submitApplication" color="success" depressed :disabled="submitDisabled"><translate>Submit application</translate></v-btn>
						</v-card-actions>
					</v-card>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from 'axios'
import applications from '../applications'
export default {
	name: 'Applications',
	data() {
		return {
			application: {
				applicationType: null,
				documents: {}
			},
			submitDisabled: true
		}
	},
	computed: {
		applications() {
			return applications
		},
		types() {
			var t = [{
				text: this.$gettext('Application type'),
				value: null
			}]
			Object.keys(applications).forEach(a => {
				t.push({
					text: applications[a].name(),
					value: a
				})
			})
			return t
		},
	},
	methods: {
		submitApplication() {
			axios.post(
				'http://localhost:3123/applications/addApplication',
				this.application,
				{ headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.getters.token } })
				.then(() => {
					this.$emit('snackbar', this.$gettext('Submission sent'))
					this.$router.push('/')
				})
				.catch(error => {
					this.$emit('snackbar', error.message, 'error')
				})
		},
		setDocuments() {
			this.application.documents = {}
			Object.keys(applications[this.application.applicationType].requirements).forEach(r => {
				this.application.documents[r] = null
			})
		},
		filesChanged() {
			this.submitDisabled = Object.values(this.application.documents).some(d => d == null)
			this.$forceUpdate()
		}
	},
}
</script>