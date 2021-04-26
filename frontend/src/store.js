import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
	plugins: [createPersistedState({ storage: window.localStorage })],
	state: {
		token: null,
		lang: 'en',
	},
	getters: {
		loggedIn(state) {
			return state.token != null
		},
		lang(state) {
			return state.lang
		},
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		setLang(state, lang) {
			state.lang = lang
		},
	}
})