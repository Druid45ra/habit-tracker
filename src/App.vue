<template>
  <main
    class="max-w-md mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans flex flex-col p-8 gap-10"
  >
    <header class="relative pb-4 border-b border-gray-300 dark:border-gray-700">
      <h1 class="text-4xl font-extrabold text-center tracking-tight leading-snug">
        Habit Tracker Minimalist
      </h1>
      <div class="absolute top-2 right-2">
        <ToggleDarkMode />
      </div>
    </header>

    <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <HabitForm @habit-added="onHabitAdded" />
    </section>

    <section
      class="flex-grow overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
    >
      <HabitList />
    </section>

    <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <HabitChart />
    </section>

    <div v-if="toastMessage" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 animate-fade-in">
      {{ toastMessage }}
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import HabitForm from '@/components/HabitForm.vue';
import HabitList from '@/components/HabitList.vue';
import HabitChart from '@/components/HabitChart.vue';
import ToggleDarkMode from '@/components/ToggleDarkMode.vue';

const toastMessage = ref('');
function onHabitAdded(habitName) {
  toastMessage.value = `${habitName} a fost adăugat cu succes!`;
  setTimeout(() => {
    toastMessage.value = '';
  }, 3000);
}
</script>

<style scoped>
.habit-list-enter-active,
.habit-list-leave-active {
  transition: opacity 0.5s ease;
}
.habit-list-enter-from,
.habit-list-leave-to {
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
