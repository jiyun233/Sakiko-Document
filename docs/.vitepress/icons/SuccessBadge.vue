<template>
  <div class="badge-wrapper" :style="styleVars">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="var(--size)"
        height="var(--size)"
        viewBox="0 0 100 100"
    >
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="70%">
          <!-- ★ 新配色：柔和浅绿 → 深绿 -->
          <stop offset="0%" stop-color="#5BE884" />
          <stop offset="100%" stop-color="#2ECC71" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="42" fill="url(#grad)" opacity="0.28" />
      <circle cx="50" cy="50" r="34" fill="url(#grad)" />

      <path
          d="M34 52 L46 64 L70 40"
          fill="none"
          stroke="#fff"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="checkmark"
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
.check {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: linear-gradient(135deg, #58d68d, #2ecc71);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pop 0.25s ease-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
}

.check-icon {
  width: 12px;
  height: 12px;
  transform-origin: center;
  transform: scale(0.7);
  animation: checkmark 0.25s ease-out forwards 100ms;
}

.check-icon path {
  stroke: white;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

@keyframes pop {
  0% { transform: scale(0.4); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes checkmark {
  0% { stroke-dasharray: 16; stroke-dashoffset: 16; }
  100% { stroke-dashoffset: 0; }
}
</style>
