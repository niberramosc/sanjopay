<template>
  <div class="p-4">

    <h2 class="mb-3">Gestión de Estudiantes</h2>

    <!-- TABLA ESTUDIANTES -->
    <table class="table table-bordered table-hover bg-white">
      <thead class="table-light">
        <tr>
          <th>Código</th>
          <th>Nombre Estudiante</th>
          <th>Estado</th>
          <th>Saldo</th>
        </tr>
      </thead>

      <tbody>
        <tr 
          v-for="e in estudiantes"
          :key="e.codigo"
          @click="selectEstudiante(e)"
          style="cursor:pointer"
          :class="{ 'table-primary': estudianteSeleccionado?.codigo === e.codigo }"
        >
          <td>{{ e.codigo }}</td>
          <td>{{ e.nombre }}</td>
          <td>
            <span class="badge" :class="e.estado === 'ACTIVO' ? 'bg-success' : 'bg-secondary'">
              {{ e.estado }}
            </span>
          </td>
          <td>$ {{ e.saldo.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <!-- TABLA ALIMENTOS -->
    <div v-if="estudianteSeleccionado" class="mt-4">

      <h5>
        Alimentos - {{ estudianteSeleccionado.nombre }}

        <i
          class="bi bi-plus-circle-fill text-primary fs-4 ms-3 cursor"
          @click="openCreate()"
        ></i>
      </h5>

      <table class="table table-bordered table-hover bg-white mt-2">
        <thead class="table-light">
          <tr>
            <th>Código</th>
            <th>Código Estudiante</th>
            <th>Nombre Alimento</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="a in alimentosFiltrados" :key="a.codigo">
            <td>{{ a.codigo }}</td>
            <td>{{ a.codigoEstudiante }}</td>
            <td>{{ a.nombre }}</td>
            <td class="text-center">
              <i
                class="bi bi-pencil-square text-warning fs-5 me-3 cursor"
                @click="openEdit(a)"
              ></i>

              <i
                class="bi bi-trash-fill text-danger fs-5 cursor"
                @click="deleteAlimento(a)"
              ></i>
            </td>
          </tr>

          <tr v-if="alimentosFiltrados.length === 0">
            <td colspan="4" class="text-center text-muted">
              No hay alimentos registrados
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL CREAR / EDITAR -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-bg">
        <div class="modal-box">

          <h5 class="mb-3">
            {{ editing ? 'Editar Alimento' : 'Agregar Alimento' }}
          </h5>

          <select v-model="form.nombre" class="form-select mb-3">
            <option value="">Seleccione un alimento</option>
            <option v-for="a in catalogoAlimentos" :key="a" :value="a">
              {{ a }}
            </option>
          </select>

          <div class="text-end">
            <button class="btn btn-secondary me-2" @click="closeModal">
              Cancelar
            </button>
            <button class="btn btn-success" @click="saveAlimento">
              Guardar
            </button>
          </div>

        </div>
      </div>
    </Teleport>

    <!-- MODAL CONFIRMACIÓN ELIMINAR -->
    <Teleport to="body">
      <div v-if="showDeleteModal" class="modal-bg">
        <div class="modal-box text-center">

          <h5 class="mb-3">¿Eliminar alimento?</h5>

          <p>
            Está a punto de eliminar
            <b>{{ alimentoToDelete?.nombre }}</b>
          </p>

          <div class="mt-4 text-end">
            <button
              class="btn btn-secondary me-2"
              @click="showDeleteModal = false"
            >
              Cancelar
            </button>

            <button
              class="btn btn-danger"
              @click="confirmDelete"
            >
              Eliminar
            </button>
          </div>

        </div>
      </div>
    </Teleport>


  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const showDeleteModal = ref(false);
const alimentoToDelete = ref(null);

/* =======================
   ESTUDIANTES
======================= */
const estudiantes = ref([
  { codigo: 1, nombre: "Carlos Pérez", estado: "ACTIVO", saldo: 15000 },
  { codigo: 2, nombre: "Ana Torres", estado: "ACTIVO", saldo: 22000 },
]);

const estudianteSeleccionado = ref(null);

const selectEstudiante = (e) => {
  estudianteSeleccionado.value = e;
};

/* =======================
   ALIMENTOS
======================= */
const catalogoAlimentos = ref([
  "Hamburguesa",
  "Pizza",
  "Empanada",
  "Jugo",
  "Sandwich",
]);

const alimentos = ref([
  { codigo: 1, codigoEstudiante: 1, nombre: "Hamburguesa" },
  { codigo: 2, codigoEstudiante: 1, nombre: "Jugo" },
]);

const alimentosFiltrados = computed(() => {
  if (!estudianteSeleccionado.value) return [];
  return alimentos.value.filter(
    a => a.codigoEstudiante === estudianteSeleccionado.value.codigo
  );
});

/* =======================
   MODAL
======================= */
const showModal = ref(false);
const editing = ref(false);

const form = ref({
  codigo: null,
  nombre: "",
});

const openCreate = () => {
  editing.value = false;
  form.value = { codigo: null, nombre: "" };
  showModal.value = true;
};

const openEdit = (a) => {
  editing.value = true;
  form.value = { ...a };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

/* =======================
   CRUD
======================= */
const saveAlimento = () => {
  if (!form.value.nombre) {
    alert("Seleccione un alimento");
    return;
  }

  if (editing.value) {
    const index = alimentos.value.findIndex(a => a.codigo === form.value.codigo);
    alimentos.value[index].nombre = form.value.nombre;
  } else {
    const newCodigo = alimentos.value.length
      ? alimentos.value[alimentos.value.length - 1].codigo + 1
      : 1;

    alimentos.value.push({
      codigo: newCodigo,
      codigoEstudiante: estudianteSeleccionado.value.codigo,
      nombre: form.value.nombre,
    });
  }

  showModal.value = false;
};

const deleteAlimento = (a) => {
  alimentoToDelete.value = a;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  alimentos.value = alimentos.value.filter(
    a => a.codigo !== alimentoToDelete.value.codigo
  );
  showDeleteModal.value = false;
};

</script>
