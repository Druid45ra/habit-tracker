// src/habitStore.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";

const STORAGE_KEY = "habit-tracker-data";

export const useHabitStore = defineStore("habitStore", () => {
  // --- STATE ---
  const habits = ref(loadFromStorage());

  // --- ACTIONS ---
  function addHabit(name) {
    const newHabit = {
      id: crypto.randomUUID(),
      name,
      history: [], // fiecare habit începe cu istoric gol
    };
    habits.value.push(newHabit);
  }

  function removeHabit(id) {
    habits.value = habits.value.filter((h) => h.id !== id);
  }

  function toggleCompletion(id) {
    const habit = habits.value.find((h) => h.id === id);
    if (!habit) return;

    const today = getToday();
    const todayEntry = habit.history.find((e) => e.date === today);

    if (todayEntry) {
      // toggling: dacă era completat, îl ștergem, dacă nu era completat, îl setăm
      todayEntry.completed = !todayEntry.completed;
    } else {
      habit.history.push({ date: today, completed: true });
    }
  }

  function isCompletedToday(habit) {
    const today = getToday();
    return habit.history.some((e) => e.date === today && e.completed);
  }

  // --- HELPERS ---
  function getToday() {
    return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  }

  function loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // --- PERSISTENCE ---
  watch(
    habits,
    (newValue) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
    },
    { deep: true }
  );

  // --- RETURN STATE & ACTIONS ---
  return {
    habits,
    addHabit,
    removeHabit,
    toggleCompletion,
    isCompletedToday,
  };
});
