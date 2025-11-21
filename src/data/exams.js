// 考试类型数据
export const examTypes = [
  {
    id: 'kaoyan',
    name: '考研英语',
    description: '研究生入学考试英语真题',
    icon: '🎓',
    color: '#3b82f6',
    years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015']
  },
  {
    id: 'cet6',
    name: '英语六级',
    description: 'CET-6 大学英语六级真题',
    icon: '📖',
    color: '#10b981',
    years: ['2024-06', '2023-12', '2023-06', '2022-12', '2022-06', '2021-12', '2021-06', '2020-12']
  },
  {
    id: 'cet4',
    name: '英语四级',
    description: 'CET-4 大学英语四级真题',
    icon: '📝',
    color: '#f59e0b',
    years: ['2024-06', '2023-12', '2023-06', '2022-12', '2022-06', '2021-12', '2021-06', '2020-12']
  },
  {
    id: 'tem8',
    name: '英语专八',
    description: 'TEM-8 英语专业八级真题',
    icon: '🏆',
    color: '#8b5cf6',
    years: ['2024', '2023', '2022', '2021', '2020', '2019']
  },
  {
    id: 'tem4',
    name: '英语专四',
    description: 'TEM-4 英语专业四级真题',
    icon: '🎯',
    color: '#ec4899',
    years: ['2024', '2023', '2022', '2021', '2020', '2019']
  },
  {
    id: 'ielts',
    name: '雅思',
    description: 'IELTS 国际英语语言测试系统',
    icon: '🌍',
    color: '#06b6d4',
    years: ['2024', '2023', '2022', '2021']
  }
]

// 真题试卷数据
export const examPapers = {
  'kaoyan-2024': [
    { id: '01', name: '阅读理解 Part A', type: 'reading' },
    { id: '02', name: '阅读理解 Part B', type: 'reading' },
    { id: '03', name: '翻译', type: 'translation' },
    { id: '04', name: '写作', type: 'writing' }
  ],
  'cet6-2023-12': [
    { id: '01', name: '写作', type: 'writing' },
    { id: '02', name: '听力理解', type: 'listening' },
    { id: '03', name: '阅读理解', type: 'reading' },
    { id: '04', name: '翻译', type: 'translation' }
  ]
}

// 示例文章内容
export const articleContent = {
  'kaoyan-2024-01': {
    title: '2024考研英语一 阅读理解 Text 1',
    passage: `The concept of "emotional intelligence" was popularized in the 1990s by psychologist Daniel Goleman. He argued that emotional intelligence—the ability to identify, assess, and control one's own emotions, as well as those of others—is at least as important as traditional cognitive intelligence in determining life success.

Since then, the idea has gained widespread acceptance in business and education circles. Many companies now incorporate emotional intelligence assessments into their hiring processes, and schools have begun teaching social-emotional learning skills alongside traditional academic subjects.

However, some researchers have questioned whether emotional intelligence is truly distinct from other well-established psychological constructs, such as personality traits and cognitive abilities. They argue that the concept may be too broad and ill-defined to be scientifically useful.

Despite these criticisms, proponents of emotional intelligence maintain that it represents a valuable framework for understanding human behavior and potential. They point to studies suggesting that people with high emotional intelligence tend to have better mental health, stronger relationships, and greater career success than those with lower emotional intelligence scores.

The debate over emotional intelligence reflects broader questions about what we value in human capabilities and how we should measure them. As our understanding of psychology continues to evolve, it's likely that the conversation about emotional intelligence will continue as well.`,
    questions: [
      {
        id: 1,
        question: 'According to Daniel Goleman, emotional intelligence is:',
        options: [
          'Less important than cognitive intelligence',
          'At least as important as cognitive intelligence',
          'More important than cognitive intelligence',
          'Unrelated to life success'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What criticism do some researchers make about emotional intelligence?',
        options: [
          'It is too specific',
          'It is too broad and ill-defined',
          'It has no practical applications',
          'It contradicts established theories'
        ],
        correctAnswer: 1
      }
    ]
  },
  'cet6-2023-12-03': {
    title: '2023年12月英语六级 阅读理解 Passage 1',
    passage: `Climate change is one of the most pressing challenges facing humanity today. Rising global temperatures, melting ice caps, and increasingly severe weather events are just some of the consequences of our warming planet.

Scientists largely agree that human activities, particularly the burning of fossil fuels, are the primary drivers of recent climate change. The carbon dioxide and other greenhouse gases released into the atmosphere trap heat, leading to a gradual warming of the Earth's surface.

The impacts of climate change are far-reaching and affect virtually every aspect of our lives. Agriculture is threatened by changing weather patterns and more frequent droughts. Coastal communities face rising sea levels. Biodiversity is at risk as species struggle to adapt to rapidly changing conditions.

Addressing climate change requires coordinated global action. Many countries have committed to reducing their carbon emissions through international agreements like the Paris Climate Accord. Individuals can also contribute by making more sustainable choices in their daily lives, such as reducing energy consumption, using public transportation, and supporting renewable energy initiatives.

While the challenge is significant, there is still time to mitigate the worst effects of climate change if we act now. The choices we make today will determine the kind of world we leave for future generations.`,
    questions: [
      {
        id: 1,
        question: 'What is identified as the primary cause of recent climate change?',
        options: [
          'Natural weather cycles',
          'Solar radiation',
          'Human activities and fossil fuel burning',
          'Volcanic activity'
        ],
        correctAnswer: 2
      }
    ]
  }
}

// 词典API（模拟）
export const dictionary = {
  'intelligence': {
    word: 'intelligence',
    phonetic: '/ɪnˈtelɪdʒəns/',
    meaning: 'n. 智力；理解力；情报；智能',
    examples: ['He didn\'t even have the intelligence to call for help.']
  },
  'emotional': {
    word: 'emotional',
    phonetic: '/ɪˈməʊʃənl/',
    meaning: 'adj. 情感的；情绪的；感情的',
    examples: ['Emotional intelligence is important in leadership.']
  },
  'climate': {
    word: 'climate',
    phonetic: '/ˈklaɪmət/',
    meaning: 'n. 气候；风气；氛围',
    examples: ['The climate is changing rapidly.']
  },
  'challenge': {
    word: 'challenge',
    phonetic: '/ˈtʃælɪndʒ/',
    meaning: 'n. 挑战；质疑 v. 向...挑战；质疑',
    examples: ['This is a major challenge for scientists.']
  },
  'global': {
    word: 'global',
    phonetic: '/ˈɡləʊbl/',
    meaning: 'adj. 全球的；全世界的；整体的',
    examples: ['Global warming is a serious issue.']
  }
}

export const getExamType = (id) => {
  return examTypes.find(type => type.id === id)
}

export const getArticle = (examType, year, paper) => {
  const key = `${examType}-${year}-${paper}`
  return articleContent[key] || null
}

export const lookupWord = async (word) => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const lowerWord = word.toLowerCase()
  const result = dictionary[lowerWord]
  
  if (result) {
    return result
  }
  
  // 返回默认结果
  return {
    word: word,
    phonetic: '',
    meaning: '暂无释义（词库更新中）',
    examples: []
  }
}
