<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <p class="copyright">© 2024 burningvocabulary.cn - 英语真题在线训练平台</p>
          <p class="description">考研英语、四六级、英语专八等英语在线真题训练</p>
        </div>
        
        <div class="footer-links">
          <a href="https://zhenti.burningvocabulary.cn/" target="_blank" class="footer-link">官方网站</a>
          <span class="divider">|</span>
          <a href="https://github.com" target="_blank" class="footer-link">GitHub</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 32px 0;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.copyright {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.description {
  font-size: 13px;
  color: var(--text-secondary);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-link {
  color: var(--text-secondary);
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--primary-color);
}

.divider {
  color: var(--border);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .footer-info {
    width: 100%;
  }
  
  .copyright,
  .description {
    font-size: 12px;
  }
}
</style>
