import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from './store'

import Login from './components/Login.vue'
import Home from './components/Home.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'Login', component: Login, meta: { requiresVisitor: true } },
	{ path: '/Home', name: 'Home', component: Home },
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
    if (!to.matched.some(record => record.meta.requiresVisitor)) {
        if (!store.getters.loggedIn) {
            next({ name: 'Login' });
        } else {
            next();
        }
    } else {
        if (store.getters.loggedIn) {
            next({ name: 'Home' });
        } else {
            next();
        }
    }
})

export default router