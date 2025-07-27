<template>
  <button
    @click="toggle"
    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    :aria-label="'Toggle dark mode'"
  >
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-yellow-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m8.485-10.485l-.707.707M4.222 19.778l-.707-.707M21 12h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707"
      />
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-700 dark:text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
      />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);

function toggle() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
}

onMounted(() => {
  isDark.value = localStorage.getItem('darkMode') === 'true';
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  }
});
</script>
