<template>
  <div class="layout-container">
    <!-- SIDEBAR IZQUIERDO -->
    <aside class="sidebar bg-dark text-white">
      <h4 class="p-3">SanjoPay</h4>

      <ul class="nav flex-column px-2">
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/dashboard/usuarios">Usuarios</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/dashboard/gestiona-estudiante">Gestionar Estudiante</router-link>
        </li>
      </ul>
    </aside>
    <!-- CONTENIDO PRINCIPAL -->
    <div class="content-area">
      <!-- NAVBAR SUPERIOR -->
      <nav class="navbar navbar-light bg-white shadow-sm top-navbar">
        <div class="container-fluid">
          <span class="navbar-brand">Panel de Control</span>
          <div>
            <span class="me-3">👤 ADMIN</span>
            <button class="btn btn-outline-danger btn-sm" @click="logout">
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>
      <!-- CONTENIDO PRINCIPAL DINÁMICO -->
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  router.push("/login");
};
</script>

<style scoped>
/* ===== Layout general ===== */
.layout-container {
  display: flex;
}

/* ===== Sidebar fijo ===== */
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 70px; /* espacio para navbar */
}

/* ===== Navbar fijo arriba ===== */
.top-navbar {
  position: fixed;
  top: 0;
  left: 250px; /* ancho del sidebar */
  width: calc(100% - 250px);
  z-index: 1000;
}

/* ===== Área de contenido ===== */
.content-area {
  margin-left: 250px; /* deja espacio al sidebar */
  width: calc(100% - 250px);
}

/* Contenido debajo del navbar */
.page-content {
  margin-top: 70px; /* altura del navbar */
  padding: 20px;
}

/* Estilo para el link activo */
.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
