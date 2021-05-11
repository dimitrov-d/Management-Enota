import Vue from 'vue'

function t(s) {
	return Vue.prototype.$gettext(s)
}

export default {
	'studentVisa': {
		name: () => t('Student Visa'),
		requirements: {
			'applicationForm': () => t('Application form'),
			'idCardScan': () => t('ID card scan'),
			'bankStatements': () => t('Bank statements'),
		},
	},
	'workVisa': {
		name: () => t('Work Visa'),
		requirements: {
			'applicationForm': () => t('Application form'),
			'idCardScan': () => t('ID card scan'),
		}
	},
	'temporaryResidence': {
		name: () => t('Temporary Residence'),
		requirements: {
			'applicationForm': () => t('Application form'),
		}
	},
}