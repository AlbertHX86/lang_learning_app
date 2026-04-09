import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Globe, ChevronDown, ChevronUp, Heart, Share2, Bookmark } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Community = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('forum');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const threads = [
    {
      id: '1',
      title: 'How to improve Japanese pronunciation?',
      content: 'I\'m struggling with Japanese pronunciation, especially with the "r" sound. Any tips?',
      author: 'John Doe',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%201&image_size=square',
      language: 'ja',
      replies: 12,
      views: 156,
      likes: 8,
      created: '2 hours ago',
    },
    {
      id: '2',
      title: 'English idioms and their meanings',
      content: 'Let\'s share some common English idioms and their meanings. I\'ll start with "break a leg" which means good luck!',
      author: 'Jane Smith',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%202&image_size=square',
      language: 'en',
      replies: 25,
      views: 320,
      likes: 15,
      created: '5 hours ago',
    },
    {
      id: '3',
      title: 'Korean honorifics confusion',
      content: 'I\'m confused about when to use formal and informal speech in Korean. Can someone explain the basics?',
      author: 'Mike Johnson',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%203&image_size=square',
      language: 'ko',
      replies: 8,
      views: 92,
      likes: 4,
      created: '1 day ago',
    },
  ];

  const groups = [
    {
      id: '1',
      name: 'English Conversation Practice',
      description: 'Practice English with other learners around the world',
      members: 1250,
      language: 'en',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20conversation%20group&image_size=landscape_4_3',
    },
    {
      id: '2',
      name: 'Japanese Study Group',
      description: 'Learn Japanese together and share resources',
      members: 870,
      language: 'ja',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20study%20group&image_size=landscape_4_3',
    },
    {
      id: '3',
      name: 'Korean Language Exchange',
      description: 'Exchange Korean language skills with native speakers',
      members: 620,
      language: 'ko',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=korean%20language%20exchange&image_size=landscape_4_3',
    },
  ];

  const languages = [
    { code: 'all', name: 'All Languages' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  ];

  const filteredThreads = threads.filter(thread => 
    selectedLanguage === 'all' || thread.language === selectedLanguage
  );

  const filteredGroups = groups.filter(group => 
    selectedLanguage === 'all' || group.language === selectedLanguage
  );

  return (
    <div className={`space-y-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <h1 className="text-3xl font-bold">Community</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('forum')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'forum' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
          >
            Forum
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === 'groups' ? 'border-blue-600 text-blue-600' : theme === 'dark' ? 'border-transparent hover:text-gray-300' : 'border-transparent hover:text-gray-700'}`}
          >
            Study Groups
          </button>
        </div>
      </div>

      {/* Language Filter */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-medium">Filter by language:</span>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-colors ${selectedLanguage === lang.code ? 'bg-blue-600 text-white' : theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {lang.flag && <span>{lang.flag}</span>}
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm overflow-hidden`}>
        {activeTab === 'forum' && (
          <div className="divide-y divide-gray-200">
            {/* New Thread Button */}
            <div className="p-6">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Start a New Thread
              </button>
            </div>

            {/* Thread List */}
            <div className="divide-y divide-gray-200">
              {filteredThreads.length > 0 ? (
                filteredThreads.map((thread) => (
                  <div key={thread.id} className={`p-6 hover:bg-gray-50 transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img src={thread.avatar} alt={thread.author} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{thread.title}</h3>
                          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                            {languages.find(l => l.code === thread.language)?.name}
                          </span>
                        </div>
                        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {thread.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">By {thread.author}</span>
                            <span className="text-sm text-gray-500">{thread.created}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-sm">
                              <MessageSquare className="h-4 w-4 text-gray-400" />
                              <span>{thread.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <Heart className="h-4 w-4 text-gray-400" />
                              <span>{thread.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <Bookmark className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-16 text-center">
                  <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    No threads found for this language
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="p-6">
            {/* New Group Button */}
            <div className="mb-8">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Create a New Study Group
              </button>
            </div>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                  <div key={group.id} className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="h-48 overflow-hidden">
                      <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{group.name}</h3>
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                          {languages.find(l => l.code === group.language)?.name}
                        </span>
                      </div>
                      <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {group.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{group.members} members</span>
                        </div>
                        <button className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors">
                          Join Group
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    No study groups found for this language
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;