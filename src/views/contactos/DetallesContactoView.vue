<template>
    <div>
        <h2>Detalles del Contacto</h2>
        <div v-cloak>
            <h3>{{ contacto.nombre }}</h3>
            <p><strong>Email:</strong> {{ contacto.email }}</p>
            <p><strong>Teléfono:</strong> {{ contacto.telefono }}</p>
            <p><strong>Empresa:</strong> {{ contacto.empresa }}</p>
            <p><strong>Estado:</strong> {{ contacto.estado }}</p>
            <p><strong>Favorito:</strong> {{ contacto.favorito ? 'Sí' : 'No' }}</p>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useContactosStore } from '@/stores/useContactosStore';

const route = useRoute();
const contactoID = computed(() => {
    console.log("Contacto ID:", route.params.id);
    return route.params.id;
});

const contactosStore = useContactosStore();
const { contactos } = storeToRefs(contactosStore);
const contacto = computed(() => {
    return contactos.value.find(c => c.ID === parseInt(contactoID.value));
});

</script>
<style scoped></style>