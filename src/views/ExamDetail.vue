<template>
  <div class="exam-detail">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/">首页</router-link>
        <span class="separator">/</span>
        <router-link :to="`/${$route.params.examType}`">{{ examType?.name }}</router-link>
        <span class="separator">/</span>
        <span class="current">{{ $route.params.year }}</span>
      </nav>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading"></div>
        <p>加载中...</p>
      </div>

      <!-- Content -->
      <template v-else-if="article">
        <!-- Title -->
        <div class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="badge badge-primary">阅读理解</span>
            <span class="word-count">约 {{ wordCount }} 词</span>
          </div>
        </div>

        <!-- Passage -->
        <div class="passage-container">
          <div class="passage-content">
            <p
              v-for="(paragraph, index) in paragraphs"
              :key="index"
              class="paragraph"
            >
              <span
                v-for="(word, wordIndex) in paragraph.split(' ')"
                :key="wordIndex"
                class="word"
                :class="{ 'word-selected': isWordInVocabulary(word) }"
                @click="handleWordClick(word)"
              >{{ word }}</span>
            </p>
          </div>
        </div>

        <!-- Questions (if available) -->
        <div v-if="article.questions && article.questions.length" class="questions-section">
          <h2 class="section-title">练习题目</h2>
          <div class="questions">
            <div
              v-for="question in article.questions"
              :key="question.id"
              class="question-item"
            >
              <h3 class="question-text">{{ question.id }}. {{ question.question }}</h3>
              <div class="options">
                <label
                  v-for="(option, index) in question.options"
                  :key="index"
                  class="option"
                  :class="{ 
                    'option-selected': selectedAnswers[question.id] === index,
                    'option-correct': showAnswers && question.correctAnswer === index,
                    'option-wrong': showAnswers && selectedAnswers[question.id] === index && question.correctAnswer !== index
                  }"
                >
                  <input
                    type="radio"
                    :name="`question-${question.id}`"
                    :value="index"
                    v-model="selectedAnswers[question.id]"
                    :disabled="showAnswers"
                  />
                  <span class="option-label">{{ String.fromCharCode(65 + index) }}.</span>
                  <span class="option-text">{{ option }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="actions">
            <button v-if="!showAnswers" class="btn btn-primary" @click="checkAnswers">
              查看答案
            </button>
            <button v-else class="btn btn-outline" @click="resetAnswers">
              重新作答
            </button>
          </div>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">📄</div>
        <p>该试卷内容暂未收录</p>
        <router-link :to="`/${$route.params.examType}`" class="btn btn-primary">
          返回列表
        </router-link>
      </div>
    </div>

    <!-- Word Popup -->
    <transition name="fade">
      <div v-if="selectedWord" class="word-popup-overlay" @click="closeWordPopup">
        <div class="word-popup" @click.stop>
          <div class="popup-header">
            <h3 class="popup-word">{{ selectedWord.word }}</h3>
            <button class="close-btn" @click="closeWordPopup">✕</button>
          </div>
          
          <div class="popup-content">
            <div v-if="selectedWord.phonetic" class="phonetic">{{ selectedWord.phonetic }}</div>
            <div class="meaning">{{ selectedWord.meaning }}</div>
            
            <div v-if="selectedWord.examples && selectedWord.examples.length" class="examples">
              <h4>例句：</h4>
              <ul>
                <li v-for="(example, index) in selectedWord.examples" :key="index">
                  {{ example }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="popup-actions">
            <button
              v-if="!isWordInVocabulary(selectedWord.word)"
              class="btn btn-primary"
              @click="addToVocabulary"
            >
              📚 加入单词本
            </button>
            <button
              v-else
              class="btn btn-outline"
              @click="removeFromVocabulary"
            >
              ✓ 已在单词本
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getExamType, getArticle, lookupWord } from '../data/exams'
import { useVocabularyStore } from '../stores/vocabulary'

const route = useRoute()
const vocabularyStore = useVocabularyStore()

const examType = ref(null)
const article = ref(null)
const loading = ref(true)
const selectedWord = ref(null)
const selectedAnswers = ref({})
const showAnswers = ref(false)

const paragraphs = computed(() => {
  if (!article.value) return []
  return article.value.passage.split('\n\n').filter(p => p.trim())
})

const wordCount = computed(() => {
  if (!article.value) return 0
  return article.value.passage.split(/\s+/).length
})

onMounted(async () => {
  examType.value = getExamType(route.params.examType)
  article.value = getArticle(
    route.params.examType,
    route.params.year,
    route.params.paper
  )
  loading.value = false
})

const handleWordClick = async (wordWithPunctuation) => {
  // Remove punctuation
  const word = wordWithPunctuation.replace(/[.,;:!?"'()]/g, '').trim()
  if (!word || word.length < 2) return
  
  selectedWord.value = { word, loading: true }
  
  try {
    const result = await lookupWord(word)
    selectedWord.value = result
  } catch (error) {
    selectedWord.value = {
      word,
      meaning: '查询失败，请稍后再试'
    }
  }
}

const closeWordPopup = () => {
  selectedWord.value = null
}

const isWordInVocabulary = (word) => {
  const cleanWord = word.replace(/[.,;:!?"'()]/g, '').toLowerCase().trim()
  return vocabularyStore.hasWord(cleanWord)
}

const addToVocabulary = () => {
  if (selectedWord.value) {
    vocabularyStore.addWord(selectedWord.value)
    // Show success message (you could add a toast notification here)
  }
}

const removeFromVocabulary = () => {
  if (selectedWord.value) {
    vocabularyStore.removeWord(selectedWord.value.word)
  }
}

const checkAnswers = () => {
  showAnswers.value = true
}

const resetAnswers = () => {
  selectedAnswers.value = {}
  showAnswers.value = false
}
</script>

<style scoped>
.exam-detail {
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

/* Loading State */
.loading-state {
  text-align: center;
  padding: 80px 20px;
}

.loading-state p {
  margin-top: 16px;
  color: var(--text-secondary);
}

/* Article Header */
.article-header {
  margin-bottom: 32px;
}

.article-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.word-count {
  font-size: 14px;
  color: var(--text-secondary);
}

/* Passage */
.passage-container {
  background: var(--surface);
  border-radius: 12px;
  padding: 40px;
  box-shadow: var(--shadow);
  margin-bottom: 48px;
}

.passage-content {
  font-size: 17px;
  line-height: 2;
  color: var(--text-primary);
}

.paragraph {
  margin-bottom: 24px;
  text-align: justify;
}

.word {
  cursor: pointer;
  padding: 2px 1px;
  border-radius: 2px;
  transition: all 0.2s ease;
  display: inline-block;
  margin-right: 4px;
}

.word:hover {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary-color);
}

.word-selected {
  background: rgba(16, 185, 129, 0.1);
  color: var(--secondary-color);
  font-weight: 500;
}

/* Questions */
.questions-section {
  background: var(--surface);
  border-radius: 12px;
  padding: 40px;
  box-shadow: var(--shadow);
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 32px;
}

.questions {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
}

.question-item {
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);
}

.question-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.6;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 2px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option:hover {
  border-color: var(--primary-color);
  background: rgba(59, 130, 246, 0.05);
}

.option input[type="radio"] {
  margin-top: 2px;
  cursor: pointer;
}

.option-label {
  font-weight: 600;
  color: var(--text-primary);
  min-width: 24px;
}

.option-text {
  flex: 1;
  color: var(--text-primary);
  line-height: 1.6;
}

.option-selected {
  border-color: var(--primary-color);
  background: rgba(59, 130, 246, 0.05);
}

.option-correct {
  border-color: var(--secondary-color);
  background: rgba(16, 185, 129, 0.05);
}

.option-wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

/* Word Popup */
.word-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.word-popup {
  background: var(--surface);
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid var(--border);
}

.popup-word {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  color: var(--text-secondary);
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--background);
  color: var(--text-primary);
}

.popup-content {
  padding: 24px;
}

.phonetic {
  color: var(--text-secondary);
  font-size: 16px;
  margin-bottom: 16px;
  font-style: italic;
}

.meaning {
  font-size: 16px;
  color: var(--text-primary);
  line-height: 1.8;
  margin-bottom: 16px;
}

.examples {
  margin-top: 24px;
}

.examples h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.examples ul {
  list-style: none;
  padding: 0;
}

.examples li {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.examples li:last-child {
  border-bottom: none;
}

.popup-actions {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: center;
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
  .article-title {
    font-size: 24px;
  }
  
  .passage-container,
  .questions-section {
    padding: 24px 16px;
  }
  
  .passage-content {
    font-size: 16px;
    line-height: 1.8;
  }
  
  .word-popup {
    margin: 20px;
  }
}
</style>
