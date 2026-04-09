import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Mic, Check, X, Clock } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const LearningModule = () => {
  const { theme } = useTheme();
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [activeTab, setActiveTab] = useState('vocabulary');
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const vocabularyCards = [
    { word: 'Hello', translation: 'こんにちは', pronunciation: 'konnichiwa' },
    { word: 'Goodbye', translation: 'さようなら', pronunciation: 'sayonara' },
    { word: 'Thank you', translation: 'ありがとう', pronunciation: 'arigatou' },
    { word: 'Yes', translation: 'はい', pronunciation: 'hai' },
    { word: 'No', translation: 'いいえ', pronunciation: 'iie' },
  ];

  const grammarQuestions = [
    {
      question: 'Choose the correct particle: 私 __ 学生です',
      options: ['は', 'を', 'に', 'が'],
      correctAnswer: 0,
    },
    {
      question: 'Choose the correct form: 彼は毎日勉強 __',
      options: ['します', 'する', 'した', 'して'],
      correctAnswer: 0,
    },
    {
      question: 'Choose the correct word: __ 行きますか？',
      options: ['何', '誰', 'どこ', 'いつ'],
      correctAnswer: 2,
    },
  ];

  const listeningExercises = [
    {
      audio: 'https://example.com/audio1.mp3',
      transcript: 'こんにちは、私は田中です。',
      question: 'What is the person\'s name?',
      options: ['Tanaka', 'Yamada', 'Sato', 'Suzuki'],
      correctAnswer: 0,
    },
  ];

  const speakingExercises = [
    {
      prompt: 'Introduce yourself in Japanese',
      example: 'こんにちは、私は [your name] です。',
    },
  ];

  const handleAnswer = (selectedIndex: number, correctIndex: number) => {
    if (selectedIndex === correctIndex) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % vocabularyCards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + vocabularyCards.length) % vocabularyCards.length);
  };

  return (
    <div className={`space-y-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm">
        <Link to="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to={`/courses/${courseId}`} className="hover:underline">Course</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium">Lesson</span>
      </div>

      {/* Lesson Header */}
      <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Introduction to Japanese</h1>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>45 minutes</span>
          </div>
        </div>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Learn the basics of Japanese pronunciation and alphabet
        </p>
      </div>

      {/* Learning Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('vocabulary')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'vocabulary' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
          >
            Vocabulary
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'grammar' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
          >
            Grammar
          </button>
          <button
            onClick={() => setActiveTab('listening')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'listening' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
          >
            Listening
          </button>
          <button
            onClick={() => setActiveTab('speaking')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'speaking' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
          >
            Speaking
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className={`rounded-2xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        {/* Vocabulary Tab */}
        {activeTab === 'vocabulary' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold">Vocabulary Practice</h2>
            
            <div className="flex flex-col items-center">
              <div 
                className={`w-full max-w-md h-80 perspective-1000 mb-8`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div 
                  className={`w-full h-full rounded-xl transition-transform duration-600 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                >
                  {/* Front */}
                  <div className={`absolute w-full h-full backface-hidden rounded-xl flex flex-col items-center justify-center p-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
                    <h3 className="text-3xl font-bold mb-4">{vocabularyCards[currentCard].word}</h3>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span>Pronunciation</span>
                    </button>
                    <p className="mt-4 text-gray-500">Click to flip</p>
                  </div>
                  
                  {/* Back */}
                  <div className={`absolute w-full h-full backface-hidden rounded-xl flex flex-col items-center justify-center p-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-md rotate-y-180`}>
                    <h3 className="text-3xl font-bold mb-2">{vocabularyCards[currentCard].translation}</h3>
                    <p className="text-lg text-gray-500 mb-4">{vocabularyCards[currentCard].pronunciation}</p>
                    <p className="mt-4 text-gray-500">Click to flip back</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={prevCard}
                  className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="flex space-x-2">
                  {vocabularyCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentCard(index);
                        setIsFlipped(false);
                      }}
                      className={`w-3 h-3 rounded-full ${currentCard === index ? 'bg-blue-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextCard}
                  className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grammar Tab */}
        {activeTab === 'grammar' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold">Grammar Practice</h2>
            
            {currentQuestion < grammarQuestions.length ? (
              <div className="space-y-6">
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-medium mb-4">{grammarQuestions[currentQuestion].question}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {grammarQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index, grammarQuestions[currentQuestion].correctAnswer)}
                        className={`p-4 rounded-lg text-left transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Question {currentQuestion + 1} of {grammarQuestions.length}</span>
                  <span>Score: {score}/{currentQuestion + 1}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                <p className="text-lg mb-6">Your score: {score}/{grammarQuestions.length}</p>
                <button 
                  onClick={() => {
                    setScore(0);
                    setCurrentQuestion(0);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Listening Tab */}
        {activeTab === 'listening' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold">Listening Practice</h2>
            
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-4 mb-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors`}
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                <div className="flex-1 bg-gray-300 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <span className="text-sm">0:15 / 0:45</span>
              </div>
              
              <h3 className="text-lg font-medium mb-4">What is the person's name?</h3>
              <div className="space-y-3">
                {listeningExercises[0].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Speaking Tab */}
        {activeTab === 'speaking' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold">Speaking Practice</h2>
            
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="text-lg font-medium mb-4">{speakingExercises[0].prompt}</h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Example: {speakingExercises[0].example}
              </p>
              
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-6 rounded-full ${isRecording ? 'bg-red-600' : 'bg-blue-600'} text-white hover:${isRecording ? 'bg-red-700' : 'bg-blue-700'} transition-colors mb-4`}
                >
                  <Mic className="h-8 w-8" />
                </button>
                <span className={`text-lg ${isRecording ? 'text-red-500' : ''}`}>
                  {isRecording ? 'Recording...' : 'Click to record'}
                </span>
                <div className="mt-8 w-full">
                  <h4 className="font-medium mb-2">Feedback</h4>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Great job! Your pronunciation is clear. Try to emphasize the 'は' particle a bit more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link to={`/courses/${courseId}`} className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Course</span>
        </Link>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
          Mark as Complete
        </button>
      </div>
    </div>
  );
};

export default LearningModule;