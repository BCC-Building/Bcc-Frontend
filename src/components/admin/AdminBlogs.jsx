// src/components/admin/AdminBlogs.jsx
import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/endpoints';
import { getImageUrl } from '../../api/clients';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Text fields
  const [form, setForm] = useState({
    title: '', slug: '', content: '', excerpt: '',
    author: '', category: 'Construction',
    tags: '', readTimeMinutes: '', isPublished: true,
    publishedDate: '',
  });

  // File state
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');

  // ==================== FETCH ====================
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getBlogs();
      if (response.data?.success) setBlogs(response.data.data || []);
    } catch (err) { setError('Failed to load blogs'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  // ==================== HANDLERS ====================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');

    // Build FormData
    const formData = new FormData();
    const payload = {
      title: form.title,
      slug: form.slug,
      content: form.content,
      excerpt: form.excerpt,
      author: form.author,
      category: form.category,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
      readTimeMinutes: form.readTimeMinutes ? parseInt(form.readTimeMinutes) : null,
      isPublished: form.isPublished,
      publishedDate: form.publishedDate || null,
    };
    formData.append('blog', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    if (coverImageFile) {
      formData.append('coverImage', coverImageFile);
    }

    try {
      if (editingId) {
        await adminAPI.updateBlog(editingId, formData);
        setSuccess('Blog updated!');
      } else {
        await adminAPI.createBlog(formData);
        setSuccess('Blog created!');
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (blog) => {
  setForm({
    title: blog.title || '', 
    slug: blog.slug || '', 
    content: blog.content || '',
    excerpt: blog.excerpt || '',
    author: blog.author || '', 
    category: blog.category || 'Construction',
    tags: blog.tags?.join(', ') || '', 
    readTimeMinutes: blog.readTimeMinutes || '',
    isPublished: blog.isPublished ?? true, 
    publishedDate: blog.publishedDate || '',
  });
  
  if (blog.coverImageUrl) {
    setCoverImagePreview(getImageUrl(blog.coverImageUrl));
  } else {
    setCoverImagePreview('');
  }
  
  setCoverImageFile(null);
  setEditingId(blog.id);
  setShowForm(true);
};

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    try { await adminAPI.deleteBlog(id); setSuccess('Blog deleted'); fetchBlogs(); }
    catch (err) { setError('Delete failed'); }
  };

  const resetForm = () => {
    setForm({
      title: '', slug: '', content: '', excerpt: '',
      author: '', category: 'Construction',
      tags: '', readTimeMinutes: '', isPublished: true, publishedDate: '',
    });
    setCoverImageFile(null);
    setCoverImagePreview('');
    setEditingId(null);
    setShowForm(false);
  };

  // ==================== RENDER ====================
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ Add Blog</button>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-3 rounded mb-4">{success}</div>}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Blog' : 'Add Blog'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input type="text" name="title" required className="w-full px-3 py-2 border rounded" value={form.title} onChange={handleChange} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Slug * (URL friendly)</label>
                  <input type="text" name="slug" required className="w-full px-3 py-2 border rounded" value={form.slug} onChange={handleChange} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Content * (HTML allowed)</label>
                  <textarea name="content" required rows={6} className="w-full px-3 py-2 border rounded" value={form.content} onChange={handleChange} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Excerpt</label>
                  <textarea name="excerpt" rows={2} className="w-full px-3 py-2 border rounded" value={form.excerpt} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Author</label>
                  <input type="text" name="author" className="w-full px-3 py-2 border rounded" value={form.author} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select name="category" className="w-full px-3 py-2 border rounded" value={form.category} onChange={handleChange}>
                    <option>Construction</option><option>Architecture</option><option>Engineering</option><option>Design</option><option>Technology</option><option>Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Read Time (minutes)</label>
                  <input type="number" name="readTimeMinutes" className="w-full px-3 py-2 border rounded" value={form.readTimeMinutes} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Published Date</label>
                  <input type="date" name="publishedDate" className="w-full px-3 py-2 border rounded" value={form.publishedDate} onChange={handleChange} />
                </div>

                {/* Cover Image (file) */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Cover Image</label>
                  {coverImagePreview && (
                    <img src={coverImagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setCoverImageFile(file);
                        setCoverImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="w-full text-sm"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                  <input type="text" name="tags" className="w-full px-3 py-2 border rounded" value={form.tags} onChange={handleChange} placeholder="construction, tips, guide" />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} />
                    <span className="text-sm font-medium">Published</span>
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

      {/* Table (unchanged) */}
      {loading ? <div className="text-center py-10 text-gray-500">Loading...</div> : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-gray-100">
              <th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Author</th><th className="p-3">Published</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{blog.title}</td>
                  <td className="p-3">{blog.category}</td>
                  <td className="p-3">{blog.author}</td>
                  <td className="p-3">{blog.isPublished ? '✅' : '❌'}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(blog)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:underline">Delete</button>
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