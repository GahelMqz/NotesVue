<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Gestor de notas</h1>
    </header>

    <div v-if="noteStore.loading" class="text-center p-8">
      <div
        class="animate-spin inline-block w-8 h-8 border-2 border-current border-t-transparent rounded-full mb-4"
      ></div>
      <p class="text-gray-600">Loading tasks...</p>
    </div>

    <template v-else>
      <NoteForm @submit="handleNoteSubmit" />
    </template>

    <div class="my-8">
      <!-- Filtro -->>
      <NoteFilter @sort="handleSort" />
      <div v-if="noteStore.notes.length > 0" class="space-y-4">
        <NoteItem v-for="note in sortedNotes" :key="note.id" :note="note" @delete="deleteNote" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useNoteStore } from '@/stores/note'
import NoteForm from '@/components/notes/NoteForm.vue'
import type { Note } from '@/interfaces/INote'
import NoteItem from '@/components/notes/NoteItem.vue'
import NoteFilter from '@/components/notes/NoteFilter.vue'

const noteStore = useNoteStore()

onMounted(async () => {
  await noteStore.fetchNotes()
})

function handleNoteSubmit(noteData: Omit<Note, 'id' | 'createdAt'>) {
  noteStore.addNote(noteData)
}

function deleteNote(noteId: string) {
  const index = noteStore.notes.findIndex((t) => t.id === noteId)
  if (index !== -1) {
    noteStore.notes.splice(index, 1)
  }
}

// Estado para recibir el tipo de orden (asc o desc)
const sortOrder = ref('desc')
// Computed que ordena las notas según el valor de `sortOrder`
const sortedNotes = computed(() => {
  return noteStore.notes.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return sortOrder.value === 'desc'
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime()
  })
})
// Función para manejar el cambio de orden en el filtro
const handleSort = (order: string) => {
  sortOrder.value = order
}
</script>
