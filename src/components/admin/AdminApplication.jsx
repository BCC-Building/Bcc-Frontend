import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/endpoints';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [viewApp, setViewApp] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getApplications();
      if (response.data?.success) setApplications(response.data.data || []);
    } catch (err) { setError('Failed to load applications'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await adminAPI.deleteApplication(id);
      setSuccess('Application deleted');
      fetchApplications();
    } catch (err) { setError('Delete failed'); }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Job Applications</h2>
        <span className="text-gray-500 text-sm">{applications.length} total</span>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-3 rounded mb-4">{success}</div>}

      {/* View Modal – now shows all complete fields */}
      {viewApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewApp(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Application Details</h3>
              <button onClick={() => setViewApp(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <div className="space-y-3">
              <div><span className="text-sm text-gray-500">Name:</span><p className="font-medium">{viewApp.fullName}</p></div>
              <div><span className="text-sm text-gray-500">Email:</span><p className="font-medium text-blue-600">{viewApp.email}</p></div>
              <div><span className="text-sm text-gray-500">Phone:</span><p className="font-medium">{viewApp.phone}</p></div>
              <div><span className="text-sm text-gray-500">Position Applied:</span><p className="font-medium">{viewApp.jobTitle || 'N/A'}</p></div>
              <div><span className="text-sm text-gray-500">Experience:</span><p className="font-medium">{viewApp.yearsOfExperience || 'N/A'}</p></div>
              <div><span className="text-sm text-gray-500">Current Company:</span><p className="font-medium">{viewApp.currentCompany || 'N/A'}</p></div>
              <div><span className="text-sm text-gray-500">Portfolio/LinkedIn:</span>
                {viewApp.portfolioUrl ? (
                  <a href={viewApp.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline ml-2">{viewApp.portfolioUrl}</a>
                ) : 'N/A'}
              </div>
              <div><span className="text-sm text-gray-500">Resume:</span>
                {viewApp.resumeFilePath ? (
                  <a href={viewApp.resumeFilePath} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline ml-2">Download</a>
                ) : 'N/A'}
              </div>
              <div className="pt-3 border-t">
                <span className="text-sm text-gray-500">Cover Message:</span>
                <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{viewApp.coverMessage || 'No message'}</p>
              </div>
              <div className="text-xs text-gray-400">Submitted: {formatDate(viewApp.createdAt)}</div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { handleDelete(viewApp.id); setViewApp(null); }} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">Delete</button>
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
                  <td className="p-3 font-medium">{app.fullName}</td>
                  <td className="p-3 hidden md:table-cell text-blue-600">{app.email}</td>
                  <td className="p-3 hidden md:table-cell">{app.jobTitle || 'N/A'}</td>
                  <td className="p-3 hidden lg:table-cell text-xs text-gray-500">{formatDate(app.createdAt)}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => setViewApp(app)} className="text-blue-600 hover:underline text-xs">View</button>
                    <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:underline text-xs">Delete</button>
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