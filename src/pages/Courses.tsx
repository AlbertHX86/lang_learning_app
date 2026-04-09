import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Filter, Search } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Courses = () => {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const languages = [
    { code: 'all', name: 'All Languages' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  ];

  const levels = [
    { code: 'all', name: 'All Levels' },
    { code: 'beginner', name: 'Beginner' },
    { code: 'intermediate', name: 'Intermediate' },
    { code: 'advanced', name: 'Advanced' },
  ];

  const courses = [
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
    {
      id: '4',
      title: 'English Intermediate',
      description: 'Build on your English skills with more complex grammar and vocabulary',
      language: 'en',
      level: 'intermediate',
      duration: 30,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=intermediate%20english%20learning%20advanced%20class&image_size=landscape_16_9',
      isPremium: true,
    },
    {
      id: '5',
      title: 'Japanese Conversation',
      description: 'Practice everyday Japanese conversations',
      language: 'ja',
      level: 'intermediate',
      duration: 25,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20conversation%20practice%20dialogue&image_size=landscape_16_9',
      isPremium: true,
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesLevel && matchesSearch;
  });

  return (
    <div className={`space-y-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Courses</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Find the perfect course for your language learning journey
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className={`relative rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h3 className="font-semibold mb-3 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Language
            </h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedLanguage === lang.code ? 'bg-blue-600 text-white' : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  {lang.flag && <span className="mr-2">{lang.flag}</span>}
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <h3 className="font-semibold mb-3 flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Level
        </h3>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level.code}
              onClick={() => setSelectedLevel(level.code)}
              className={`px-4 py-2 rounded-full transition-colors ${selectedLevel === level.code ? 'bg-blue-600 text-white' : theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              No courses found matching your criteria
            </p>
            <button 
              onClick={() => {
                setSelectedLanguage('all');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;