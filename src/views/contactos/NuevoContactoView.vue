<template>
  <div>
    <Toast />
    <h1>Nuevo Contacto</h1>

    <Form v-slot="$form" :initialValues="estadoInicial" :resolver="resolver" @submit="onFormSubmit"
      class="flex flex-column gap-4 w-full sm:w-56">
      <div class="flex flex-column gap-1">
        <IftaLabel>
          <InputText name="nombre" type="text" fluid variant="filled" />
          <label>Nombre</label>
        </IftaLabel>
        <Message v-if="$form.nombre?.invalid" severity="error" size="small" variant="simple">
          {{ $form.nombre.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-1">
        <IftaLabel>
          <InputText name="email" type="email" fluid variant="filled" />
          <label>Email</label>
        </IftaLabel>
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
          {{ $form.email.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-1">
        <IftaLabel>
          <InputText name="telefono" type="text" fluid variant="filled" />
          <label>Teléfono</label>
        </IftaLabel>
        <Message v-if="$form.telefono?.invalid" severity="error" size="small" variant="simple">
          {{ $form.telefono.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-1">
        <IftaLabel>
          <InputText name="empresa" type="text" fluid variant="filled" />
          <label>Empresa</label>
        </IftaLabel>
        <Message v-if="$form.empresa?.invalid" severity="error" size="small" variant="simple">
          {{ $form.empresa.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-1">
        <IftaLabel>
          <Select name="estado" :options="['Activo', 'Inactivo']" fluid variant="filled" />
          <label>Estado</label>
        </IftaLabel>
        <Message v-if="$form.estado?.invalid" severity="error" size="small" variant="simple">
          {{ $form.estado.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-1">
        <div class="flex align-items-center gap-2">
          <Checkbox name="favorito" binary inputId="favorito" />
          <label for="favorito">Marcar como favorito</label>
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
        <Button type="submit" severity="success" label="Crear" size="small" style="flex: 1;" />
        <Button type="button" severity="secondary" label="Cancelar" size="small" style="flex: 1;"
          @click="router.push({ name: 'contactos' })" />
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { z } from 'zod'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import IftaLabel from 'primevue/iftalabel'
import Message from 'primevue/message'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useRouter } from 'vue-router'
import { useContactosStore } from '@/stores/useContactosStore'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()
const contactosStore = useContactosStore()

const estadoInicial = ref({
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
  estado: 'Activo',
  favorito: false
})

const resolver = ref(
  zodResolver(
    z.object({
      nombre: z
        .string()
        .trim()
        .min(1, { message: 'El nombre es obligatorio' })
        .max(40, { message: 'El nombre no puede exceder 20 caracteres' }),

      email: z.string().email({ message: 'Email inválido' }),
      telefono: z.string().min(1, { message: 'El teléfono es obligatorio' }),
      empresa: z.string().min(1, { message: 'La empresa es obligatoria' }),
      estado: z.enum(['Activo', 'Inactivo']),
      favorito: z.boolean()
    })
  )
)

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    const nuevoContacto = contactosStore.crearContacto({
      ID: useContactosStore().getID(),
      nombre: values.nombre,
      email: values.email,
      telefono: values.telefono,
      empresa: values.empresa,
      estado: values.estado,
      favorito: values.favorito
    })
    
    toast.add({
      severity: 'success',
      summary: 'Contacto creado',
      detail: `${values.nombre} ha sido agregado exitosamente`,
      life: 3000
    })
    
    router.push({ name: 'contactos' })
  }
}
</script>

<style scoped></style>