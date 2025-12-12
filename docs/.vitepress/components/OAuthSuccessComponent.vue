<template>
  <div class="success-wrapper">
    <div class="content">

      <component
          :is="currentBadge"
          class="badge"
          :size="220"
      />

      <h1>{{ titleText }}</h1>

      <p class="desc">{{ descText }}</p>

      <a v-if="!isLoading" class="back-btn" href="/">
        返回首页
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, computed} from 'vue';
import SuccessBadge from '../icons/SuccessBadge.vue';
import ErrorBadge from '../icons/ErrorBadge.vue';
import LoadingBadge from '../icons/LoadingBadge.vue';
import {baseURL} from "../global";

function getAllParams(): Record<string, string> {
  const res: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((v, k) => (res[k] = v));
  return res;
}

function isValidQQ(q: string): boolean {
  return /^[1-9][0-9]{4,10}$/.test(q);
}

/** 后端规范返回:
 * { success: true }
 * { success: false, reason: "token_failed" }
 */
async function postOAuth(code: string, state: number): Promise<{ success: boolean, reason?: string }> {
  try {
    const resp = await fetch(`${baseURL}/api/oauth`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({code, state})
    });

    if (!resp.ok) {
      return {success: false, reason: "network_error"};
    }

    return await resp.json();
  } catch (err) {
    console.error("Backend error:", err);
    return {success: false, reason: "network_exception"};
  }
}

export default defineComponent({
  name: 'OAuthSuccessComponent',
  components: {SuccessBadge, ErrorBadge, LoadingBadge},

  setup() {
    const isLoading = ref(true);
    const isSuccess = ref(false);
    const failReason = ref("");

    const reasonMsgs: Record<string, string> = {
      "token_failed": "无法获取访问令牌，请重新尝试。",
      "token_fetch_failed": "获取 API 密钥失败，请稍后再试。",
      "network_error": "网络异常，请检查您的网络连接。",
      "network_exception": "后端服务不可用，请稍后再试。",
      "invalid_params": "参数错误，请重新尝试 OAuth 授权。",
    };

    const currentBadge = computed(() => {
      if (isLoading.value) return "LoadingBadge";
      return isSuccess.value ? "SuccessBadge" : "ErrorBadge";
    });

    const titleText = computed(() => {
      if (isLoading.value) return "处理中…";
      return isSuccess.value ? "OAuth 授权成功" : "授权失败";
    });

    const descText = computed(() => {
      if (isLoading.value) return "正在验证您的授权信息，请稍候…";

      if (isSuccess.value)
        return "授权成功，可以关闭此页面或等待自动跳转…";

      return reasonMsgs[failReason.value] || "授权失败，请重新尝试。";
    });

    onMounted(async () => {
      const params = getAllParams();
      const code = params.code;
      const state = params.state;

      if (!code || !state || !isValidQQ(state)) {
        isLoading.value = false;
        isSuccess.value = false;
        failReason.value = "invalid_params";
        return;
      }

      const resp = await postOAuth(code, parseInt(state));

      isSuccess.value = resp.success;
      isLoading.value = false;

      if (!resp.success) {
        failReason.value = resp.reason || "unknown";
        return;
      }

      setTimeout(() => {
        window.location.href = "/";
      }, 10000);
    });

    return {
      isLoading,
      isSuccess,
      failReason,
      currentBadge,
      titleText,
      descText
    };
  },
});
</script>


<style scoped>
:host {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.success-wrapper {
  width: 100%;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
}

.content {
  max-width: 500px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge {
  opacity: 0;
  transform: scale(0.85);
  animation: popIn 0.6s cubic-bezier(.22, 1.28, .57, 1) forwards;
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
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
