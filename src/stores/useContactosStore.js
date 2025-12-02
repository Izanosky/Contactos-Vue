import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'

export const useContactosStore = defineStore('contactos', {

  state: () => ({
    contactos: [
      {
        ID: generarIdSeguro(), nombre: 'Juan Perez', email: 'juan.perez@example.com', telefono: '555-1234',
        empresa: 'Empresa A', favorito: false, estado: 'Inactivo'
      },
    ],
    seleccionado: null,
  }),
  getters: {
    totalContactos: (state) => state.pedidos.length,
    contactoActual: (state) => state.pedidos.find((contacto) => contacto.ID === state.seleccionado),
    contactoById: (state) => {
      return (id) => state.pedidos.find(contacto => contacto.ID === id);
    },
  },
  actions: {
    seleccionarPorId(id) {
      this.seleccionado = id
    },
  }
})

function generarIdSeguro() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}