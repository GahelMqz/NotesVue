<template>
  <div class="flex items-center gap-2">
    <label for="sort" class="text-sm font-medium text-gray-700">Ordenar por:</label>
    <select id="sort" v-model="sortOrder" @change="applySort" class="p-2 border rounded">
      <option value="desc">Más reciente</option>
      <option value="asc">Más antigua</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

//Emite el nuevo valor del filtro
const emit = defineEmits<{
  (e: 'sort', order: string): void
}>()

//Estado para el orden seleccionado (por defecto, más reciente)
const sortOrder = ref('desc')

//Emite el cambio del orden de las notas
const applySort = () => {
  emit('sort', sortOrder.value)
}
</script>
