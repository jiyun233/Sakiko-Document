<template>
  <div class="badge-wrapper" :style="styleVars">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="var(--size)"
        height="var(--size)"
        viewBox="0 0 100 100"
    >
      <defs>
        <radialGradient id="grad-error" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#FF8A8A" />
          <stop offset="100%" stop-color="#E74C3C" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="42" fill="url(#grad-error)" opacity="0.28" />
      <circle cx="50" cy="50" r="34" fill="url(#grad-error)" />

      <path
          d="M35 35 L65 65 M65 35 L35 65"
          stroke="#fff"
          stroke-width="8"
          stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
  size: { type: [Number, String], default: 200 }
});

const styleVars = computed(() => ({
  '--size': typeof props.size === 'number' ? `${props.size}px` : props.size
}));
</script>

<style scoped>
.badge-wrapper {
  display: inline-flex;
}
</style>
