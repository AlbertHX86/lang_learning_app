import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Login = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟登录验证
    if (email && password) {
      // 登录成功，跳转到首页
      navigate('/');
    } else {
      setError('Please enter both email and password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Sign in to continue your language learning journey
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
              />
              <label htmlFor="remember" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>

          <div className="text-center text-sm">
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Don't have an account?
            </span>
            <Link
              to="/auth/register"
              className="ml-1 font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;