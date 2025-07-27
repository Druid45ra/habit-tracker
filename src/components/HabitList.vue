<template>
  <div>
    <div class="flex gap-3 mb-4 justify-center">
      <button
        @click="filter = 'all'"
        class="px-3 py-1 rounded border cursor-pointer"
        :class="{ 'bg-blue-600 text-white border-blue-600': filter === 'all', 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200': filter !== 'all' }"
        aria-label="Afișează toate obiceiurile"
      >
        Toate
      </button>
      <button
        @click="filter = 'done'"
        class="px-3 py-1 rounded border cursor-pointer"
        :class="{ 'bg-blue-600 text-white border-blue-600': filter === 'done', 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200': filter !== 'done' }"
        aria-label="Afișează obiceiurile bifate azi"
      >
        Bifate azi
      </button>
      <button
        @click="filter = 'not-done'"
        class="px-3 py-1 rounded border cursor-pointer"
        :class="{ 'bg-blue-600 text-white border-blue-600': filter === 'not-done', 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200': filter !== 'not-done' }"
        aria-label="Afișează obiceiurile nebifate azi"
      >
        Nebifate azi
      </button>
    </div>

    <HabitItem
      v-for="habit in filteredHabits"
      :key="habit.id"
      :habit="habit"
    />
    <p v-if="filteredHabits.length === 0" class="text-gray-500 mt-4 text-center">
      Nu există obiceiuri pentru acest filtru.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useHabitStore } from '@/stores/habitStore.js';
import HabitItem from '@/components/HabitItem.vue';

const habitStore = useHabitStore();
const filter = ref('all');

const filteredHabits = computed(() => {
  if (filter.value === 'done') {
    return habitStore.habits.filter(habit => habit.days.includes(habitStore.today));
  } else if (filter.value === 'not-done') {
    return habitStore.habits.filter(habit => !habit.days.includes(habitStore.today));
  }
  return habitStore.habits;
});
</script>
