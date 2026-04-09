import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Globe, Clock, BookOpen, Check, ChevronRight, Star, Award, Users } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const CourseDetail = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('lessons');
  const [isEnrolled, setIsEnrolled] = useState(false);

  const courses = [
    {
      id: '1',
      title: 'English for Beginners',
      description: 'Start your English learning journey with basic vocabulary and grammar. This course covers essential words, simple sentence structures, and everyday conversations to help you build a strong foundation in English.',
      language: 'en',
      level: 'beginner',
      duration: 20,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20language%20learning%20classroom%20scene&image_size=landscape_16_9',
      isPremium: false,
      rating: 4.8,
      students: 1250,
      instructor: 'Sarah Johnson',
      lessons: [
        {
          id: '1-1',
          title: 'Introduction to English',
          description: 'Learn the basics of English pronunciation and alphabet',
          duration: 45,
          completed: false,
        },
        {
          id: '1-2',
          title: 'Greetings and Introductions',
          description: 'Learn how to greet people and introduce yourself',
          duration: 60,
          completed: false,
        },
        {
          id: '1-3',
          title: 'Basic Vocabulary',
          description: 'Essential words for everyday conversations',
          duration: 75,
          completed: false,
        },
        {
          id: '1-4',
          title: 'Simple Sentences',
          description: 'Learn to form basic sentences in English',
          duration: 60,
          completed: false,
        },
        {
          id: '1-5',
          title: 'Everyday Conversations',
          description: 'Practice common dialogues and scenarios',
          duration: 90,
          completed: false,
        },
      ],
      requirements: [
        'No prior English knowledge required',
        'Basic computer skills',
        'Access to a device with internet',
        'Willingness to practice regularly',
      ],
      whatYouWillLearn: [
        'Basic English vocabulary and grammar',
        'How to introduce yourself and greet others',
        'Simple everyday conversations',
        'Basic reading and writing skills',
        'Essential English pronunciation',
      ],
    },
  ];

  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <Link to="/courses" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
          Back to Courses
        </Link>
      </div>
    );
  }

  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    ja: { name: 'Japanese', flag: '🇯🇵' },
    ko: { name: 'Korean', flag: '🇰🇷' },
  };

  return (
    <div className={`space-y-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {/* Course Header */}
      <div className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-600 text-white text-sm">
              <Globe className="h-4 w-4" />
              <span>{languages[course.language as keyof typeof languages]?.name}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm">
              {course.level}
            </span>
            {course.isPremium && (
              <span className="px-3 py-1 rounded-full bg-yellow-500 text-white text-sm">
                Premium
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration} hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'lessons' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
              >
                Lessons
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'about' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'reviews' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
              >
                Reviews
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'lessons' && (
              <div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold">Course Curriculum</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {course.lessons.length} lessons • {course.duration} hours total
                  </p>
                </div>
                <div className="divide-y divide-gray-200">
                  {course.lessons.map((lesson, index) => (
                    <Link 
                      key={lesson.id}
                      to={`/learn/${course.id}/${lesson.id}`}
                      className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {lesson.completed ? <Check className="h-4 w-4" /> : index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{lesson.duration} min</span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className="text-xl font-semibold mb-4">About This Course</h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {course.description}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">What You Will Learn</h4>
                    <ul className="space-y-2">
                      {course.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {course.requirements.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="font-semibold">JD</span>
                      </div>
                      <div>
                        <h4 className="font-medium">John Doe</h4>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`h-4 w-4 ${star <= 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      This course is amazing! The lessons are well-structured and easy to follow. I've learned so much in just a few weeks.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="font-semibold">JS</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Jane Smith</h4>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Great course for beginners. The instructor explains everything clearly and the exercises are helpful.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enroll Card */}
          <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm sticky top-24`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">Free</span>
                {course.isPremium && (
                  <span className="px-3 py-1 rounded-full bg-yellow-500 text-white text-sm">
                    Premium
                  </span>
                )}
              </div>
              
              <button
                onClick={() => setIsEnrolled(!isEnrolled)}
                className={`w-full py-3 rounded-full font-semibold transition-colors ${isEnrolled ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
              </button>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {course.duration} hours total
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {course.lessons.length} lessons
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {languages[course.language as keyof typeof languages]?.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-gray-400" />
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Certificate of completion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;