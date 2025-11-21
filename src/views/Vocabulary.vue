<template>
  <div class="vocabulary">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <h1 class="page-title">我的单词本</h1>
        <p class="page-description">管理和复习你收藏的单词</p>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <div class="stat-value">{{ vocabularyStore.wordCount }}</div>
            <div class="stat-label">总单词数</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-info">
            <div class="stat-value">{{ vocabularyStore.todayWords }}</div>
            <div class="stat-label">今日新增</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-info">
            <div class="stat-value">{{ weekWords }}</div>
            <div class="stat-label">本周新增</div>
          </div>
        </div>
      </div>

      <!-- Word List -->
      <div v-if="vocabularyStore.words.length > 0" class="word-list-container">
        <div class="list-header">
          <h2 class="section-title">单词列表</h2>
          <div class="list-actions">
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="搜索单词..."
            />
          </div>
        </div>

        <div class="word-list">
          <div
            v-for="word in filteredWords"
            :key="word.word"
            class="word-item"
          >
            <div class="word-content">
              <div class="word-main">
                <h3 class="word-text">{{ word.word }}</h3>
                <span v-if="word.phonetic" class="phonetic">{{ word.phonetic }}</span>
              </div>
              <p class="word-meaning">{{ word.meaning }}</p>
              <div class="word-meta">
                <span class="added-date">
                  添加于 {{ formatDate(word.addedAt) }}
                </span>
              </div>
            </div>
            
            <div class="word-actions">
              <button
                class="action-btn delete-btn"
                @click="handleRemoveWord(word.word)"
                title="移除单词"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">📖</div>
        <h3>单词本是空的</h3>
        <p>在阅读真题时点击单词可以添加到单词本</p>
        <router-link to="/" class="btn btn-primary">
          开始学习
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVocabularyStore } from '../stores/vocabulary'

const vocabularyStore = useVocabularyStore()
const searchQuery = ref('')

const filteredWords = computed(() => {
  if (!searchQuery.value) {
    return vocabularyStore.words
  }
  
  const query = searchQuery.value.toLowerCase()
  return vocabularyStore.words.filter(word =>
    word.word.toLowerCase().includes(query) ||
    word.meaning.toLowerCase().includes(query)
  )
})

const weekWords = computed(() => {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  return vocabularyStore.words.filter(w =>
    new Date(w.addedAt) >= weekAgo
  ).length
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) {
    return '今天'
  } else if (days === 1) {
    return '昨天'
  } else if (days < 7) {
    return `${days}天前`
  } else {
    return date.toLocaleDateString('zh-CN')
  }
}

const handleRemoveWord = (word) => {
  if (confirm(`确定要移除单词 "${word}" 吗？`)) {
    vocabularyStore.removeWord(word)
  }
}
</script>

<style scoped>
.vocabulary {
  padding: 24px 0 60px;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-description {
  font-size: 16px;
  color: var(--text-secondary);
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--surface);
  padding: 24px;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.stat-icon {
  font-size: 40px;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
}

/* Word List Container */
.word-list-container {
  background: var(--surface);
  border-radius: 12px;
  padding: 32px;
  box-shadow: var(--shadow);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.list-actions {
  display: flex;
  gap: 12px;
}

.search-input {
  padding: 10px 16px;
  border: 2px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--background);
  transition: all 0.3s ease;
  min-width: 240px;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

/* Word List */
.word-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.word-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: var(--background);
  border-radius: 8px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.word-item:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow);
}

.word-content {
  flex: 1;
}

.word-main {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
}

.word-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.phonetic {
  font-size: 14px;
  color: var(--text-secondary);
  font-style: italic;
}

.word-meaning {
  font-size: 15px;
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 8px;
}

.word-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--text-secondary);
}

.word-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: transparent;
  transition: all 0.3s ease;
  font-size: 18px;
}

.action-btn:hover {
  background: var(--background);
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 72px;
  margin-bottom: 24px;
}

.empty-state h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .word-list-container {
    padding: 20px;
  }
  
  .list-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-input {
    width: 100%;
    min-width: auto;
  }
  
  .word-item {
    flex-direction: column;
  }
  
  .word-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
