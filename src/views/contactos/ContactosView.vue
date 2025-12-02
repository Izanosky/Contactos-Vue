<template>
    <div class="card">
        <DataTable :value="contactos" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Listado de Pedidos</span>
                </div>
            </template>
            <Column field="nombre" sortable header="Nombre"></Column>
            <Column field="email" sortable header="Email"></Column>
            <Column field="telefono" sortable header="Telefono">
            
                
            </Column>
            <Column field="estado" sortable header="Estado">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.estado" :severity="getSeverity(slotProps.data.estado)" />
                </template>
            </Column>
            <Column field="favorito" sortable header="Favorito"></Column>
            <Column field="acciones" header="Acciones">
                <template #body="slotProps">
                    <router-link :to="`/products/${slotProps.data.id}`">
                        <Button label="Ver" class="p-button-text p-mr-2"></Button>
                    </router-link>
                </template> 
            </Column>
            <template #footer> 
                En total hay {{ contactos ? contactos.length : 0 }} pedidos. 
            </template>
        </DataTable>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useContactosStore } from '@/stores/useContactosStore';

const contactosStore = useContactosStore();
const { contactos } = storeToRefs(contactosStore);

const getSeverity = (estado) => {
    switch (estado) {
        case 'Activo':
        case 'activo':
        case 'ACTIVO':
            return 'success';

        case 'Inactivo':
        case 'inactivo':
        case 'INACTIVO':
            return 'danger';

        default:
            return 'info';
    }
};
</script>

<style scoped></style>
