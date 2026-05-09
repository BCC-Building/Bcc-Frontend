import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../../api/endpoints';
import StorageService from '../../utils/storage';

export default function AdminVerifyOTP() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || '';
  const username = location.state?.username || '';
  const password = location.state?.password || '';

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email missing. Please register again.');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await authAPI.verifySignupOTP({
        email,
        otp,
        username,
        password,
      });

      if (data.success) {
        StorageService.setTokens(data.data.accessToken, data.data.refreshToken);
        StorageService.setAdminUser({ username: data.data.username });
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-center">Verify OTP</h1>
        <p className="text-center text-gray-600 mb-6">
          OTP sent to: <strong>{email || 'your email'}</strong>
        </p>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Enter 6-digit OTP</label>
            <input
              type="text"
              maxLength={6}
              required
              className="w-full px-4 py-3 border rounded-lg text-center text-2xl tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loading ? 'Verifying...' : 'Verify & Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
