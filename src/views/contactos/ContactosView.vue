<template>
    <Toast />
    <Card>
        <template #content>
            <DataTable :value="contactosFiltrados" paginator :rows="5" 
                :rowsPerPageOptions="[5, 10, 20, 50]" 
                stripedRows tableStyle="min-width: 50rem">
            <template #header>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                    <span class="text-xl font-bold">Contactos</span>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <IconField>
                            <InputIcon class="pi pi-search" />
                            <InputText v-model="valor" placeholder="Buscar por nombre o email" style="width: 300px;" />
                        </IconField>
                        <Button @click="añadir()" severity="info" icon="pi pi-plus" rounded aria-label="Add"
                            v-tooltip.top="'Nuevo'"></Button>
                    </div>
                </div>
            </template>
            <Column field="nombre" sortable header="Nombre"></Column>
            <Column field="email" sortable header="Email"></Column>
            <Column field="telefono" sortable header="Telefono">


            </Column>
            <Column field="estado" sortable header="Estado" alignHeader="center" bodyClass="text-center">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.estado" :severity="getSeverity(slotProps.data.estado)" rounded />
                </template>
            </Column>
            <Column field="favorito" sortable header="Favorito" alignHeader="center" bodyClass="text-center">
                <template #body="slotProps">
                    <Button :icon="slotProps.data.favorito ? 'pi pi-star-fill' : 'pi pi-star'"
                        :class="slotProps.data.favorito ? 'p-button-warning' : 'p-button-outlined'" rounded text
                        @click="contactosStore.toggleFavorito(slotProps.data.ID)" />
                </template>
            </Column>
            <Column field="acciones" header="Acciones" alignHeader="center" bodyClass="text-center">
                <template #body="slotProps">
                    <div class="flex gap-2 justify-center">
                        <ButtonGroup>
                            <Button @click="detalles(slotProps.data.ID)" severity="info" icon="pi pi-search" rounded
                                raised v-tooltip.top="'Detalles'" />
                            <Button @click="editar(slotProps.data.ID)" severity="success" icon="pi pi-pencil" rounded
                                raised v-tooltip.top="'Editar'" />
                            <Button @click="borrar(slotProps.data.ID)" severity="danger" icon="pi pi-times" rounded
                                raised v-tooltip.top="'Borrar'" />
                        </ButtonGroup>
                    </div>
                </template>
            </Column>
            <template #footer>
                En total hay {{ contactosFiltrados ? contactosFiltrados.length : 0 }} contactos.
            </template>
        </DataTable>
        </template>
    </Card>

    <!-- Esto es el popup que sale cuando borramos un contacto -->

    <ConfirmDialog group="headless">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="surface-overlay p-6 border-round" style="text-align: center; max-width: 400px;">
                    <div class="mb-4">
                        <i class="pi pi-exclamation-triangle" style="font-size: 3rem; color: #ef4444;"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-3">{{ message.header }}</h3>
                    <p class="mb-4">{{ message.message }}</p>
                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                        <Button label="Eliminar" @click="acceptCallback" severity="danger" style="flex: 1;"></Button>
                        <Button label="Cancelar" @click="rejectCallback" outlined style="flex: 1;"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useContactosStore } from '@/stores/useContactosStore';
import { router } from '../../router';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Card from 'primevue/card';

const toast = useToast();
const confirm = useConfirm();
const contactosStore = useContactosStore();
const { contactos } = storeToRefs(contactosStore);
const valor = ref('');

const contactosFiltrados = computed(() => {
    if (!valor.value) {
        return contactos.value;
    }

    const filtro = valor.value.toLowerCase();
    return contactos.value.filter(contacto =>
        contacto.nombre.toLowerCase().includes(filtro) ||
        contacto.email.toLowerCase().includes(filtro)
    );
});

const getSeverity = (estado) => {
    switch (estado.toLowerCase()) {
        case 'activo':
            return 'success';

        case 'inactivo':
            return 'danger';

        default:
            return 'info';
    }
};

function detalles(ID) {
    console.log("Navegando a detalles del contacto con ID:", ID);
    router.push({ name: 'contacto-detalle', params: { id: ID } });
}

function añadir() {
    router.push({ name: 'contacto-nuevo' });
}

function editar(ID) {
    console.log("Navegando a editar el contacto con ID:", ID);
    router.push({ name: 'contacto-editar', params: { id: ID } });
}

function borrar(ID) {
    confirm.require({
        message: '¿Estas seguro de que quieres eliminar este contacto?',
        header: 'Confirmar eliminación',
        group: 'headless',
        accept: () => {
            console.log("Borrando el contacto con ID:", ID);
            contactosStore.eliminarContacto(ID);
            toast.add({
                severity: 'error',
                summary: 'Eliminado',
                detail: `Contacto con ID "${ID}" eliminado correctamente`,
                life: 3000
            });
        }
    });
}
</script>

<style scoped></style>
