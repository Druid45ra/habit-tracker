import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useHabitStore = defineStore("habit", () => {
  const habits = ref(JSON.parse(localStorage.getItem("habits")) || []);
  const today = computed(() => new Date().toISOString().slice(0, 10));

  function addHabit(name) {
    habits.value.push({
      id: Date.now(),
      name,
      days: [],
    });
    saveToLocalStorage();
  }

  function toggleDay(habitId, day) {
    const habit = habits.value.find((h) => h.id === habitId);
    if (habit) {
      const index = habit.days.indexOf(day);
      if (index === -1) {
        habit.days.push(day);
      } else {
        habit.days.splice(index, 1);
      }
      saveToLocalStorage();
    }
  }

  function deleteHabit(habitId) {
    habits.value = habits.value.filter((h) => h.id !== habitId);
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    try {
      localStorage.setItem("habits", JSON.stringify(habits.value));
    } catch (error) {
      console.error("Eroare la salvarea în localStorage:", error);
    }
  }

  return { habits, today, addHabit, toggleDay, deleteHabit };
});
