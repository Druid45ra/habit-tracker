<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label
        for="habitName"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Add a new habit
      </label>
      <input
        v-model.trim="newHabit"
        id="habitName"
        type="text"
        placeholder="e.g. Drink water, Read 10 pages..."
        class="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
        :class="error ? 'border-danger focus:ring-danger' : ''"
      />
      <p v-if="error" class="mt-1 text-sm text-danger">{{ error }}</p>
    </div>

    <button
      type="submit"
      class="w-full px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-card focus:ring-2 focus:ring-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="isDisabled"
    >
      ➕ Add Habit
    </button>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useHabitStore } from "@/habitStore.js";

const store = useHabitStore();
const newHabit = ref("");
const error = ref("");

const isDisabled = computed(() => newHabit.value.length === 0);

const handleSubmit = () => {
  if (!newHabit.value) {
    error.value = "Please enter a habit name.";
    return;
  }
  if (newHabit.value.length < 3) {
    error.value = "Habit name must be at least 3 characters long.";
    return;
  }

  store.addHabit(newHabit.value);
  newHabit.value = "";
  error.value = "";
};
</script>
