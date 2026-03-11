<template>
  <footer class="custom-footer">
    <div class="footer-glow" aria-hidden="true"></div>
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-brand-name">Origin Technology</span>
      </div>

      <div class="footer-meta">
        <span class="footer-item">
          <span class="footer-badge">MIT</span>
          Released under the MIT License
        </span>
        <span class="footer-dot" aria-hidden="true"></span>
        <span class="footer-item">
          © 2021–{{ year }} All rights reserved.
        </span>
        <span class="footer-dot" aria-hidden="true"></span>
        <a
            class="footer-icp"
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
        >
          <span class="footer-icp-icon" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/>
              <path d="M6 3.5v3l2 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </span>
          闽ICP备2026006101号-1
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.custom-footer {
  position: relative;
  border-top: 1px solid var(--vp-c-divider);
  padding: 28px 32px 24px;
  overflow: hidden;
}

/* Ambient glow effect at top */
.footer-glow {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  height: 1px;
  background: linear-gradient(
      90deg,
      transparent,
      var(--vp-c-brand-1),
      transparent
  );
  opacity: 0.6;
}

.footer-glow::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 24px;
  background: radial-gradient(
      ellipse at top,
      color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent),
      transparent 70%
  );
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* Brand row */
.footer-brand {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
}

@keyframes pulse-glow {
  0%, 100% { opacity: 1; filter: drop-shadow(0 0 5px color-mix(in srgb, var(--vp-c-brand-1) 50%, transparent)); }
  50%       { opacity: 0.75; filter: drop-shadow(0 0 10px color-mix(in srgb, var(--vp-c-brand-1) 70%, transparent)); }
}

/* Meta row */
.footer-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px 12px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  line-height: 1.6;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* MIT badge */
.footer-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  color: var(--vp-c-brand-1);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
  line-height: 1.6;
}

/* Separator dot */
.footer-dot {
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  flex-shrink: 0;
}

/* ICP link */
.footer-icp {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--vp-c-text-3);
  text-decoration: none;
  transition: color 0.2s, opacity 0.2s;
  opacity: 0.85;
}

.footer-icp-icon {
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.footer-icp:hover {
  color: var(--vp-c-brand-1);
  opacity: 1;
}

.footer-icp:hover .footer-icp-icon {
  opacity: 1;
}

/* Responsive */
@media (max-width: 480px) {
  .custom-footer {
    padding: 24px 20px 20px;
  }

  .footer-meta {
    gap: 6px 10px;
  }
}
</style>