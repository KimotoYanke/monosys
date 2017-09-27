import VueRouter from 'vue-router'
import ThingPage from './pages/thing.vue'
import IndexPage from './pages/index.vue'
import LoginPage from './pages/login.vue'

const routes = [
    { path: '/', redirect: '/index' },
    { path: '/index', component: IndexPage },
    { path: '/thing', component: ThingPage },
    { path: '/login', component: LoginPage }
]

const router = new VueRouter({
    routes
})

export default router
