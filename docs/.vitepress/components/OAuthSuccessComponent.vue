<template>
  <div class="success-wrapper">

    <div class="content">
      <!-- 非成功绑定，仍然显示原来的 Badge 页面 -->
      <template v-if="!showLottery">
        <component :is="currentBadge" class="badge" :size="220" />

        <h1>{{ titleText }}</h1>
        <p class="desc">{{ descText }}</p>
      </template>


    </div>
    <!-- 成功绑定：显示抽奖弹窗 -->
    <div v-if="showLottery" class="modal-mask">
      <div class="modal lottery">
        <h1 class="modal-title">🎉 OAuth 授权成功</h1>
        <h2 class="modal-title">填写收集表参与抽奖!</h2>
        <img class="modal-img" src="/lotter.png" alt="抽奖二维码" />

        <p class="modal-desc">
          需填写收集表才可抽奖否则中将无效!
        </p>
        <p class="modal-desc">
          点击链接即可跳转至抽奖!
        </p>

        <div class="modal-actions">
          <button class="action-btn secondary" @click="saveImage">
            保存抽奖二维码
          </button>

          <a class="action-btn primary" href="https://wj.qq.com/s2/25085118/5879/" target="_blank" rel="noopener">
            立即填写 · 参与抽奖
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import SuccessBadge from '../icons/SuccessBadge.vue';
import ErrorBadge from '../icons/ErrorBadge.vue';
import LoadingBadge from '../icons/LoadingBadge.vue';
import { baseURL } from "../global";

const showLottery = ref(false);

function saveImage() {
  const link = document.createElement("a");
  link.href = "/lotter.png";
  link.download = "抽奖二维码.png";
  link.click();
}
function getAllParams(): Record<string, string> {
  const res: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((v, k) => (res[k] = v));
  return res;
}

function isValidQQ(q: string): boolean {
  return /^[1-9][0-9]{4,10}$/.test(q);
}
async function postOAuth(code: string, state: number): Promise<{ success: boolean, reason?: string }> {
  try {
    const resp = await fetch(`${baseURL}/api/oauth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, state })
    });

    if (!resp.ok) {
      return { success: false, reason: "network_error" };
    }

    return await resp.json();
  } catch (err) {
    console.error("Backend error:", err);
    return { success: false, reason: "network_exception" };
  }
}

export default defineComponent({
  name: 'OAuthSuccessComponent',
  components: { SuccessBadge, ErrorBadge, LoadingBadge },

  setup() {
    const isLoading = ref(true);
    const isSuccess = ref(false);
    const failReason = ref("");

    const reasonMsgs: Record<string, string> = {
      "token_failed": "无法获取访问令牌，请重新尝试。",
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

      isLoading.value = false;
      isSuccess.value = resp.success;

      if (!resp.success) {
        failReason.value = resp.reason || "unknown";
        return;
      }

      showLottery.value = true;
    });

    return {
      isLoading,
      isSuccess,
      failReason,
      currentBadge,
      titleText,
      descText,
      showLottery,
      saveImage
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

.action-btn {
  width: 100%;
  max-width: 260px;
  padding: 12px 0;
  font-size: 16px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s;
}

.action-btn.primary {
  background: #4CAF50;
  color: #fff;
}

.action-btn.secondary {
  background: #f3f3f3;
  color: #333;
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

.modal.lottery {
  width: 340px;
  padding: 22px;
}

.modal-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 14px;
}

.modal-img {
  width: 220px;
  margin: 0 auto;
  border-radius: 10px;
}

.modal-desc {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.modal-tip {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}

.modal-actions {
  width: 100%;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
</style>
