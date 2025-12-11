<template>
  <div class="min-vh-100 d-flex align-items-center bg-light">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 d-none d-md-block">
          <img 
            src="/src/assets/logo.png" 
            alt="Login Illustration" 
            class="img-fluid rounded"
          />
        </div>
        <div class="col-md-4">
          <div class="card shadow p-4">
            <h3 class="text-center mb-3">Iniciar sesión</h3>

            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label class="form-label">Usuario</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="username"
                  required 
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input 
                  type="password" 
                  class="form-control" 
                  v-model="password"
                  required 
                />
              </div>
              <p v-if="errorMessage" class="text-danger small">{{ errorMessage }}</p>
              <button type="submit" class="btn btn-primary w-100 mt-2">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const onSubmit = () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Todos los campos son obligatorios'
    return
  }

  // Aquí va la futura llamada al backend
  // Por ahora simulamos autenticación
  if (username.value === 'ADMIN' && password.value === '12345') {
    router.push('/dashboard')
  } else {
    errorMessage.value = 'Usuario o contraseña incorrectos'
  }
}
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
