import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import gettext from 'vue-gettext'
import translations from './translations/translations.json'

Vue.use(gettext, {
	availableLanguages: {
		en: 'English',
		sl: 'Slovenščina',
	},
	defaultLanguage: 'en',
	translations: translations
})

Vue.config.productionTip = false

new Vue({
	vuetify,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
