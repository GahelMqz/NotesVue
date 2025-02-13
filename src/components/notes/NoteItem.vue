<template>
  <div class="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow-lg space-y-3">
    <div class="flex items-start gap-3">
      <h3 class="text-lg font-semibold text-gray-900">
        <!-- Si está en modo de edición, mostramos un input -->
        <template v-if="isEditing">
          <input
            v-model="editableNote.title"
            class="w-full p-2 border rounded"
            type="text"
            placeholder="Título"
          />
        </template>
        <template v-else>
          {{ note.title }}
        </template>
      </h3>
      <span
        :class="[
          'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
          priorityClass,
        ]"
      >
        {{ note.tags }}
      </span>
    </div>

    <p class="text-gray-900 text-sm leading-relaxed">
      <!-- Si está en modo de edición, mostramos un textarea -->
      <template v-if="isEditing">
        <textarea
          v-model="editableNote.description"
          class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Descripción"
          rows="4"
        ></textarea>
      </template>
      <template v-else>
        {{ note.description }}
      </template>
    </p>

    <div class="text-xs text-gray-700 italic">
      <time :datetime="note.createdAt">
        {{ formatDueDate(note.createdAt) }}
      </time>
    </div>

    <div class="flex space-x-3">
      <button
        v-if="isEditing"
        class="cursor-pointer w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        @click="saveEdits"
      >
        Guardar
      </button>
      <button
        v-if="!isEditing"
        class="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        @click="editNote"
      >
        Editar
      </button>
      <button
        class="cursor-pointer w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition shadow"
        @click="$emit('delete', note.id)"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '@/interfaces/INote'
import { useNoteStore } from '@/stores/note'
import { computed, reactive, ref } from 'vue'

const props = defineProps<{
  note: Note
}>()

defineEmits<{
  (e: 'delete', id: string): void
}>()

//Controlar el modo edicion
const isEditing = ref(false)
//Copia reactiva de la nota para editar
const editableNote = reactive({ ...props.note })
//Función para activar el modo de edición
const editNote = () => {
  isEditing.value = true
}
//Función para guardar los cambios
const saveEdits = () => {
  const noteStore = useNoteStore()
  noteStore.updateNote(editableNote) // Actualiza la nota en el store
  isEditing.value = false // Desactiva el modo de edición
}

const priorityClass = computed(
  () =>
    ({
      trabajo: 'bg-blue-50 text-blue-700',
      personal: 'bg-green-50 text-green-700',
      academico: 'bg-amber-50 text-amber-700',
    })[props.note.tags],
)

const formatDueDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}
</script>
