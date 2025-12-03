import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'

export const useContactosStore = defineStore('contactos', {

  state: () => ({
    contactos: [
      {
        ID: 1, nombre: 'Juan Perez', email: 'juan.perez@example.com', telefono: '555-1234',
        empresa: 'Empresa A', favorito: false, estado: 'Inactivo'
      },
      {
        ID: 2, nombre: 'Maria Gomez', email: 'hola@example.com', telefono: '555-5678',
        empresa: 'Empresa B', favorito: true, estado: 'Activo'
      },
      {
        ID: 3, nombre: 'Carlos Lopez', email: 'carlos.lopez@example.com', telefono: '555-9012',
        empresa: 'Empresa C', favorito: false, estado: 'Activo'
      },
      {
        ID: 4, nombre: 'Ana Martinez', email: 'ana.martinez@example.com', telefono: '555-3456',
        empresa: 'Empresa D', favorito: true, estado: 'Activo'
      },
      {
        ID: 5, nombre: 'Luis Rodriguez', email: 'luis.rodriguez@example.com', telefono: '555-7890',
        empresa: 'Empresa E', favorito: false, estado: 'Inactivo'
      },
      {
        ID: 6, nombre: 'Sofia Fernandez', email: 'sofia.fernandez@example.com', telefono: '555-2468',
        empresa: 'Empresa F', favorito: true, estado: 'Activo'
      },
      {
        ID: 7, nombre: 'Diego Sanchez', email: 'diego.sanchez@example.com', telefono: '555-1357',
        empresa: 'Empresa G', favorito: true, estado: 'Activo'
      },
      {
        ID: 8, nombre: 'Jorge Torres', email: 'jorge.torres@example.com', telefono: '555-8642',
        empresa: 'Empresa H', favorito: true, estado: 'Inactivo'
      },
    ],
    seleccionado: null,
  }),
  getters: {
    totalContactos: (state) => state.pedidos.length,
    totalFavoritos: (state) => state.contactos.filter(c => c.favorito).length,
    contactosActivos: (state) => state.contactos.filter(c => c.estado === 'Activo'),

  },
  actions: {
    crearContacto(contacto) {
      this.contactos.push(contacto);
    },
    actualizarContacto(id, contactoActualizado) {
      const index = this.contactos.findIndex(c => c.ID === id);
      if (index !== -1) {
        this.contactos[index] = { ...this.contactos[index], ...contactoActualizado };
      }
    },
    eliminarContacto(id) {
      this.contactos = this.contactos.filter(c => c.ID !== id);
    },
    toggleFavorito(id) {
      const contacto = this.contactos.find(c => c.ID === id);
      if (contacto) {
        contacto.favorito = !contacto.favorito;
      }
    },
    getID () {
      return this.contactos.length + 1;
    }
  }
})

function generarIdSeguro() {
  return parseInt(crypto.getRandomValues(new Uint32Array(1))[0].toString(36));
}