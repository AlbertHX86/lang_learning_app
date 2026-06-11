import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Book, BookOpen, User, Users, CalendarDays, LogIn, Moon, Sun, Gamepad2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/courses', icon: Book, label: 'Courses' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/calendar', icon: CalendarDays, label: 'Calendar' },
    { path: '/snake', icon: Gamepad2, label: 'Snake' },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">123</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${location.pathname === item.path ? 'bg-blue-600 text-white' : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link 
              to="/auth/login"
              className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-full" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden fixed inset-0 z-40 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${location.pathname === item.path ? 'bg-blue-600 text-white' : theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-lg">{item.label}</span>
              </Link>
            ))}
            <button 
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              <span className="text-lg">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <Link 
              to="/auth/login"
              className="flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="h-6 w-6" />
              <span className="text-lg">Login</span>
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={`mt-auto py-8 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                123
              </h3>
              <p className="mb-4">Immersive language learning platform for English, Japanese, and Korean.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="hover:underline">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Languages</h4>
              <ul className="space-y-2">
                <li><span className="hover:underline cursor-pointer">English</span></li>
                <li><span className="hover:underline cursor-pointer">Japanese</span></li>
                <li><span className="hover:underline cursor-pointer">Korean</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center">
            <p>© 2026 123. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
