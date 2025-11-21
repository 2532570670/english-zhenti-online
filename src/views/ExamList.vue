<template>
  <div class="exam-list">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/">首页</router-link>
        <span class="separator">/</span>
        <span class="current">{{ examType?.name }}</span>
      </nav>

      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <div class="exam-icon">{{ examType?.icon }}</div>
          <div class="header-info">
            <h1 class="page-title">{{ examType?.name }}</h1>
            <p class="page-description">{{ examType?.description }}</p>
          </div>
        </div>
      </div>

      <!-- Years Grid -->
      <div class="years-grid">
        <div
          v-for="year in examType?.years"
          :key="year"
          class="year-card"
          @click="goToExam(year)"
        >
          <div class="year-header">
            <span class="year-text">{{ year }}</span>
            <span class="arrow">→</span>
          </div>
          <p class="year-description">查看真题及答案</p>
          
          <!-- Progress indicator if exists -->
          <div v-if="getYearProgress(year)" class="progress-badge">
            <span>已练习</span>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!examType" class="empty-state">
        <div class="empty-icon">📚</div>
        <p>未找到该考试类型</p>
        <router-link to="/" class="btn btn-primary">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getExamType } from '../data/exams'
import { useVocabularyStore } from '../stores/vocabulary'

const router = useRouter()
const route = useRoute()
const vocabularyStore = useVocabularyStore()

const examType = ref(null)

onMounted(() => {
  const examTypeId = route.params.examType
  examType.value = getExamType(examTypeId)
})

const goToExam = (year) => {
  // 默认跳转到第一套试卷
  router.push(`/${route.params.examType}/${year}/01`)
}

const getYearProgress = (year) => {
  // 检查是否有该年份的练习记录
  const key = `${route.params.examType}-${year}`
  return Object.keys(vocabularyStore.progress).some(k => k.startsWith(key))
}
</script>

<style scoped>
.exam-list {
  padding: 24px 0 60px;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.breadcrumb a {
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: var(--primary-color);
}

.separator {
  color: var(--border);
}

.current {
  color: var(--text-primary);
  font-weight: 500;
}

/* Page Header */
.page-header {
  margin-bottom: 48px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.exam-icon {
  font-size: 72px;
}

.header-info {
  flex: 1;
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
  line-height: 1.6;
}

/* Years Grid */
.years-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.year-card {
  position: relative;
  padding: 32px 24px;
  background: var(--surface);
  border-radius: 12px;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  overflow: hidden;
}

.year-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.year-card:hover .arrow {
  transform: translateX(4px);
}

.year-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.year-text {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}

.arrow {
  font-size: 24px;
  color: var(--primary-color);
  transition: transform 0.3s ease;
}

.year-description {
  font-size: 14px;
  color: var(--text-secondary);
}

.progress-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  background: var(--secondary-color);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
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

.empty-state p {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .exam-icon {
    font-size: 56px;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .years-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }
  
  .year-card {
    padding: 24px 16px;
  }
  
  .year-text {
    font-size: 24px;
  }
}
</style>
