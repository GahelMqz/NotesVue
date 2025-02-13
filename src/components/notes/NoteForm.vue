<template>
  <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Crear Nota</h2>
    <form @submit.prevent="handleSubmit" className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título
          <span class="text-red-500">*</span>
        </label>
        <input
          required
          id="title"
          v-model="form.title"
          type="text"
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Escribe un título..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="description"
          v-model="form.description"
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Escribe una descripción..."
          rows="4"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Etiquetas</label>
        <div className="space-y-3 mt-1">
          <div className="flex items-center">
            <input
              type="checkbox"
              value="trabajo"
              v-model="form.tags"
              className="h-5 w-5 text-blue-500 border-blue-300 rounded focus:ring-blue-500"
            />
            <label for="trabajo" className="ml-2 text-sm text-gray-700">Trabajo</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              value="personal"
              v-model="form.tags"
              className="h-5 w-5 text-blue-500 border-blue-300 rounded focus:ring-blue-500"
            />
            <label for="personal" className="ml-2 text-sm text-gray-700">Personal</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              value="academico"
              v-model="form.tags"
              className="h-5 w-5 text-blue-500 border-blue-700 rounded focus:ring-blue-500"
            />
            <label for="academico" className="ml-2 text-sm text-gray-700">Académico</label>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          @click="resetForm"
          className="cursor-pointer w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
        >
          Limpiar
        </button>
        <button
          type="submit"
          className="cursor-pointer w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Crear Nota
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '@/types'
import { reactive } from 'vue'

const emit = defineEmits<{
  (e: 'submit', note: Omit<Note, 'id' | 'createdAt'>): void
}>()

const initialForm = {
  title: '',
  description: '',
  tags: [] as ('trabajo' | 'personal' | 'academico')[],
  createdAt: '',
}
const form = reactive({ ...initialForm })

const handleSubmit = () => {
  emit('submit', {
    ...form,
    createdAt: new Date(form.createdAt),
  })
  resetForm()
}

const resetForm = () => {
  Object.assign(form, initialForm)
}
</script>
