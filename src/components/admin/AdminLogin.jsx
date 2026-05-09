import { useEffect, useReducer } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// ─── Reducer ────────────────────────────────────────────────────────────────
const initialState = {
  step: 1,
  username: '',
  password: '',
  email: '',
  otp: '',
  message: '',
  loginError: '',
  otpError: '',
  resendTimer: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'CLEAR_LOGIN_ERROR':
      return { ...state, loginError: '' };
    case 'CLEAR_OTP_ERROR':
      return { ...state, otpError: '' };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        // Clear password immediately after successful login — never keep it in state
        password: '',
        email: action.email,
        message: action.message,
        resendTimer: 60,
        loginError: '',
        step: 2,
      };
    case 'LOGIN_FAILURE':
      return { ...state, loginError: action.message };
    case 'OTP_FAILURE':
      return { ...state, otpError: action.message };
    case 'RESEND_SUCCESS':
      return { ...state, message: 'OTP resent successfully', resendTimer: 60 };
    case 'RESEND_FAILURE':
      return { ...state, loginError: action.message };
    case 'TICK':
      return { ...state, resendTimer: state.resendTimer - 1 };
    case 'BACK_TO_STEP1':
      return { ...state, step: 1, otp: '', otpError: '' };
    default:
      return state;
  }
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function AdminLogin() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    step, username, password, email, otp,
    message, loginError, otpError, resendTimer,
  } = state;

  // Keep username & password in local state only for step 1 resend fallback
  // (resend uses a dedicated endpoint — not re-login, see handleResendOTP)
  const { login, verifyOTP, resendOTP, loading } = useAuth();
  const navigate = useNavigate();

  // ── Resend countdown: single setTimeout per tick (safer than setInterval)
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      dispatch({ type: 'LOGIN_FAILURE', message: 'Username is required' });
      return;
    }
    if (!password.trim()) {
      dispatch({ type: 'LOGIN_FAILURE', message: 'Password is required' });
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      dispatch({ type: 'LOGIN_SUCCESS', email: result.email, message: result.message });
    } else {
      dispatch({ type: 'LOGIN_FAILURE', message: result.message || 'Invalid credentials. Please try again.' });
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    // Validate: exactly 6 digits
    if (!/^\d{6}$/.test(otp)) {
      dispatch({ type: 'OTP_FAILURE', message: 'Please enter a valid 6-digit OTP' });
      return;
    }

    const result = await verifyOTP(email, otp);
    if (result.success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      dispatch({ type: 'OTP_FAILURE', message: result.message || 'OTP verification failed.' });
    }
  };

  const handleResendOTP = async () => {
    // Use a dedicated resendOTP method — avoids re-sending credentials over the wire
    // Backend should accept { email } and validate via session/token
    dispatch({ type: 'SET_FIELD', field: 'resendTimer', value: 60 });
    const result = await resendOTP(email);
    if (result.success) {
      dispatch({ type: 'RESEND_SUCCESS' });
    } else {
      dispatch({ type: 'RESEND_FAILURE', message: result.message || 'Failed to resend OTP.' });
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        {/* ── Step 1: Credentials ── */}
        {step === 1 && (
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="w-full px-3 py-2 border rounded"
                value={username}
                onChange={e => {
                  dispatch({ type: 'SET_FIELD', field: 'username', value: e.target.value });
                  dispatch({ type: 'CLEAR_LOGIN_ERROR' });
                }}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="w-full px-3 py-2 border rounded"
                value={password}
                onChange={e => {
                  dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value });
                  dispatch({ type: 'CLEAR_LOGIN_ERROR' });
                }}
              />
            </div>

            {/* Error shown inline above submit button */}
            {loginError && (
              <div role="alert" className="bg-red-50 text-red-700 p-3 rounded text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending OTP…' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* ── Step 2: OTP ── */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-4" noValidate>
            <div className="bg-green-50 text-green-700 p-3 rounded text-sm">
              {message}
            </div>
            <p className="text-sm text-gray-600">
              OTP sent to: <strong>{email}</strong>
            </p>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium mb-1">
                Enter 6-digit OTP
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                className="w-full px-3 py-2 border rounded text-center text-2xl tracking-widest"
                value={otp}
                onChange={e => {
                  dispatch({
                    type: 'SET_FIELD',
                    field: 'otp',
                    value: e.target.value.replace(/\D/g, ''),
                  });
                  dispatch({ type: 'CLEAR_OTP_ERROR' });
                }}
              />
            </div>

            {/* Error shown inline above submit button */}
            {otpError && (
              <div role="alert" className="bg-red-50 text-red-700 p-3 rounded text-sm">
                {otpError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Verifying…' : 'Verify & Login'}
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading || resendTimer > 0}
              className="w-full text-blue-600 text-sm disabled:text-gray-400"
            >
              {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: 'BACK_TO_STEP1' })}
              className="w-full text-blue-600 text-sm"
            >
              ← Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
