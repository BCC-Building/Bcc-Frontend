import { useState, useEffect, useCallback, useRef } from 'react';
import { adminAPI } from '../../api/endpoints';
import { ENV } from '../../config/env';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [viewApp, setViewApp] = useState(null);
  const messageTimeout = useRef(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getApplications();
      if (response.data?.success) setApplications(response.data.data || []);
    } catch (err) {
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  // Escape key se modal close
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setViewApp(null);
    if (viewApp) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [viewApp]);

  // Cleanup timeout on unmount
  useEffect(() => () => clearTimeout(messageTimeout.current), []);

  const showMessage = (setter, text) => {
    setter(text);
    clearTimeout(messageTimeout.current);
    messageTimeout.current = setTimeout(() => setter(''), 3000);
  };

  const handleDelete = async (id) => {
    if (deletingId) return; // double-click guard
    if (!window.confirm('Delete this application?')) return;
    setDeletingId(id);
    try {
      await adminAPI.deleteApplication(id);
      // Local state se hi remove karo — extra fetch call ki zaroorat nahi
      setApplications(prev => prev.filter(app => app.id !== id));
      showMessage(setSuccess, 'Application deleted');
      setViewApp(null);
    } catch (err) {
      showMessage(setError, 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const resumeUrl = (path) => path ? `${ENV.API_IMAGE_BASE_URL}${path}` : null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Job Applications</h2>
        <span className="text-gray-500 text-sm">{applications.length} total</span>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-3 rounded mb-4">{success}</div>}

      {/* View Modal */}
      {viewApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewApp(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Application Details</h3>
              <button onClick={() => setViewApp(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <div className="space-y-3">
              <div><span className="text-sm text-gray-500">Name:</span><p className="font-medium">{viewApp.fullName || 'N/A'}</p></div>
              <div><span className="text-sm text-gray-500">Email:</span><p className="font-medium text-blue-600">{viewApp.email}</p></div>
              <div><span className="text-sm text-gray-500">Phone:</span><p className="font-medium">{viewApp.phone}</p></div>
              <div><span className="text-sm text-gray-500">Position Applied:</span><p className="font-medium">{viewApp.jobTitle || 'N/A'}</p></div>
              <div><span className="text-sm text-gray-500">Experience:</span><p className="font-medium">{viewApp.yearsOfExperience || 'N/A'}</p></div>
              <div><span className="text-sm text-gray-500">Current Company:</span><p className="font-medium">{viewApp.currentCompany || 'N/A'}</p></div>
              <div><span className="text-sm text-gray-500">Portfolio/LinkedIn:</span>
                {viewApp.portfolioUrl ? (
                  <a href={viewApp.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">{viewApp.portfolioUrl}</a>
                ) : ' N/A'}
              </div>
              <div><span className="text-sm text-gray-500">Resume:</span>
                {resumeUrl(viewApp.resumeFilePath) ? (
                  <a
                    href={resumeUrl(viewApp.resumeFilePath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-2"
                  >
                    Download
                  </a>
                ) : ' N/A'}
              </div>
              <div className="pt-3 border-t">
                <span className="text-sm text-gray-500">Cover Message:</span>
                <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{viewApp.coverMessage || 'No message'}</p>
              </div>
              <div className="text-xs text-gray-400">Submitted: {formatDate(viewApp.createdAt)}</div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => handleDelete(viewApp.id)}
                disabled={deletingId === viewApp.id}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingId === viewApp.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applications Table */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No applications received yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Name</th>
                <th className="p-3 hidden md:table-cell">Email</th>
                <th className="p-3 hidden md:table-cell">Position</th>
                <th className="p-3 hidden lg:table-cell">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{app.fullName || 'N/A'}</td>
                  <td className="p-3 hidden md:table-cell text-blue-600">{app.email}</td>
                  <td className="p-3 hidden md:table-cell">{app.jobTitle || 'N/A'}</td>
                  <td className="p-3 hidden lg:table-cell text-xs text-gray-500">{formatDate(app.createdAt)}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => setViewApp(app)} className="text-blue-600 hover:underline text-xs">View</button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      disabled={deletingId === app.id}
                      className="text-red-600 hover:underline text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === app.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}