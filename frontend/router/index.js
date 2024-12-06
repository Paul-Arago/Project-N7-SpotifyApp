import { createRouter, createWebHistory } from 'vue-router';
import Home from '/src/components/Home.vue';
import Login from '/src/components/Login.vue';

const routes = [
    {
        path: '/',
        component: Login,
    },
    {
       path: '/home',
       component: Home,
    },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
 })
 
export default router