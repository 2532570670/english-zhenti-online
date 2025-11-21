import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useVocabularyStore = defineStore('vocabulary', () => {
  // State
  const words = ref([])
  const progress = ref({})

  // Load from localStorage
  const loadData = () => {
    const savedWords = localStorage.getItem('vocabulary')
    const savedProgress = localStorage.getItem('progress')
    
    if (savedWords) {
      words.value = JSON.parse(savedWords)
    }
    if (savedProgress) {
      progress.value = JSON.parse(savedProgress)
    }
  }

  // Save to localStorage
  const saveData = () => {
    localStorage.setItem('vocabulary', JSON.stringify(words.value))
    localStorage.setItem('progress', JSON.stringify(progress.value))
  }

  // Add word
  const addWord = (word) => {
    const exists = words.value.find(w => w.word === word.word)
    if (!exists) {
      words.value.push({
        ...word,
        addedAt: new Date().toISOString(),
        reviewCount: 0
      })
      saveData()
    }
  }

  // Remove word
  const removeWord = (word) => {
    words.value = words.value.filter(w => w.word !== word)
    saveData()
  }

  // Check if word exists
  const hasWord = (word) => {
    return words.value.some(w => w.word === word)
  }

  // Update progress
  const updateProgress = (examType, year, paper, data) => {
    const key = `${examType}-${year}-${paper}`
    progress.value[key] = {
      ...data,
      updatedAt: new Date().toISOString()
    }
    saveData()
  }

  // Get progress
  const getProgress = (examType, year, paper) => {
    const key = `${examType}-${year}-${paper}`
    return progress.value[key] || null
  }

  // Computed
  const wordCount = computed(() => words.value.length)
  const todayWords = computed(() => {
    const today = new Date().toDateString()
    return words.value.filter(w => 
      new Date(w.addedAt).toDateString() === today
    ).length
  })

  // Initialize
  loadData()

  return {
    words,
    progress,
    wordCount,
    todayWords,
    addWord,
    removeWord,
    hasWord,
    updateProgress,
    getProgress
  }
})
