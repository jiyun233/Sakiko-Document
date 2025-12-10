<template>
  <div class="success-message">
    <div class="status-indicator">
      <span class="checkmark">✔️</span>
    </div>
    <p class="status-text">绑定成功</p>
    <p>现在可以关闭该页面</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'OAuthSuccess',
  setup() {
    onMounted(() => {
      return {};
    })
  }
});
</script>

<style scoped>
.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
}

.status-indicator {
  background-color: #4CAF50;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkmark {
  color: white;
  font-size: 30px;
}

.status-text {
  font-size: 18px;
  margin-top: 10px;
}
</style>
