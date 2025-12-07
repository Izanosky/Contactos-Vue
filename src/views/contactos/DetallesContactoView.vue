<template>
    <div v-if="contacto">
        <Toolbar class="mb-4">
            <template #start>
                <h2 class="m-0">Detalles del Contacto</h2>
            </template>
            <template #end>
                <Button icon="pi pi-pencil" label="Editar" severity="success" @click="editar" class="mr-2" />
                <Button icon="pi pi-arrow-left" label="Volver" severity="secondary" outlined @click="volver" />
            </template>
        </Toolbar>

        <Card>
            <template #header>
                <div class="p-4 flex gap-2">
                    <Avatar :label="contacto.nombre.charAt(0)" size="xlarge" shape="circle" />
                    <h3>{{ contacto.nombre }}</h3>
                </div>
                <div class="p-4 flex gap-2">
                    <Tag :value="contacto.estado" :severity="getSeverity(contacto.estado)" />
                    <Button :icon="contacto.favorito ? 'pi pi-star-fill' : 'pi pi-star'"
                            :class="contacto.favorito ? 'p-button-warning' : 'p-button-outlined'" rounded text
                            size="large"
                            @click="contactosStore.toggleFavorito(contactoID)" />
                </div>
            </template>
            <template #content class="gap-2">
                <div class="flex flex-column gap-2">
                    <Panel header="Email" toggleable>
                        <p>{{ contacto.email }}</p>
                    </Panel>

                    <Panel header="Telefono" toggleable>
                        <p>{{ contacto.telefono }}</p>
                    </Panel>

                    <Panel header="Empresa" toggleable>
                        <p>{{ contacto.empresa }}</p>
                    </Panel>
                </div>

            </template>
        </Card>
    </div>
    <div v-else>
        <Message severity="warn">Contacto no encontrado</Message>
    </div>
</template>
<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useContactosStore } from '@/stores/useContactosStore'
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import Toolbar from 'primevue/toolbar'

const route = useRoute();
const router = useRouter();
const contactoID = computed(() => parseInt(route.params.id));

const contactosStore = useContactosStore();
const { contactos } = storeToRefs(contactosStore);
const contacto = computed(() => {
    return contactos.value.find(c => c.ID === contactoID.value);
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

const editar = () => {
    router.push({ name: 'contacto-editar', params: { id: contactoID.value } })
};

const volver = () => {
    router.push({ name: 'contactos' })
};

</script>
<style scoped></style>