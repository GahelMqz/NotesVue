<template>
  <div class="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow-lg space-y-3">
    <div class="flex items-start gap-3">
      <h3 class="text-lg font-semibold text-gray-900">
        {{ note.title }}
      </h3>
      <span
        :class="[
          'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
          priorityClass,
        ]"
      >
        <component :is="" class="h-4 w-4" />
        {{ note.tags }}
      </span>
    </div>

    <p class="text-gray-900 text-sm leading-relaxed">
      {{ note.description }}
    </p>

    <div class="text-xs text-gray-700 italic">
      <time :datetime="note.createdAt">
        {{ formatDueDate(note.createdAt) }}
      </time>
    </div>

    <div className="flex space-x-3">
      <button
        class="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition shadow"
        @click="$emit('delete', note.id)"
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
import { computed } from 'vue'

const props = defineProps<{
  note: Note
}>()

defineEmits<{
  (e: 'delete', id: string): void
}>()

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
