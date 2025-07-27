<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">Progres săptămânal</h2>
    <Bar :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useHabitStore } from '@/stores/habitStore.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const habitStore = useHabitStore();

const last7Days = computed(() => {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
});

const chartData = computed(() => {
  const labels = habitStore.habits.map(h => h.name);
  const dataSet = habitStore.habits.map(habit => {
    return habit.days.filter(d => last7Days.value.includes(d)).length;
  });

  return {
    labels,
    datasets: [
      {
        label: 'Zile bifate în ultimele 7 zile',
        backgroundColor: '#3b82f6',
        data: dataSet
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: false }
  },
  scales: {
    y: { beginAtZero: true, stepSize: 1, max: 7 }
  }
};
</script>
