<template>
  <div class="success-wrapper">
    <div class="content">
      <SuccessBadge class="badge" :size="220" />


      <h1>OAuth 授权成功</h1>
      <p class="desc">您的账户已成功授权，可以关闭此页面或返回首页继续浏览。</p>

      <a class="back-btn" href="/">
        返回首页
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import SuccessBadge from '../icons/SuccessBadge.vue';

function getAllParams(): { [key: string]: string } {
  const result: { [key: string]: string } = {};

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((v, k) => (result[k] = v));

  return result;
}

function logParams() {
  console.info("[URL Params]", getAllParams());
}

export default defineComponent({
  name: 'OAuthSuccessComponent',
  components: { SuccessBadge },

  mounted() {
    logParams();
    window.addEventListener("hashchange", logParams);
  },

  beforeUnmount() {
    window.removeEventListener("hashchange", logParams);
  }
});
</script>

<style scoped>
:host {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.success-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  box-sizing: border-box;

  overflow: hidden;
}

.content {
  max-width: 90vw;
  padding: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge {
  opacity: 0;
  transform: scale(0.85);
  animation: popIn 0.6s cubic-bezier(.22,1.28,.57,1) forwards;
  animation-delay: 0.15s;
}

h1 {
  margin-top: 18px;
  font-size: 28px;
  font-weight: 600;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
  animation-delay: 0.25s;
}

.desc {
  margin-top: 8px;
  font-size: 16px;
  opacity: 0;
  color: #999;
  animation: fadeIn 0.8s ease forwards;
  animation-delay: 0.35s;
}

.back-btn {
  margin-top: 24px;
  padding: 10px 22px;
  background: #4CAF50;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  transition: 0.2s;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
  animation-delay: 0.45s;
}

.back-btn:hover {
  background: #3e8e41;
  transform: translateY(-2px);
}

@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1);   }
}

@keyframes fadeIn {
  0%   { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0);   }
}
</style>
