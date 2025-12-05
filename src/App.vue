<script setup>
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()

const items = [
  {
    label: 'Inicio',
    icon: 'pi pi-home',
    command: () => router.push('/'),
  },
  {
    label: 'Contactos',
    icon: 'pi pi-users',
    command: () => router.push('/contactos'),
  },
  {
    label: 'Acerca',
    icon: 'pi pi-info-circle',
    command: () => router.push('/about'),
  },

]
</script>

<template>
  <header >
    <Menubar :model="items"/>
  </header>
  <Toast />
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style>
.app-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.layout {
  max-width: 1100px;
  margin: 0 auto;
}

.p-menubar {
  border-radius: 0;
  display: flex;
  justify-content: center;
}
</style>
