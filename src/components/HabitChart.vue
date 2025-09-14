<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
        Progress Overview
      </h2>

      <!-- Toggle Zilnic/Săptămânal -->
      <div class="flex items-center space-x-2">
        <button
          @click="viewMode = 'daily'"
          :class="[
            'px-3 py-1 rounded-xl text-sm font-medium transition',
            viewMode === 'daily'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          ]"
        >
          Daily
        </button>
        <button
          @click="viewMode = 'weekly'"
          :class="[
            'px-3 py-1 rounded-xl text-sm font-medium transition',
            viewMode === 'weekly'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          ]"
        >
          Weekly
        </button>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
      <BarChart v-if="chartData" :data="chartData" :options="chartOptions" />
      <p v-else class="text-gray-500 dark:text-gray-400 text-center">
        No data yet. Add habits to see your progress!
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useHabitStore } from "../habitStore";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar as BarChart } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const store = useHabitStore();
const viewMode = ref("daily");

// Exemplu simplu: în store, fiecare habit ar trebui să aibă un istoric completări
// ex: habit.history = [{ date: '2025-09-14', completed: true }, ...]
const chartData = computed(() => {
  if (!store.habits.length) return null;

  if (viewMode.value === "daily") {
    return {
      labels: store.habits.map((h) => h.name),
      datasets: [
        {
          label: "Completed Today",
          data: store.habits.map((h) => (h.completed ? 1 : 0)),
          backgroundColor: "#4F46E5",
          borderRadius: 8,
        },
      ],
    };
  }

  if (viewMode.value === "weekly") {
    // Generăm datele pentru ultimele 7 zile
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split("T")[0]; // format YYYY-MM-DD
    });

    return {
      labels: last7Days.map((d) => d.slice(5)), // arătăm doar MM-DD
      datasets: store.habits.map((h, index) => ({
        label: h.name,
        data: last7Days.map((day) =>
          h.history ? h.history.filter((x) => x.date === day && x.completed).length : 0
        ),
        backgroundColor: colorForIndex(index),
        borderRadius: 6,
      })),
    };
  }
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#6B7280",
        font: { size: 14, weight: "500" },
      },
    },
    tooltip: {
      backgroundColor: "#1F2937",
      titleColor: "#fff",
      bodyColor: "#d1d5db",
      cornerRadius: 6,
      callbacks: {
        label: (context) => {
          if (viewMode.value === "daily") {
            return context.raw === 1 ? "✅ Completed" : "❌ Not done yet";
          }
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { precision: 0, stepSize: 1, color: "#6B7280" },
      grid: { drawBorder: false, color: "#E5E7EB" },
    },
    x: {
      ticks: { color: "#6B7280" },
      grid: { display: false },
    },
  },
};

// Funcție simplă pentru a genera culori diferite
function colorForIndex(index) {
  const colors = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"];
  return colors[index % colors.length];
}
</script>

<style scoped>
div {
  min-height: 300px;
}
</style>
