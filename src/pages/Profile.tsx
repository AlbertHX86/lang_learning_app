import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Award, BookOpen, Clock, BarChart3, Edit, LogOut, Globe, Star } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Profile = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20profile%20picture&image_size=square',
    languagePreference: 'en',
    isPremium: false,
  };

  const learningStats = {
    totalCourses: 3,
    completedCourses: 1,
    totalHours: 45,
    streak: 7,
    vocabulary: 150,
  };

  const achievements = [
    {
      id: '1',
      name: 'First Lesson',
      description: 'Complete your first lesson',
      icon: '🏆',
      earnedAt: '2026-03-15',
      unlocked: true,
    },
    {
      id: '2',
      name: 'Language Explorer',
      description: 'Start learning a new language',
      icon: '🌍',
      earnedAt: '2026-03-20',
      unlocked: true,
    },
    {
      id: '3',
      name: 'Consistent Learner',
      description: 'Learn for 7 days in a row',
      icon: '🔥',
      earnedAt: '2026-03-25',
      unlocked: true,
    },
    {
      id: '4',
      name: 'Vocabulary Master',
      description: 'Learn 100 new words',
      icon: '📚',
      earnedAt: null,
      unlocked: false,
    },
    {
      id: '5',
      name: 'Community Contributor',
      description: 'Post your first forum thread',
      icon: '💬',
      earnedAt: null,
      unlocked: false,
    },
  ];

  const courses = [
    {
      id: '1',
      title: 'English for Beginners',
      progress: 100,
      completed: true,
    },
    {
      id: '2',
      title: 'Japanese Hiragana & Katakana',
      progress: 60,
      completed: false,
    },
    {
      id: '3',
      title: 'Korean Basics',
      progress: 30,
      completed: false,
    },
  ];

  return (
    <div className={`space-y-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* User Info */}
      <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <button className={`absolute bottom-0 right-0 p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} border-2 border-blue-600`}>
              <Edit className="h-4 w-4 text-blue-600" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{user.email}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span>English</span>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            
            {!user.isPremium && (
              <div className="mt-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-center space-x-4">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold">Upgrade to Premium</h3>
                    <p className="text-sm text-gray-600">Access all courses and exclusive features</p>
                  </div>
                  <button className="ml-auto px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors">
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'courses' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'achievements' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
          >
            Achievements
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold">Learning Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Courses</h3>
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold">{learningStats.totalCourses}</p>
              </div>
              
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Completed</h3>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold">{learningStats.completedCourses}</p>
              </div>
              
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Hours</h3>
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold">{learningStats.totalHours}</p>
              </div>
              
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Streak</h3>
                  <Fire className="h-5 w-5 text-orange-600" />
                </div>
                <p className="text-2xl font-bold">{learningStats.streak} days</p>
              </div>
            </div>
            
            {/* Progress Chart */}
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="font-semibold mb-4">Learning Progress</h3>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{course.title}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">My Courses</h2>
            
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{course.title}</h3>
                    {course.completed && (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        Completed
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2 mb-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Progress: {course.progress}%</span>
                    <Link to={`/courses/${course.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors">
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center py-8">
              <Link to="/courses" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Explore More Courses
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">My Achievements</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-xl transition-all ${achievement.unlocked ? 
                    (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50') : 
                    (theme === 'dark' ? 'bg-gray-800 opacity-60' : 'bg-gray-100 opacity-60')
                  } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{achievement.icon}</span>
                    {achievement.unlocked ? (
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                        Unlocked
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                        Locked
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold mb-1">{achievement.name}</h3>
                  <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && achievement.earnedAt && (
                    <p className="text-xs text-gray-500">
                      Earned on {achievement.earnedAt}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Missing Fire icon component
const Fire = ({ className }: { className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
  </svg>
);

// Missing Check icon component
const Check = ({ className }: { className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

export default Profile;