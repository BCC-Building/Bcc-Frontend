// src/components/admin/AdminCareers.jsx
import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/endpoints';

/**
 * AdminCareers Component
 * Full CRUD for job postings: Create, Read, Update, Delete
 * Backend: /api/job-postings (GET, POST, PUT, DELETE)
 */

export default function AdminCareers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '', department: 'Engineering', location: '',
    jobType: 'Full-time', description: '', requirements: '',
    responsibilities: '', experienceRequired: '', salaryRange: '',
    noOfOpenings: '', isActive: true, postedDate: '', lastDateToApply: '',
  });

  // ==================== FETCH ====================
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getJobPostings();
      if (response.data?.success) setJobs(response.data.data || []);
    } catch (err) { setError('Failed to load job postings'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchJobs(); }, []);

  // ==================== HANDLERS ====================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const payload = {
      ...form,
      noOfOpenings: form.noOfOpenings ? parseInt(form.noOfOpenings) : null,
      postedDate: form.postedDate || null,
      lastDateToApply: form.lastDateToApply || null,
    };
    try {
      if (editingId) { await adminAPI.updateJobPosting(editingId, payload); setSuccess('Job updated!'); }
      else { await adminAPI.createJobPosting(payload); setSuccess('Job created!'); }
      resetForm(); fetchJobs();
    } catch (err) { setError(err.response?.data?.message || 'Operation failed'); }
  };

  const handleEdit = (job) => {
    setForm({
      title: job.title || '', department: job.department || 'Engineering',
      location: job.location || '', jobType: job.jobType || 'Full-time',
      description: job.description || '', requirements: job.requirements || '',
      responsibilities: job.responsibilities || '', experienceRequired: job.experienceRequired || '',
      salaryRange: job.salaryRange || '', noOfOpenings: job.noOfOpenings || '',
      isActive: job.isActive ?? true, postedDate: job.postedDate || '',
      lastDateToApply: job.lastDateToApply || '',
    });
    setEditingId(job.id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job posting?')) return;
    try { await adminAPI.deleteJobPosting(id); setSuccess('Job deleted'); fetchJobs(); }
    catch (err) { setError('Delete failed'); }
  };

  const resetForm = () => {
    setForm({ title: '', department: 'Engineering', location: '', jobType: 'Full-time', description: '', requirements: '', responsibilities: '', experienceRequired: '', salaryRange: '', noOfOpenings: '', isActive: true, postedDate: '', lastDateToApply: '' });
    setEditingId(null); setShowForm(false);
  };

  // ==================== RENDER ====================
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Job Postings</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ Add Job</button>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-3 rounded mb-4">{success}</div>}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Job' : 'Add Job'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Job Title *</label>
                  <input type="text" name="title" required className="w-full px-3 py-2 border rounded" value={form.title} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <select name="department" className="w-full px-3 py-2 border rounded" value={form.department} onChange={handleChange}>
                    <option>Engineering</option><option>Architecture</option><option>Construction</option><option>Design</option><option>Quality Assurance</option><option>Digital Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Job Type</label>
                  <select name="jobType" className="w-full px-3 py-2 border rounded" value={form.jobType} onChange={handleChange}>
                    <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input type="text" name="location" className="w-full px-3 py-2 border rounded" value={form.location} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Experience Required</label>
                  <input type="text" name="experienceRequired" className="w-full px-3 py-2 border rounded" value={form.experienceRequired} onChange={handleChange} placeholder="2-5 years" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Salary Range</label>
                  <input type="text" name="salaryRange" className="w-full px-3 py-2 border rounded" value={form.salaryRange} onChange={handleChange} placeholder="₹5-8 LPA" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">No. of Openings</label>
                  <input type="number" name="noOfOpenings" className="w-full px-3 py-2 border rounded" value={form.noOfOpenings} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Posted Date</label>
                  <input type="date" name="postedDate" className="w-full px-3 py-2 border rounded" value={form.postedDate} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Date to Apply</label>
                  <input type="date" name="lastDateToApply" className="w-full px-3 py-2 border rounded" value={form.lastDateToApply} onChange={handleChange} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea name="description" required rows={3} className="w-full px-3 py-2 border rounded" value={form.description} onChange={handleChange} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Requirements</label>
                  <textarea name="requirements" rows={3} className="w-full px-3 py-2 border rounded" value={form.requirements} onChange={handleChange} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Responsibilities</label>
                  <textarea name="responsibilities" rows={3} className="w-full px-3 py-2 border rounded" value={form.responsibilities} onChange={handleChange} />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button type="button" onClick={resetForm} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editingId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? <div className="text-center py-10 text-gray-500">Loading...</div> : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-gray-100">
              <th className="p-3">Title</th><th className="p-3">Department</th><th className="p-3">Location</th><th className="p-3">Type</th><th className="p-3">Active</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{job.title}</td>
                  <td className="p-3">{job.department}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3">{job.jobType}</td>
                  <td className="p-3">{job.isActive ? '✅' : '❌'}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(job)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:underline">Delete</button>
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