import type { Note } from '@/interfaces/INote'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useNoteStore = defineStore('note', () => {
  const notes = ref<Note[]>(JSON.parse(localStorage.getItem('notes') || '[]'))
  const loading = ref(false)

  async function fetchNotes() {
    loading.value = true
    try {
      //
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      loading.value = false
    }
  }

  function addNote(note: Omit<Note, 'id' | 'createdAt'>) {
    const newNote: Note = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    notes.value.push(newNote)
  }

  watch(
    notes,
    (newNotes) => {
      localStorage.setItem('notes', JSON.stringify(newNotes))
    },
    { deep: true },
  )

  return {
    notes,
    loading,
    fetchNotes,
    addNote,
  }
})
