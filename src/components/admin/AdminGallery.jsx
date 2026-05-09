// src/components/admin/AdminGallery.jsx
import { useState, useEffect, useRef } from 'react';
import { adminAPI } from '../../api/endpoints';
import { getMediaUrl } from '../../utils/media';

const initialForm = {
  title: '',
  category: 'Construction',
  description: '',
  location: '',
  date: '',
  tags: '',
  displayOrder: '',
  isActive: true,
};

const categories = [
  'Construction',
  'Interior',
  'Survey',
  'Testing',
  'Projects',
  'Events',
  'Office',
  'Site',
  'Team',
  'Awards',
];

const splitList = (value) =>
  value
    ? value.split(',').map((item) => item.trim()).filter(Boolean)
    : [];

const parseOptionalNumber = (value, fallback = 0) => {
  if (value === '' || value === null || value === undefined) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const createGalleryFormData = (payload, imageFile) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formData.append(key, value.join(','));
      value.forEach((item) => formData.append(`${key}[]`, item));
      return;
    }

    if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  const jsonBlob = new Blob([JSON.stringify(payload)], {
    type: 'application/json',
  });
  formData.append('gallery', jsonBlob);
  formData.append('galleryItem', jsonBlob);
  formData.append('item', jsonBlob);

  if (imageFile) {
    formData.append('image', imageFile);
  }

  return formData;
};

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await adminAPI.getGallery();
      if (response.data?.success) {
        setItems(response.data.data || []);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setError('');
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!editingId && !imageFile) {
      setError('Please select an image before creating a gallery item');
      return;
    }

    setUploading(true);

    const payload = {
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      location: form.location.trim(),
      date: form.date || null,
      tags: splitList(form.tags),
      displayOrder: parseOptionalNumber(form.displayOrder),
      isActive: form.isActive,
    };

    const formData = createGalleryFormData(payload, imageFile);

    try {
      if (editingId) {
        await adminAPI.updateGalleryItem(editingId, formData);
        setSuccess('Gallery item updated!');
      } else {
        await adminAPI.createGalleryItem(formData);
        setSuccess('Gallery item created!');
      }
      resetForm();
      fetchItems();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || '',
      category: item.category || 'Construction',
      description: item.description || '',
      location: item.location || '',
      date: item.date || '',
      tags: item.tags?.join(', ') || '',
      displayOrder: item.displayOrder || '',
      isActive: item.isActive ?? true,
    });
    setImagePreview(getMediaUrl(item.imageUrl || item.thumbnail));
    setImageFile(null);
    setEditingId(item.id);
    setShowForm(true);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    setError('');
    setSuccess('');
    try {
      await adminAPI.deleteGalleryItem(id);
      setSuccess('Item deleted');
      fetchItems();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setImageFile(null);
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gallery</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ Add Image</button>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-3 rounded mb-4">{success}</div>}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Item' : 'Add Image'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {imagePreview && (
                <div className="flex justify-center">
                  <img src={imagePreview} alt="Preview" className="w-full max-h-56 object-cover rounded-lg border" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Image {!editingId && '*'}</label>
                <input ref={fileRef} type="file" accept="image/*" required={!editingId} onChange={handleFileChange} className="w-full text-sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input type="text" name="title" required className="w-full px-3 py-2 border rounded" value={form.title} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select name="category" className="w-full px-3 py-2 border rounded" value={form.category} onChange={handleChange}>
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input type="text" name="location" className="w-full px-3 py-2 border rounded" value={form.location} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input type="date" name="date" className="w-full px-3 py-2 border rounded" value={form.date} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <input type="number" name="displayOrder" className="w-full px-3 py-2 border rounded" value={form.displayOrder} onChange={handleChange} />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                  <input type="text" name="tags" className="w-full px-3 py-2 border rounded" value={form.tags} onChange={handleChange} placeholder="residential, interiors, site work" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea name="description" rows={3} className="w-full px-3 py-2 border rounded" value={form.description} onChange={handleChange} />
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
                <button type="submit" disabled={uploading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                  {uploading ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? <div className="text-center py-10 text-gray-500">Loading...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition group">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                {item.imageUrl || item.thumbnail ? (
                  <img src={getMediaUrl(item.imageUrl || item.thumbnail)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.category}</p>
                {item.location && <p className="text-xs text-gray-500 truncate">{item.location}</p>}
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleEdit(item)} className="text-xs text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">No gallery items yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
