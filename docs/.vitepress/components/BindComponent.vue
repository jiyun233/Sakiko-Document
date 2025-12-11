<script setup>
import {computed, ref} from 'vue';

const qq = ref('');
const touched = ref(false);

// QQ 正则：5–11 位数字，不以 0 开头
const qqRegex = /^[1-9][0-9]{4,10}$/;

const isValid = computed(() => qqRegex.test(qq.value));
const errorMessage = computed(() => {
  if (!touched.value) return '';
  if (qq.value === '') return '请输入 QQ 号';
  if (!/^[0-9]*$/.test(qq.value)) return '只能输入数字';
  return isValid.value ? '' : 'QQ号格式错误';
});

function onConfirm() {
  touched.value = true;
  if (!isValid.value) return;
  const base = "https://maimai.lxns.net/oauth/authorize";

  const params = new URLSearchParams({
    response_type: "code",
    client_id: "c01a9455-1bd5-4d4a-bf23-79ee1a684b33",
    redirect_uri: "https://chunithm.mic.run/auth",
    scope: "read_user_profile read_player read_user_token",
    state: qq.value
  });

  window.location.href = `${base}?${params.toString()}`;
}

function onCancel() {
  window.history.back();
}
</script>

<template>
  <div class="bind-wrapper" role="dialog" aria-modal="true" aria-label="输入 QQ 绑定">
    <div class="content">
      <h2>绑定 QQ 账号</h2>

      <label class="input-wrap" for="qq-input">
        <input
            id="qq-input"
            v-model="qq"
            type="text"
            inputmode="numeric"
            placeholder="请输入 QQ 号（例如 123456）"
            @blur="touched = true"
            @keyup.enter="onConfirm"
            aria-invalid="!isValid"
            autocomplete="off"
        />
      </label>

      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

      <div class="btn-row">
        <button class="btn btn-confirm" :disabled="!isValid" @click="onConfirm" aria-disabled="!isValid">
          确认
        </button>
        <button class="btn btn-cancel" @click="onCancel">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保持你原有的全屏居中外层 */
.bind-wrapper {
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
  background: rgba(0, 0, 0, 0.25); /* 可选：半透明遮罩 */
}

/* 内容卡片样式 */
.content {
  width: 420px;
  max-width: 90vw;
  padding: 28px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #1f1f1f; /* 深色主题卡片 */
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  color: #fff;
}

/* 标题 */
.content h2 {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
}

/* 输入 */
.input-wrap {
  width: 100%;
  margin-bottom: 8px;
}

.input-wrap input {
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  outline: none;
  box-sizing: border-box;
}

.input-wrap input:focus {
  border-color: rgba(76, 175, 80, 0.9);
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.08);
}

/* 错误提示 */
.error {
  color: #ff9b9b;
  font-size: 13px;
  margin: 6px 0 12px;
  min-height: 18px;
}

/* 按钮行 */
.btn-row {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

/* 基础按钮 */
.btn {
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

/* 确认按钮 */
.btn-confirm {
  background: linear-gradient(180deg, #43d17a, #2fb564);
  color: #fff;
  box-shadow: 0 6px 12px rgba(47, 181, 100, 0.15);
}

.btn-confirm[disabled],
.btn-confirm[aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

/* 取消按钮 */
.btn-cancel {
  background: transparent;
  color: #ddd;
  border: 1px solid rgba(255, 255, 255, 0.06);
}
</style>
