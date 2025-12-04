<template>
  <div>
    <Card>
      <template #content>
        <div class="flex flex-column align-items-center text-center py-5">
          <Avatar icon="pi pi-info-circle" size="xlarge" class="mb-3" />
          <h1 class="text-4xl font-bold m-0 mb-2">Acerca del Proyecto</h1>
          <p class="text-xl text-600 mb-4">
            Sistema de gestión de contactos desarrollado con las últimas tecnologías web
          </p>
        </div>
      </template>
    </Card>

    <div class="grid mt-4">
      <div class="col-12 md:col-6">
        <Panel header="Tecnologías" toggleable>
          <template #icons>
            <i class="pi pi-code"></i>
          </template>
          <div class="flex flex-column gap-3">
            <Chip label="Vue 3 - Framework JavaScript progresivo" icon="pi pi-check-circle" />
            <Chip label="PrimeVue - Librería de componentes UI" icon="pi pi-check-circle" />
            <Chip label="Vue Router - Enrutamiento oficial" icon="pi pi-check-circle" />
            <Chip label="Pinia - Gestión de estado" icon="pi pi-check-circle" />
            <Chip label="Vite - Build tool moderno" icon="pi pi-check-circle" />
          </div>
        </Panel>
      </div>

      <div class="col-12 md:col-6">
        <Panel header="Características" toggleable>
          <template #icons>
            <i class="pi pi-star"></i>
          </template>
          <div class="flex flex-column gap-3">
            <Chip label="CRUD completo de contactos" icon="pi pi-check-circle" />
            <Chip label="Búsqueda y filtrado en tiempo real" icon="pi pi-check-circle" />
            <Chip label="Sistema de favoritos" icon="pi pi-check-circle" />
            <Chip label="Validación de formularios" icon="pi pi-check-circle" />
            <Chip label="Diseño responsive y dark mode" icon="pi pi-check-circle" />
          </div>
        </Panel>
      </div>
    </div>

    <Card class="mt-4">
      <template #title>
        <div class="flex align-items-center gap-2">
          <i class="pi pi-github"></i>
          <span>Información del Proyecto</span>
        </div>
      </template>
      <template #content>
        <div class="grid">
          <div class="col-12 md:col-4">
            <div class="text-center p-3">
              <Badge value="1.0.0" severity="info" size="large" class="mb-2" />
              <div class="text-600">Versión</div>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="text-center p-3">
              <Tag value="Vue Team" severity="success" class="mb-2" />
              <div class="text-600">Izan Jiménez Chaves (y Copilot pa dejarlo to guapo)</div>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="text-center p-3">
              <Tag value="2025" severity="secondary" class="mb-2" />
              <div class="text-600">Año</div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import Panel from 'primevue/panel';
import Chip from 'primevue/chip';
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';
</script>
