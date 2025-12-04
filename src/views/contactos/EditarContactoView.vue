<template>
  <div>
    <h1>Editar Contacto</h1>

    <Form
      v-if="contacto"
      v-slot="$form"
      :initialValues="estadoInicial"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex flex-column gap-4 w-full sm:w-56"
    >
      <div class="flex flex-column gap-1">
        <IftaLabel>
          <InputText name="nombre" type="text" fluid variant="filled" />
          <label>Nombre</label>
        </IftaLabel>
        <Message
          v-if="$form.nombre?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.nombre.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-1">
        <IftaLabel>
          <InputText name="email" type="email" fluid variant="filled" />
          <label>Email</label>
        </IftaLabel>
        <Message
          v-if="$form.email?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.email.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-1">
        <IftaLabel>
          <InputText name="telefono" type="text" fluid variant="filled" />
          <label>Teléfono</label>
        </IftaLabel>
        <Message
          v-if="$form.telefono?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.telefono.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-1">
        <IftaLabel>
          <InputText name="empresa" type="text" fluid variant="filled" />
          <label>Empresa</label>
        </IftaLabel>
        <Message
          v-if="$form.empresa?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.empresa.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-1">
        <IftaLabel>
          <Select name="estado" :options="['Activo', 'Inactivo']" fluid variant="filled" />
          <label>Estado</label>
        </IftaLabel>
        <Message
          v-if="$form.estado?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.estado.error.message }}
        </Message>
      </div>

      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
        <Button type="submit" severity="success" label="Guardar" size="small" style="flex: 1;" />
        <Button type="button" severity="secondary" label="Cancelar" size="small" style="flex: 1;" @click="router.push({ name: 'contactos' })" />
      </div>
    </Form>
    <p v-else>Cargando contacto...</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { z } from 'zod'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import IftaLabel from 'primevue/iftalabel'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useContactosStore } from '@/stores/useContactosStore'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const contactoID = computed(() => Number(route.params.id))

const contactosStore = useContactosStore()
const { contactos } = storeToRefs(contactosStore)
const contacto = computed(() => {
    return contactos.value.find(c => c.ID === contactoID.value)
})

const estadoInicial = ref({
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
  estado: 'Activo'
})

watch(contacto, (newContacto) => {
  if (newContacto) {
    estadoInicial.value = {
      nombre: newContacto.nombre,
      email: newContacto.email,
      telefono: newContacto.telefono,
      empresa: newContacto.empresa,
      estado: newContacto.estado
    }
  }
}, { immediate: true })

const resolver = ref(
  zodResolver(
    z.object({
      nombre: z.string().trim().min(1, { message: 'El nombre es obligatorio' }),
      email: z.string().trim().email({ message: 'Email inválido' }),
      telefono: z.string().trim().min(1, { message: 'El teléfono es obligatorio' }),
      empresa: z.string().trim().min(1, { message: 'La empresa es obligatoria' }),
      estado: z.enum(['Activo', 'Inactivo'])
    })
  )
)

const onFormSubmit = ({ valid, values }) => {
  if (valid && contacto.value) {
    const contactoActualizado = {
      ID: contactoID.value,
      nombre: values.nombre,
      email: values.email,
      telefono: values.telefono,
      empresa: values.empresa,
      estado: values.estado,
      favorito: contacto.value.favorito
    }
    contactosStore.actualizarContacto(contactoID.value, contactoActualizado)
    
    toast.add({
      severity: 'success',
      summary: 'Contacto actualizado',
      detail: `Los datos de ${values.nombre} han sido actualizados`,
      life: 3000
    })
    
    setTimeout(() => {
      router.push({ name: 'contactos' })
    }, 100)
  }
}
</script>