import Vue from 'vue'
import VueRouter from 'vue-router'
import Prihlaseni from '../views/Prihlaseni.vue'
import Registrace from '../views/Registrace.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Prihlaseni
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/registrace',
        component: Registrace
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router