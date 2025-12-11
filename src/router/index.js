import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/LoginView.vue'

import DashboardLayout from '../layouts/DashboardLayout.vue'
import UsuariosView from '../views/UsuarioView.vue'
import GestionaEstudianteView from '../views/GestionEstudianteView.vue'
import DashboardHomeView from '../views/DashboardHomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
        { 
            path: '',
            component: DashboardHomeView
        },
        {
            path: 'usuarios',
            name: 'Usuarios',
            component: UsuariosView
        },
        {
            path: 'gestiona-estudiante',
            name: 'GestionaEstudiante',
            component: GestionaEstudianteView
        },
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
