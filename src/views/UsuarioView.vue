<template>
  <div class="p-4">

    <h2 class="mb-3">Gestión de Usuarios</h2>

    <!-- BOTÓN CREAR -->
    <button class="btn btn-primary mb-3" @click="openCreate">
      Crear Usuario
    </button>

    <!-- TABLA -->
    <table class="table table-bordered table-hover bg-white">
      <thead class="table-light">
        <tr>
          <th>Código</th>
          <th>Usuario</th>
          <th>Cédula</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Celular</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in users" :key="u.codigo">
          <td>{{ u.codigo }}</td>
          <td>{{ u.usuario }}</td>
          <td>{{ u.cedula }}</td>
          <td>{{ u.nombre }}</td>
          <td>{{ u.correo }}</td>
          <td>{{ u.celular }}</td>
          <td class="text-center">

            <i class="bi bi-pencil-square text-warning fs-5 me-3 cursor"
               @click="openEdit(u)"></i>

            <i class="bi bi-trash-fill text-danger fs-5 cursor"
               @click="confirmDelete(u)"></i>

          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL CREAR / EDITAR -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-bg">
        <div class="modal-box">

          <h5 class="mb-3">
            {{ editing ? 'Editar Usuario' : 'Crear Usuario' }}
          </h5>

          <input v-model="form.usuario" class="form-control mb-2" placeholder="Usuario">
          <input v-model="form.cedula" class="form-control mb-2" placeholder="Cédula">
          <input v-model="form.nombre" class="form-control mb-2" placeholder="Nombre">
          <input v-model="form.correo" class="form-control mb-2" placeholder="Correo">
          <input v-model="form.celular" class="form-control mb-3" placeholder="Celular">

          <div class="text-end">
            <button class="btn btn-secondary me-2" @click="closeModal">
              Cancelar
            </button>
            <button class="btn btn-success" @click="saveUser">
              Guardar
            </button>
          </div>

        </div>
      </div>
    </Teleport>

    <!-- MODAL ELIMINAR -->
    <Teleport to="body">
      <div v-if="showDeleteModal" class="modal-bg">
        <div class="modal-box text-center">

          <h5>¿Eliminar usuario?</h5>
          <p class="mb-3"><b>{{ userToDelete?.nombre }}</b></p>

          <button class="btn btn-secondary me-2"
                  @click="showDeleteModal = false">
            Cancelar
          </button>

          <button class="btn btn-danger" @click="deleteUser">
            Eliminar
          </button>

        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref } from "vue";

const users = ref([
  { codigo: 1, usuario: "jdoe", cedula: "111", nombre: "John Doe", correo: "jdoe@mail.com", celular: "3000000000" },
  { codigo: 2, usuario: "maria", cedula: "222", nombre: "María Gómez", correo: "maria@mail.com", celular: "3011111111" },
]);

const showModal = ref(false);
const showDeleteModal = ref(false);
const editing = ref(false);
const userToDelete = ref(null);

const form = ref({
  codigo: null,
  usuario: "",
  cedula: "",
  nombre: "",
  correo: "",
  celular: "",
});

const openCreate = () => {
  editing.value = false;
  form.value = {};
  showModal.value = true;
};

const openEdit = (u) => {
  editing.value = true;
  form.value = { ...u };
  showModal.value = true;
};

const saveUser = () => {
  if (editing.value) {
    const i = users.value.findIndex(x => x.codigo === form.value.codigo);
    users.value[i] = { ...form.value };
  } else {
    form.value.codigo = users.value.length + 1;
    users.value.push({ ...form.value });
  }
  showModal.value = false;
};

const confirmDelete = (u) => {
  userToDelete.value = u;
  showDeleteModal.value = true;
};

const deleteUser = () => {
  users.value = users.value.filter(u => u.codigo !== userToDelete.value.codigo);
  showDeleteModal.value = false;
};

const closeModal = () => {
  showModal.value = false;
};
</script>
