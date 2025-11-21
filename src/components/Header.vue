<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <span class="logo-icon">📚</span>
          <span class="logo-text">英语真题在线</span>
        </router-link>
        
        <nav class="nav">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/vocabulary" class="nav-link">
            单词本
            <span v-if="wordCount > 0" class="badge badge-primary">{{ wordCount }}</span>
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useVocabularyStore } from '../stores/vocabulary'

const vocabularyStore = useVocabularyStore()
const wordCount = computed(() => vocabularyStore.wordCount)
</script>

<style scoped>
.header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.logo:hover {
  color: var(--primary-color);
}

.logo-icon {
  font-size: 28px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 15px;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link.router-link-active {
  color: var(--primary-color);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-color);
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 16px;
  }
  
  .nav {
    gap: 16px;
  }
  
  .nav-link {
    font-size: 14px;
  }
}
</style>
