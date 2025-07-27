<template>
  <main class="max-w-md mx-auto p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-center flex-grow">Habit Tracker Minimalist</h1>
      <ToggleDarkMode />
    </div>

    <HabitForm @habit-added="onHabitAdded" />
    <HabitList />
    <HabitChart />

    <Toast ref="toast" />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import HabitForm from './components/HabitForm.vue';
import HabitList from './components/HabitList.vue';
import HabitChart from './components/HabitChart.vue';
import ToggleDarkMode from './components/ToggleDarkMode.vue';
import Toast from './components/Toast.vue';

const toast = ref(null);

function onHabitAdded(habitName) {
  toast.value.show(habitName + ' a fost adăugat cu succes!');
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
