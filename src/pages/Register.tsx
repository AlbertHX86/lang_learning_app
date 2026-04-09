import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Eye, EyeOff, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Register = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState('en');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // 模拟注册成功
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Start your language learning journey today
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg`}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className={`relative ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg overflow-hidden`}>
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} border-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className={`relative ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg overflow-hidden`}>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} border-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className={`relative ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg overflow-hidden`}>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} border-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Preferred Language
            </label>
            <div className="flex space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${language === lang.code ? 'bg-blue-600 text-white' : theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm">
              I agree to the Terms and Conditions and Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>

          <div className="text-center text-sm">
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Already have an account?
            </span>
            <Link
              to="/auth/login"
              className="ml-1 font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;