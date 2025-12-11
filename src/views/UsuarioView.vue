<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Gestión de Usuarios</h2>

    <!-- BOTÓN CREAR -->
    <button 
      @click="openCreate()"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
    >
      Crear Usuario
    </button>

    <!-- TABLA -->
    <table class="min-w-full border border-gray-300 bg-white">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-4 py-2">Código</th>
          <th class="border px-4 py-2">Usuario</th>
          <th class="border px-4 py-2">Cédula</th>
          <th class="border px-4 py-2">Nombre</th>
          <th class="border px-4 py-2">Correo</th>
          <th class="border px-4 py-2">Celular</th>
          <th class="border px-4 py-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in users" :key="u.codigo" class="hover:bg-gray-50">
          <td class="border px-4 py-2">{{ u.codigo }}</td>
          <td class="border px-4 py-2">{{ u.usuario }}</td>
          <td class="border px-4 py-2">{{ u.cedula }}</td>
          <td class="border px-4 py-2">{{ u.nombre }}</td>
          <td class="border px-4 py-2">{{ u.correo }}</td>
          <td class="border px-4 py-2">{{ u.celular }}</td>

          <td class="border px-4 py-2 text-center space-x-3">
            <!-- EDITAR ICONO -->
            <i 
              class="bi bi-pencil-square text-yellow-600 text-2xl cursor-pointer hover:text-yellow-800"
              @click="openEdit(u)"
            ></i>

            <!-- ELIMINAR ICONO -->
            <i 
              class="bi bi-trash-fill text-red-600 text-2xl cursor-pointer hover:text-red-800"
              @click="confirmDelete(u)"
            ></i>
          </td>

        </tr>
      </tbody>
    </table>

    <!-- MODAL CREAR/EDITAR -->
    <div 
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded shadow-xl w-96">
        <h3 class="text-xl font-bold mb-3">
          {{ editing ? "Editar Usuario" : "Crear Usuario" }}
        </h3>

        <form @submit.prevent="saveUser">
          <input v-model="form.usuario" placeholder="Usuario"
            class="w-full border p-2 mb-2 rounded" />

          <input v-model="form.cedula" placeholder="Cédula"
            class="w-full border p-2 mb-2 rounded" />

          <input v-model="form.nombre" placeholder="Nombre"
            class="w-full border p-2 mb-2 rounded" />

          <input v-model="form.correo" placeholder="Correo"
            class="w-full border p-2 mb-2 rounded" />

          <input v-model="form.celular" placeholder="Celular"
            class="w-full border p-2 mb-4 rounded" />

          <div class="flex justify-end space-x-2">
            <button 
              type="button"
              @click="closeModal"
              class="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>

            <button 
              type="submit"
              class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL CONFIRMACIÓN ELIMINAR -->
    <div 
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded shadow-xl w-80 text-center">
        <h3 class="text-xl font-bold mb-3">¿Eliminar usuario?</h3>

        <p class="mb-4">
          Estás a punto de eliminar <b>{{ userToDelete?.nombre }}</b>.
        </p>

        <div class="flex justify-center space-x-3">
          <button 
            @click="showDeleteModal = false"
            class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>

          <button 
            @click="deleteUser()"
            class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

// Datos mock
const users = ref([
  { codigo: 1, usuario: "jdoe", cedula: "111", nombre: "John Doe", correo: "jdoe@mail.com", celular: "3000000000" },
  { codigo: 2, usuario: "maria", cedula: "222", nombre: "María Gómez", correo: "maria@mail.com", celular: "3011111111" },
]);

// Modal crear/editar
const showModal = ref(false);
const editing = ref(false);

// Modal eliminar
const showDeleteModal = ref(false);
const userToDelete = ref(null);

// Modelo formulario
const form = ref({
  codigo: null,
  usuario: "",
  cedula: "",
  nombre: "",
  correo: "",
  celular: "",
});

// Abrir modal crear
const openCreate = () => {
  editing.value = false;
  form.value = { codigo: null, usuario: "", cedula: "", nombre: "", correo: "", celular: "" };
  showModal.value = true;
};

// Abrir modal editar
const openEdit = (u) => {
  editing.value = true;
  form.value = { ...u };
  showModal.value = true;
};

// Guardar (crear o editar)
const saveUser = () => {
  if (editing.value) {
    const index = users.value.findIndex(x => x.codigo === form.value.codigo);
    users.value[index] = { ...form.value };
  } else {
    const newCodigo = users.value.length ? users.value[users.value.length - 1].codigo + 1 : 1;
    users.value.push({ ...form.value, codigo: newCodigo });
  }

  showModal.value = false;
};

// Abrir confirmación de eliminación
const confirmDelete = (u) => {
  userToDelete.value = u;
  showDeleteModal.value = true;
};

// Eliminar usuario
const deleteUser = () => {
  users.value = users.value.filter(u => u.codigo !== userToDelete.value.codigo);
  showDeleteModal.value = false;
};

// Cerrar modal
const closeModal = () => {
  showModal.value = false;
};
</script>

<style>
/* Con Tailwind no necesitas más CSS */
</style>
