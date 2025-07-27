<template>
  <div
    class="flex items-center justify-between p-4 mb-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition"
  >
    <span>{{ habit.name }}</span>
    <div class="flex items-center gap-2">
      <input
        type="checkbox"
        :checked="habit.days.includes(today)"
        @change="toggle"
        class="w-5 h-5 accent-blue-600"
        :aria-label="`Bifează obiceiul ${habit.name} pentru azi`"
      />
      <button
        @click="deleteHabit"
        class="text-red-500 hover:text-red-700"
        aria-label="Șterge obiceiul"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useHabitStore } from '@/stores/habitStore.js';

const props = defineProps({
  habit: Object,
});

const habitStore = useHabitStore();
const today = computed(() => new Date().toISOString().slice(0, 10));

function toggle() {
  habitStore.toggleDay(props.habit.id, today.value);
}

function deleteHabit() {
  habitStore.deleteHabit(props.habit.id);
}
</script>
