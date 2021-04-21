import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
	plugins: [createPersistedState({ storage: window.localStorage })],
	state: {
		token: null,
	},
	getters: {
		loggedIn(state) {
			return state.token != null
		}
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		}
	}
})