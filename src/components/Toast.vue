<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
      Your Habits
    </h2>

    <transition-group name="fade" tag="ul" class="space-y-3">
      <li
        v-for="habit in habits"
        :key="habit.id"
        class="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition duration-200"
      >
        <!-- Nume obicei -->
        <span class="font-medium text-gray-900 dark:text-gray-100">
          {{ habit.name }}
        </span>

        <div class="flex items-center space-x-3">
          <!-- Buton marcare complet -->
          <button
            @click="toggleCompletion(habit.id)"
            class="px-3 py-1 rounded-xl text-sm font-semibold bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 transition"
          >
            {{ habit.completed ? 'Done' : 'Mark' }}
          </button>

          <!-- Buton ștergere cu confirmare -->
          <button
            @click="confirmDelete(habit)"
            class="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900 transition"
            aria-label="Delete habit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </li>
    </transition-group>

    <!-- Mesaj dacă nu există obiceiuri -->
    <p v-if="habits.length === 0" class="text-gray-500 dark:text-gray-400">
      No habits yet. Add one above!
    </p>

    <!-- Modal simplu pentru confirmare ștergere -->
    <div
      v-if="habitToDelete"
      class="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl w-full max-w-sm">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Delete habit?
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete "{{ habitToDelete.name }}"? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="habitToDelete = null"
            class="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            @click="deleteHabit(habitToDelete.id)"
            class="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useHabitStore } from "../habitStore";

const store = useHabitStore();
const habits = computed(() => store.habits);

const habitToDelete = ref(null);

const toggleCompletion = (id) => {
  store.toggleCompletion(id);
};

const confirmDelete = (habit) => {
  habitToDelete.value = habit;
};

const deleteHabit = (id) => {
  store.removeHabit(id);
  habitToDelete.value = null;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
