import Vue from 'vue'

export default {
	'studentVisa': {
		name: () => Vue.prototype.$gettext && Vue.prototype.$gettext('Student Visa'),
		requirements: {
			'applicationForm': () => Vue.prototype.$gettext && Vue.prototype.$gettext('Application form'),
			'idCardScan': () => Vue.prototype.$gettext && Vue.prototype.$gettext('ID card scan'),
			'bankStatements': () => Vue.prototype.$gettext && Vue.prototype.$gettext('Bank statements'),
		},
	},
	'workVisa': {
		name: () => Vue.prototype.$gettext && Vue.prototype.$gettext('Work Visa'),
		requirements: {
			'applicationForm': () => Vue.prototype.$gettext && Vue.prototype.$gettext('Application form'),
			'idCardScan': () => Vue.prototype.$gettext && Vue.prototype.$gettext('ID card scan'),
		}
	},
	'temporaryResidence': {
		name: () => Vue.prototype.$gettext && Vue.prototype.$gettext('Temporary Residence'),
		requirements: {
			'applicationForm': () => Vue.prototype.$gettext && Vue.prototype.$gettext('Application form'),
		}
	},
}