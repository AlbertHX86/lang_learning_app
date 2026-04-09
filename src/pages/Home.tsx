import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, ChevronRight, Globe, Award, Users } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Home = () => {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', color: 'bg-blue-500' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', color: 'bg-red-500' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', color: 'bg-blue-600' },
  ];

  const featuredCourses = [
    {
      id: '1',
      title: 'English for Beginners',
      description: 'Start your English learning journey with basic vocabulary and grammar',
      language: 'en',
      level: 'beginner',
      duration: 20,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20language%20learning%20classroom%20scene&image_size=landscape_16_9',
      isPremium: false,
    },
    {
      id: '2',
      title: 'Japanese Hiragana & Katakana',
      description: 'Master the Japanese writing system',
      language: 'ja',
      level: 'beginner',
      duration: 15,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20hiragana%20katakana%20learning&image_size=landscape_16_9',
      isPremium: false,
    },
    {
      id: '3',
      title: 'Korean Basics',
      description: 'Learn Korean fundamentals including Hangul',
      language: 'ko',
      level: 'beginner',
      duration: 18,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=korean%20language%20learning%20hangul&image_size=landscape_16_9',
      isPremium: false,
    },
  ];

  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-blue-600" />,
      title: 'Structured Courses',
      description: '分级课程体系，从基础到高级，循序渐进',
    },
    {
      icon: <PlayCircle className="h-10 w-10 text-blue-600" />,
      title: 'Interactive Learning',
      description: '单词记忆、语法练习、口语跟读、听力训练',
    },
    {
      icon: <Award className="h-10 w-10 text-blue-600" />,
      title: 'Achievement System',
      description: '学习成就和徽章系统，激励持续学习',
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: 'Community',
      description: '加入学习社区，与其他学习者交流',
    },
  ];

  return (
    <div className={`space-y-16 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Learn Languages the Immersive Way
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Master English, Japanese, and Korean with interactive lessons and real-world practice
            </p>
            
            {/* Language Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${selectedLanguage === lang.code ? `${lang.color} text-white shadow-lg scale-105` : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courses" className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg">
                Explore Courses
              </Link>
              <Link to="/auth/register" className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LinguaLearn</h2>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Our platform offers a comprehensive language learning experience designed to help you achieve fluency
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-8 rounded-2xl transition-all hover:shadow-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Courses</h2>
          <Link to="/courses" className="flex items-center space-x-2 text-blue-600 font-semibold hover:underline">
            <span>View All</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <Link 
              key={course.id}
              to={`/courses/${course.id}`}
              className={`block rounded-2xl overflow-hidden transition-all hover:shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                {course.isPremium && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Premium
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    {languages.find(l => l.code === course.language)?.name}
                  </span>
                  <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{course.duration} hours</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`rounded-3xl py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Language Journey?</h2>
          <p className={`max-w-2xl mx-auto mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of learners who are mastering languages with our immersive platform
          </p>
          <Link to="/auth/register" className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg">
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;