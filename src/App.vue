<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
    <!-- HEADER -->
    <header class="bg-primary text-white shadow-card">
      <div class="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold tracking-tight">
          Habit Tracker
        </h1>
        <ToggleDarkMode />
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="max-w-3xl mx-auto p-6 flex-1 space-y-8">
      <HabitForm />
      <HabitList />
      <HabitChart />
    </main>

    <!-- FOOTER -->
    <footer class="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
      Made with ❤️ by Radu • {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<script setup>
import HabitForm from "./components/HabitForm.vue";
import HabitList from "./components/HabitList.vue";
import HabitChart from "./components/HabitChart.vue";
import ToggleDarkMode from "./components/ToggleDarkMode.vue";
</script>
