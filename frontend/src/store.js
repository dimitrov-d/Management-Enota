import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
	plugins: [createPersistedState({ storage: window.localStorage })],
	state: {
		user: null,
	},
	getters: {
		user(state) {
			return state.user
		}
	},
	mutations: {
		setUser(state, user) {
			state.user = user
		}
	}
})