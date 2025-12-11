<template>
  <div class="loading-wrapper" :style="styleVars">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="var(--size)"
        height="var(--size)"
        viewBox="0 0 100 100"
    >
      <circle
          cx="50"
          cy="50"
          r="32"
          stroke="#4CAF50"
          stroke-width="8"
          fill="none"
          stroke-linecap="round"
          stroke-dasharray="160"
          stroke-dashoffset="120"
      >
        <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="1s"
            repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
  size: { type: [Number, String], default: 200 },
});

const styleVars = computed(() => ({
  "--size": typeof props.size === "number" ? `${props.size}px` : props.size,
}));
</script>

<style scoped>
.loading-wrapper {
  display: inline-flex;
}
</style>
