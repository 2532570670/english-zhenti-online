<template>
  <div class="home">
    <div class="container">
      <!-- Hero Section -->
      <section class="hero">
        <h1 class="hero-title">英语真题在线训练平台</h1>
        <p class="hero-subtitle">考研英语、四六级、英语专八等在线真题训练 · 查单词 · 单词本 · 进度跟踪</p>
        
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">{{ vocabularyStore.wordCount }}</span>
            <span class="stat-label">已收藏单词</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ vocabularyStore.todayWords }}</span>
            <span class="stat-label">今日新增</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ examTypes.length }}</span>
            <span class="stat-label">考试类型</span>
          </div>
        </div>
      </section>

      <!-- Exam Types Grid -->
      <section class="exam-types">
        <h2 class="section-title">选择考试类型</h2>
        
        <div class="exam-grid">
          <router-link
            v-for="exam in examTypes"
            :key="exam.id"
            :to="`/${exam.id}`"
            class="exam-card"
            :style="{ '--exam-color': exam.color }"
          >
            <div class="exam-icon">{{ exam.icon }}</div>
            <div class="exam-info">
              <h3 class="exam-name">{{ exam.name }}</h3>
              <p class="exam-description">{{ exam.description }}</p>
              <div class="exam-meta">
                <span class="exam-count">{{ exam.years.length }} 套真题</span>
              </div>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <h2 class="section-title">平台特色</h2>
        
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">📖</div>
            <h3 class="feature-title">在线训练</h3>
            <p class="feature-description">海量真题在线练习，支持历年考研、四六级、专业英语等各类考试</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3 class="feature-title">即点即查</h3>
            <p class="feature-description">阅读过程中点击单词即可查询释义，学习更高效</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3 class="feature-title">单词本</h3>
            <p class="feature-description">收藏生词到单词本，随时复习巩固，建立个人词库</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3 class="feature-title">进度跟踪</h3>
            <p class="feature-description">自动记录学习进度，查看练习历史，掌握学习情况</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { examTypes } from '../data/exams'
import { useVocabularyStore } from '../stores/vocabulary'

const vocabularyStore = useVocabularyStore()
</script>

<style scoped>
.home {
  padding: 40px 0;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 60px 0;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 48px;
  line-height: 1.8;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-top: 48px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
}

/* Section Title */
.section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 32px;
  text-align: center;
}

/* Exam Types */
.exam-types {
  margin: 80px 0;
}

.exam-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.exam-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 28px;
  background: var(--surface);
  border-radius: 16px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.exam-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--exam-color);
}

.exam-icon {
  font-size: 48px;
  flex-shrink: 0;
}

.exam-info {
  flex: 1;
}

.exam-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.exam-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.6;
}

.exam-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.exam-count {
  font-size: 13px;
  color: var(--exam-color);
  font-weight: 500;
  padding: 4px 12px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
}

/* Features */
.features {
  margin: 80px 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.feature-card {
  text-align: center;
  padding: 32px 24px;
  background: var(--surface);
  border-radius: 16px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.feature-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .stats {
    gap: 24px;
  }
  
  .stat-number {
    font-size: 28px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .exam-grid,
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
