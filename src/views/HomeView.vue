<template>
  <div>
    <!-- Hero Section -->
    <Card class="mb-4">
      <template #content>
        <div class="flex flex-column align-items-center text-center py-5">
          <Avatar icon="pi pi-users" size="xlarge" class="mb-3" />
          <h1 class="text-4xl font-bold m-0 mb-2">Gestión de Contactos</h1>
          <p class="text-xl text-600 mb-4">Sistema completo de administración de contactos con Vue 3, PrimeVue y Pinia
          </p>
          <div class="flex gap-2">
            <Button label="Ver Contactos" icon="pi pi-users" @click="$router.push({ name: 'contactos' })"
              size="large" />
            <Button label="Nuevo Contacto" icon="pi pi-plus" severity="success" outlined
              @click="$router.push({ name: 'contacto-nuevo' })" size="large" />
          </div>
        </div>
      </template>
    </Card>

    <!-- Características -->
    <div class="grid">
      <div class="col-12 md:col-4">
        <Card>
          <template #content>
            <div class="flex flex-column align-items-center text-center p-3">
              <Avatar icon="pi pi-search" class="mb-3" size="xlarge"
                style="background-color: var(--blue-100); color: var(--blue-600);" />
              <h3 class="m-0 mb-2">Búsqueda Rápida</h3>
              <p class="text-600 m-0">Encuentra contactos por nombre o email al instante</p>
            </div>
          </template>
        </Card>
      </div>

      <div class="col-12 md:col-4">
        <Card>
          <template #content>
            <div class="flex flex-column align-items-center text-center p-3">
              <Avatar icon="pi pi-star-fill" class="mb-3" size="xlarge"
                style="background-color: var(--yellow-100); color: var(--yellow-600);" />
              <h3 class="m-0 mb-2">Favoritos</h3>
              <p class="text-600 m-0">Marca contactos importantes como favoritos</p>
            </div>
          </template>
        </Card>
      </div>

      <div class="col-12 md:col-4">
        <Card>
          <template #content>
            <div class="flex flex-column align-items-center text-center p-3">
              <Avatar icon="pi pi-shield" class="mb-3" size="xlarge"
                style="background-color: var(--purple-100); color: var(--purple-600);" />
              <h3 class="m-0 mb-2">Gestión Segura</h3>
              <p class="text-600 m-0">CRUD completo con validación de datos</p>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Estadísticas -->
    <Card class="mt-4">
      <template #title>
        <div class="flex align-items-center gap-2">
          <i class="pi pi-chart-bar"></i>
          <span>Estadísticas</span>
        </div>
      </template>
      <template #content>
        <div class="grid">
          <div class="col-12 md:col-4">
            <Panel>
              <template #header>
                <div class="flex justify-content-between align-items-center w-full">
                  <span class="text-500">Total Contactos</span>
                  <Badge :value="contactosStore.contactos.length" severity="info" size="large" />
                </div>
              </template>
              <div class="text-900 font-bold text-4xl text-center">{{ contactosStore.contactos.length }}</div>
            </Panel>
          </div>

          <div class="col-12 md:col-4">
            <Panel>
              <template #header>
                <div class="flex justify-content-between align-items-center w-full">
                  <span class="text-500">Contactos Activos</span>
                  <Badge :value="contactosActivos" severity="success" size="large" />
                </div>
              </template>
              <div class="text-900 font-bold text-4xl text-center">{{ contactosActivos }}</div>
            </Panel>
          </div>

          <div class="col-12 md:col-4">
            <Panel>
              <template #header>
                <div class="flex justify-content-between align-items-center w-full">
                  <span class="text-500">Favoritos</span>
                  <Badge :value="contactosFavoritos" severity="warning" size="large" />
                </div>
              </template>
              <div class="text-900 font-bold text-4xl text-center">
                <i class="pi pi-star-fill text-yellow-500 mr-2"></i>{{ contactosFavoritos }}
              </div>
            </Panel>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useContactosStore } from '@/stores/useContactosStore'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Panel from 'primevue/panel'

const contactosStore = useContactosStore()

const contactosActivos = computed(() => contactosStore.contactosActivos)
const contactosFavoritos = computed(() => contactosStore.totalFavoritos)
</script>