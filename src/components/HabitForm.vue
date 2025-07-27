<template>
  <form @submit.prevent="submitHabit" class="flex gap-3">
    <input
      v-model="habitName"
      type="text"
      placeholder="Adaugă un obicei nou..."
      class="flex-grow p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      aria-label="Numele obiceiului"
    />
    <button
      type="submit"
      class="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Adaugă
    </button>
  </form>
  <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { useHabitStore } from '@/stores/habitStore.js';
import { defineEmits } from 'vue';

const habitStore = useHabitStore();
const habitName = ref('');
const errorMessage = ref('');
const emit = defineEmits(['habit-added']);

function submitHabit() {
  const trimmedName = habitName.value.trim();
  if (!trimmedName) {
    errorMessage.value = 'Introdu un nume pentru obicei!';
    return;
  }
  if (habitStore.habits.some(habit => habit.name.toLowerCase() === trimmedName.toLowerCase())) {
    errorMessage.value = 'Acest obicei există deja!';
    return;
  }
  habitStore.addHabit(trimmedName);
  emit('habit-added', trimmedName);
  errorMessage.value = '';
  habitName.value = '';
}
</script>
