// src/components/admin/AdminContacts.jsx
import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/endpoints';

/**
 * AdminContacts Component
 * View and delete contact form submissions
 * Backend: /api/contact (GET, DELETE)
 */

export default function AdminContacts() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  // ==================== FETCH ====================
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getContactMessages();
      if (response.data?.success) setMessages(response.data.data || []);
    } catch (err) { setError('Failed to load messages'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  // ==================== HANDLERS ====================
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await adminAPI.deleteContactMessage(id);
      setSuccess('Message deleted');
      fetchMessages();
    } catch (err) { setError('Delete failed'); }
  };

  const handleView = (message) => {
    setSelectedMessage(message);
    setViewModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  // ==================== RENDER ====================
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <span className="text-gray-500 text-sm">{messages.length} messages</span>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-3 rounded mb-4">{success}</div>}

      {/* View Message Modal */}
      {viewModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Message Details</h3>
              <button onClick={() => setViewModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <div className="space-y-3">
              <div><span className="text-sm text-gray-500">Name:</span><p className="font-medium">{selectedMessage.fullName}</p></div>
              <div><span className="text-sm text-gray-500">Email:</span><p className="font-medium text-blue-600">{selectedMessage.email}</p></div>
              <div><span className="text-sm text-gray-500">Phone:</span><p className="font-medium">{selectedMessage.phone}</p></div>
              <div><span className="text-sm text-gray-500">Service:</span><p className="font-medium">{selectedMessage.service || 'N/A'}</p></div>
              <div><span className="text-sm text-gray-500">Date:</span><p className="font-medium">{formatDate(selectedMessage.createdAt)}</p></div>
              <div className="pt-3 border-t">
                <span className="text-sm text-gray-500">Message:</span>
                <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6 pt-4 border-t">
              <a href={`mailto:${selectedMessage.email}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Reply via Email</a>
              <button onClick={() => { handleDelete(selectedMessage.id); setViewModal(false); }} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Table */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No messages yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Name</th>
                <th className="p-3 hidden md:table-cell">Email</th>
                <th className="p-3 hidden md:table-cell">Phone</th>
                <th className="p-3 hidden lg:table-cell">Service</th>
                <th className="p-3 hidden lg:table-cell">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{msg.fullName}</td>
                  <td className="p-3 hidden md:table-cell text-blue-600">{msg.email}</td>
                  <td className="p-3 hidden md:table-cell">{msg.phone}</td>
                  <td className="p-3 hidden lg:table-cell">{msg.service || 'N/A'}</td>
                  <td className="p-3 hidden lg:table-cell text-xs text-gray-500">{formatDate(msg.createdAt)}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleView(msg)} className="text-blue-600 hover:underline text-xs">View</button>
                    <button onClick={() => handleDelete(msg.id)} className="text-red-600 hover:underline text-xs">Delete</button>
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