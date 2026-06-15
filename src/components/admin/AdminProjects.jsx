// src/components/admin/AdminProjects.jsx
import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/endpoints';
import { getImageUrl } from '../../api/clients';

export default function AdminProjects() {
  // ==================== STATE ====================
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '', description: '', clientName: '', location: '',
    projectType: 'Residential', status: 'Ongoing',
    startDate: '', completionDate: '',
    testimonial: '',
  });

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);

  // ==================== FETCH ====================
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getProjects();
      if (response.data?.success) {
        setProjects(response.data.data || []);
      }
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  // Auto clear messages
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // ==================== HANDLERS ====================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;

    // UI se turant hata do
    setProjects(prev => prev.filter(p => p.id !== id));
    setSuccess('Project deleted successfully!');

    try {
      await adminAPI.deleteProject(id);
    } catch (err) {
      // Error aaye to rollback
      setError('Delete failed. Please try again.');
      setSuccess('');
      fetchProjects();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    const fd = new FormData();
    const payload = {
      title: form.title,
      description: form.description,
      clientName: form.clientName,
      location: form.location,
      projectType: form.projectType,
      status: form.status,
      startDate: form.startDate || null,
      completionDate: form.completionDate || null,
      testimonial: form.testimonial,
    };

    fd.append('project', new Blob([JSON.stringify(payload)],
      { type: 'application/json' }));

    if (coverImageFile) fd.append('coverImage', coverImageFile);
    additionalImageFiles.forEach(file => fd.append('images', file));

    try {
      if (editingId) {
        await adminAPI.updateProject(editingId, fd);
        setSuccess('Project updated successfully!');
      } else {
        await adminAPI.createProject(fd);
        setSuccess('Project created successfully!');
      }
      
      resetForm();        
      fetchProjects();   

    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
};

  const handleEdit = (project) => {
    setForm({
      title: project.title || '',
      description: project.description || '',
      clientName: project.clientName || '',
      location: project.location || '',
      projectType: project.projectType || 'Residential',
      status: project.status || 'Ongoing',
      startDate: project.startDate || '',
      completionDate: project.completionDate || '',
      testimonial: project.testimonial || '',
    });

    if (project.coverImageUrl) {
      setCoverImagePreview(getImageUrl(project.coverImageUrl));
    } else {
      setCoverImagePreview('');
    }

    if (project.imageUrls && project.imageUrls.length > 0) {
      setAdditionalPreviews(project.imageUrls.map(url => getImageUrl(url)));
    } else {
      setAdditionalPreviews([]);
    }

    setCoverImageFile(null);
    setAdditionalImageFiles([]);
    setEditingId(project.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({
      title: '', description: '', clientName: '', location: '',
      projectType: 'Residential', status: 'Ongoing',
      startDate: '', completionDate: '',
      testimonial: '',
    });
    setCoverImageFile(null);
    setCoverImagePreview('');
    setAdditionalImageFiles([]);
    setAdditionalPreviews([]);
    setEditingId(null);
    setShowForm(false);
  };

  // ==================== RENDER ====================
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-4 
          flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError('')} 
            className="text-red-500 hover:text-red-700">✕</button>
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded mb-4 
          flex justify-between items-center">
          <span>{success}</span>
          <button onClick={() => setSuccess('')} 
            className="text-green-500 hover:text-green-700">✕</button>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center 
          justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl 
            max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Project' : 'Add Project'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">

                {/* Title */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Title *
                  </label>
                  <input type="text" name="title" required
                    className="w-full px-3 py-2 border rounded"
                    value={form.title} onChange={handleChange} />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Description *
                  </label>
                  <textarea name="description" required rows={3}
                    className="w-full px-3 py-2 border rounded"
                    value={form.description} onChange={handleChange} />
                </div>

                {/* Client */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Client Name
                  </label>
                  <input type="text" name="clientName"
                    className="w-full px-3 py-2 border rounded"
                    value={form.clientName} onChange={handleChange} />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input type="text" name="location"
                    className="w-full px-3 py-2 border rounded"
                    value={form.location} onChange={handleChange} />
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Type
                  </label>
                  <select name="projectType"
                    className="w-full px-3 py-2 border rounded"
                    value={form.projectType} onChange={handleChange}>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Infrastructure</option>
                    <option>Renovation</option>
                    <option>Interior</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select name="status"
                    className="w-full px-3 py-2 border rounded"
                    value={form.status} onChange={handleChange}>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Upcoming</option>
                  </select>
                </div>

                {/* Dates */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input type="date" name="startDate"
                    className="w-full px-3 py-2 border rounded"
                    value={form.startDate} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Completion Date
                  </label>
                  <input type="date" name="completionDate"
                    className="w-full px-3 py-2 border rounded"
                    value={form.completionDate} onChange={handleChange} />
                </div>

                {/* Cover Image */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Cover Image
                  </label>
                  {coverImagePreview && (
                    <img src={coverImagePreview} alt="Cover preview"
                      className="w-full h-32 object-cover rounded-lg mb-2" />
                  )}
                  <input type="file" accept="image/*"
                    className="w-full text-sm"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setCoverImageFile(file);
                        setCoverImagePreview(URL.createObjectURL(file));
                      }
                    }} />
                </div>

                {/* Additional Images */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Project Images (2-3)
                  </label>
                  {additionalPreviews.length > 0 && (
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {additionalPreviews.map((url, idx) => (
                        <img key={idx} src={url} alt={`Preview ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border" />
                      ))}
                    </div>
                  )}
                  <input type="file" accept="image/*" multiple
                    className="w-full text-sm"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setAdditionalImageFiles(files);
                      setAdditionalPreviews(
                        files.map(f => URL.createObjectURL(f))
                      );
                    }} />
                  {additionalImageFiles.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {additionalImageFiles.length} file(s) selected
                    </p>
                  )}
                </div>

                {/* Testimonial */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Testimonial
                  </label>
                  <textarea name="testimonial" rows={2}
                    className="w-full px-3 py-2 border rounded"
                    value={form.testimonial} onChange={handleChange} />
                </div>
              </div>

              
              {submitting && (
                <div className="bg-blue-50 text-blue-700 p-3 rounded 
                  text-sm text-center">
                  ⏳ Uploading images to cloud, please wait...
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button type="button" onClick={resetForm}
                  disabled={submitting}
                  className="px-4 py-2 border rounded hover:bg-gray-100 
                    disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded 
                    hover:bg-blue-700 disabled:opacity-50 
                    flex items-center gap-2">
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12"
                          r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      {editingId ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingId ? 'Update' : 'Create'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Table */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No projects found. Add your first project!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Title</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Location</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}
                  className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{project.title}</td>
                  <td className="p-3">{project.projectType}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs 
                      font-semibold ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : project.status === 'Ongoing'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-3">{project.location}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(project)}
                      className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:underline">
                      Delete
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