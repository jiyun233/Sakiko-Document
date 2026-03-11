<script setup>
import {computed, ref} from 'vue';
import {redirectUri} from "../global";

const qq = ref('');
const touched = ref(false);
const agree = ref(false);

const qqRegex = /^[1-9][0-9]{4,10}$/;

const isValid = computed(() => qqRegex.test(qq.value) && agree.value);
const errorMessage = computed(() => {
  if (!touched.value) return '';
  if (qq.value === '') return '请输入 QQ 号';
  if (!/^[0-9]*$/.test(qq.value)) return '只能输入数字';
  if (!qqRegex.test(qq.value)) return 'QQ号格式错误';
  if (!agree.value) return '请同意用户数据授权条款';
  return '';
});

function onConfirm() {
  touched.value = true;
  if (!isValid.value) return;
  const base = "https://maimai.lxns.net/oauth/authorize";

  const params = new URLSearchParams({
    response_type: "code",
    client_id: "c01a9455-1bd5-4d4a-bf23-79ee1a684b33",
    redirect_uri: redirectUri,
    scope: "read_user_profile read_player",
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
      <img src="../../public/icon.png" alt="Sakiko-ChuniBot" class="icon"/>
      <h2>绑定 QQ 账号</h2>

      <label class="input-wrap" for="qq-input">
        <input
            id="qq-input"
            v-model="qq"
            type="text"
            inputmode="numeric"
            placeholder="请输入 QQ 号（例 123456）"
            @blur="touched = true"
            @keyup.enter="onConfirm"
            aria-invalid="!isValid"
            autocomplete="off"
        />
      </label>

      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

      <div class="agree-wrap">
        <label class="agree-label">
          <input type="checkbox" v-model="agree"/>
          我已阅读并同意
          <a href="/term/terms.html" target="_blank" rel="noopener noreferrer">用户数据授权条款</a>
        </label>
      </div>

      <div class="btn-row">
        <button class="btn btn-confirm" :disabled="!isValid" @click="onConfirm" aria-disabled="!isValid">
          确认
        </button>
        <button class="btn btn-cancel" @click="onCancel">取消</button>
      </div>

      <!-- ✦ 绑定流程提示 ✦ -->
      <div class="flow-hint">
        <div class="flow-label">绑定流程</div>

        <div class="flow-steps">
          <!-- Step 1: 本站 -->
          <div class="step step-origin">
            <div class="step-icon">
              <img src="../../public/icon.png" alt="Sakiko-ChuniBot" class="site-logo" />
            </div>
            <span class="step-name">本站</span>
          </div>

          <!-- Arrow 1 -->
          <div class="arrow-wrap">
            <span class="arrow-label-top">跳转授权</span>
            <div class="arrow-body">
              <div class="dots-container">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
              <span class="arrow-head">▶</span>
            </div>
          </div>

          <!-- Step 2: 落雪查分器 -->
          <div class="step step-ext">
            <div class="step-icon step-icon-ext">
              <img src="../../public/lxns.webp" alt="LXNS" class="site-logo" />
            </div>
            <span class="step-name">落雪查分器</span>
            <span class="step-sub">maimai.lxns.net</span>
          </div>

          <!-- Arrow 2 -->
          <div class="arrow-wrap">
            <span class="arrow-label-top">自动回跳</span>
            <div class="arrow-body">
              <div class="dots-container">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
              <span class="arrow-head">▶</span>
            </div>
          </div>

          <!-- Step 3: 绑定成功 -->
          <div class="step step-done">
            <div class="step-icon step-icon-done">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="done-badge">
                <defs>
                  <radialGradient id="doneGrad" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="#5be884"/>
                    <stop offset="100%" stop-color="#2fb564"/>
                  </radialGradient>
                </defs>
                <circle cx="18" cy="18" r="15" fill="url(#doneGrad)" opacity="0.2"/>
                <circle cx="18" cy="18" r="12" fill="url(#doneGrad)"/>
                <path d="M11 19 L16 24 L25 14" stroke="#fff" stroke-width="2.8"
                      stroke-linecap="round" stroke-linejoin="round" class="checkmark-path"/>
              </svg>
            </div>
            <span class="step-name">绑定成功</span>
          </div>
        </div>

        <!-- 强调提示条 -->
        <div class="hint-important">
          <svg class="note-icon-warn" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="#f5c542" stroke-width="1.4" stroke-linejoin="round"/>
            <path d="M8 6v3.5" stroke="#f5c542" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="8" cy="11.2" r="0.75" fill="#f5c542"/>
          </svg>
          <span>点击「确认」后将跳转至落雪查分器进行授权，<strong>必须完成授权并自动跳转回本页</strong>才算绑定成功</span>
        </div>

        <!-- 次要备注 -->
        <p class="hint-note">
          <svg class="note-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="#43d17a" stroke-width="1.4" opacity="0.7"/>
            <path d="M8 7v4" stroke="#43d17a" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="8" cy="5" r="0.8" fill="#43d17a"/>
          </svg>
          若未自动跳转回本站，请重新打开本页面再次尝试绑定
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.bind-wrapper {
  width: 100%;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
}

.content {
  width: 420px;
  max-width: 90vw;
  padding: 28px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1f1f1f;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  color: #fff;
}

.content h2 {
  margin: 0 0 16px;
  font-size: 26px;
  font-weight: 600;
}

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

.error {
  color: #ff9b9b;
  font-size: 13px;
  margin: 6px 0 12px;
  min-height: 18px;
}

.agree-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.agree-label {
  font-size: 13px;
  color: #ddd;
  display: flex;
  align-items: center;
  gap: 6px;
}

.agree-label a {
  color: #43d17a;
  text-decoration: underline;
}

.btn-row {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

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

.btn-cancel {
  background: transparent;
  color: #ddd;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.icon {
  width: 120px;
  max-width: 90vw;
}

/* ════════════════════════════
   绑定流程提示
════════════════════════════ */
.flow-hint {
  width: 100%;
  margin-top: 20px;
  padding: 18px 16px 14px;
  background: rgba(67, 209, 122, 0.04);
  border: 1px solid rgba(67, 209, 122, 0.18);
  border-radius: 12px;
  box-sizing: border-box;
  position: relative;
}

.flow-label {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #43d17a;
  background: #1f1f1f;
  padding: 2px 10px;
  border-radius: 20px;
  border: 1px solid rgba(67, 209, 122, 0.2);
  text-transform: uppercase;
  white-space: nowrap;
}

/* ── 步骤行 ── */
.flow-steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 6px;
  flex-wrap: nowrap;
}

/* ── 单个步骤 ── */
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.step-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.step-origin .step-icon {
  border-color: rgba(67, 209, 122, 0.3);
  box-shadow: 0 0 10px rgba(67, 209, 122, 0.08);
}

.step-icon-done {
  background: rgba(47, 181, 100, 0.08) !important;
  border-color: rgba(67, 209, 122, 0.38) !important;
  box-shadow: 0 0 14px rgba(67, 209, 122, 0.14) !important;
}

.site-logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.done-badge {
  width: 30px;
  height: 30px;
}

.checkmark-path {
  stroke-dasharray: 22;
  stroke-dashoffset: 22;
  animation: drawCheck 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
}

@keyframes drawCheck {
  to { stroke-dashoffset: 0; }
}

.step-name {
  font-size: 11px;
  font-weight: 500;
  color: #d8d8d8;
  white-space: nowrap;
}

.step-sub {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  margin-top: -4px;
}

/* ════════════════════════════
   CSS-only 流动箭头（纯 DOM，无 SVG 动画）
════════════════════════════ */
.arrow-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
  flex-shrink: 0;
  /* align with icon center */
  margin-top: 9px;
}

.arrow-label-top {
  font-size: 9px;
  color: rgba(67, 209, 122, 0.65);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.arrow-body {
  display: flex;
  align-items: center;
  gap: 3px;
}

.dots-container {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 34px;
  overflow: hidden;
}

.dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #43d17a;
  flex-shrink: 0;
  opacity: 0;
  animation: dotFlow 1.4s ease-in-out infinite;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.25s; }
.dot:nth-child(3) { animation-delay: 0.5s; }
.dot:nth-child(4) { animation-delay: 0.75s; }

@keyframes dotFlow {
  0%   { opacity: 0;   transform: translateX(-8px); }
  25%  { opacity: 1; }
  75%  { opacity: 1; }
  100% { opacity: 0;   transform: translateX(8px); }
}

.arrow-head {
  font-size: 11px;
  color: #43d17a;
  line-height: 1;
  animation: arrowPulse 1.4s ease-in-out infinite;
}

@keyframes arrowPulse {
  0%, 100% { opacity: 0.5; transform: translateX(0); }
  50%       { opacity: 1;   transform: translateX(2px); }
}

/* ════════════════════════════
   强调提示条（黄色警告）
════════════════════════════ */
.hint-important {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin: 13px 0 0;
  padding: 9px 11px;
  background: rgba(245, 197, 66, 0.07);
  border: 1px solid rgba(245, 197, 66, 0.25);
  border-radius: 8px;
  font-size: 12px;
  color: rgba(255, 240, 180, 0.82);
  line-height: 1.6;
  text-align: left;
}

.hint-important strong {
  color: #f5d76e;
}

.note-icon-warn {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── 次要备注 ── */
.hint-note {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin: 10px 0 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.33);
  line-height: 1.55;
  text-align: left;
}

.note-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  margin-top: 1px;
}
</style>