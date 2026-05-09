import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from "../../api/endpoints";

/**
 * AdminRegister Component
 * Step 1 of admin registration — sends OTP to email
 * On success, redirects to OTP verification page
 */
export default function AdminRegister() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');       // 👈 Renamed from message to error
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  /**
   * Handles registration form submission
   * Validates fields → POST to backend → Redirect to OTP verify page
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // ── Client‑side validation ──
    if (!form.username.trim()) {
      setError('Username is required');
      return;
    }
    if (form.username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (!form.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!form.password) {
      setError('Password is required');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // 👈 Use the same authAPI as AdminLogin
      const response = await authAPI.signup(form.username, form.email, form.password);

      if (response.data?.success) {
        setSuccessMessage('OTP sent! Redirecting...');
        // Short delay for user to see success message
        setTimeout(() => {
          navigate('/admin/verify-otp', {
            state: {
              email: form.email,
              username: form.username,
              password: form.password,
            },
          });
        }, 800);
      } else {
        setError(response.data?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.status === 409) {
        setError('Username or email already exists.');
      } else if (err.response?.status === 429) {
        setError('Too many attempts. Please try again later.');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clears error when user starts typing in any field
   */
  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Registration</h1>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm" role="status">
            ✅ {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          {/* Username */}
          <div>
            <label htmlFor="reg-username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              id="reg-username"
              type="text"
              autoComplete="username"
              className="w-full px-4 py-2 border rounded-lg"
              value={form.username}
              onChange={(e) => handleFieldChange('username', e.target.value)}
              placeholder="Choose username"
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={form.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="admin@example.com"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              className="w-full px-4 py-2 border rounded-lg"
              value={form.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              placeholder="Minimum 6 characters"
              disabled={loading}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Sending OTP...' : 'Register'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/admin/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
