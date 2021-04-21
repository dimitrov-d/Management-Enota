import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from './store'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Applications from './components/Applications.vue'
import Appointments from './components/Appointments.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/Login', name: 'Login', component: Login, meta: { requiresVisitor: true } },
	{ path: '/', name: 'Home', component: Home },
	{ path: '/Applications', name: 'Applications', component: Applications },
	{ path: '/Appointments', name: 'Appointments', component: Appointments },
	{ path: '*', redirect: '/' },
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