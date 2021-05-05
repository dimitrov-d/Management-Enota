import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
	plugins: [createPersistedState({ storage: window.localStorage })],
	state: {
		token: null,
		user: {},
		lang: 'en',
	},
	getters: {
		token(state) {
			return state.token
		},
		loggedIn(state) {
			return state.token != null
		},
		user(state) {
			return state.user
		},
		lang(state) {
			return state.lang
		},
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		setUser(state, user) {
			state.user = user
		},
		setLang(state, lang) {
			state.lang = lang
		},
		logout(state) {
			state.user = {},
			state.token = null
		}
	}
})