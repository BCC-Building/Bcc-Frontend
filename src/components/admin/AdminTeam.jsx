// src/components/admin/AdminTeam.jsx
import { useState, useEffect, useRef } from 'react';
import { adminAPI } from '../../api/endpoints';
import { getMediaUrl } from '../../utils/media';

const initialForm = {
  name: '', designation: '', department: '', bio: '',
  email: '', phone: '', linkedinUrl: '',
  qualifications: '', yearsOfExperience: '',
  displayOrder: '', isActive: true, joinedDate: '',
};

const getData = (response) => response?.data?.data ?? response?.data ?? null;

const getMemberId = (response) => {
  const data = getData(response);
  return data?.id ?? data?.memberId ?? data?.teamMemberId ?? null;
};

const parseOptionalNumber = (value, fallback = null) => {
  if (value === '' || value === null || value === undefined) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const splitList = (value) =>
  value
    ? value.split(',').map((item) => item.trim()).filter(Boolean)
    : [];

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
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

  // ==================== FETCH ====================
  const fetchMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await adminAPI.getTeam();
      if (response.data?.success) setMembers(response.data.data || []);
      else setMembers([]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  // ==================== HANDLERS ====================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ✅ CORRECTED handleSubmit – matches backend @RequestPart("member") and @RequestPart("image")
 const handleSubmit = async (e) => {
  e.preventDefault();
  setError(''); setSuccess('');
  setUploading(true);

  // ── Build JSON payload ──
  const payload = {
    name: form.name.trim(),
    designation: form.designation.trim(),
    department: form.department.trim(),
    bio: form.bio.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    linkedinUrl: form.linkedinUrl.trim(),
    qualifications: splitList(form.qualifications),
    yearsOfExperience: parseOptionalNumber(form.yearsOfExperience),
    displayOrder: parseOptionalNumber(form.displayOrder, 0),
    isActive: form.isActive,
    joinedDate: form.joinedDate || null,
  };

  try {
    let memberId = editingId;

    if (editingId) {
      // Update text fields first
      await adminAPI.updateTeamMember(editingId, payload);
      setSuccess('Team member updated!');
    } else {
      // Create new member (JSON only)
      const response = await adminAPI.createTeamMember(payload);
      if (response.data?.success) {
        memberId = getMemberId(response);
        setSuccess('Team member created!');
      } else {
        throw new Error(response.data?.message || 'Creation failed');
      }
    }

    // If a new image was selected, upload it separately
    if (imageFile && memberId) {
      const imgFormData = new FormData();
      imgFormData.append('image', imageFile);
      await adminAPI.uploadTeamImage(memberId, imgFormData);
      setSuccess(prev => prev + ' Image uploaded.');
    }

    resetForm();
    fetchMembers();
  } catch (err) {
    setError(err.response?.data?.message || err.message || 'Operation failed');
  } finally {
    setUploading(false);
  }
};
  const handleEdit = (member) => {
    setForm({
      name: member.name || '', designation: member.designation || '',
      department: member.department || '', bio: member.bio || '',
      email: member.email || '', phone: member.phone || '',
      linkedinUrl: member.linkedinUrl || '',
      qualifications: member.qualifications?.join(', ') || '',
      yearsOfExperience: member.yearsOfExperience || '',
      displayOrder: member.displayOrder || '',
      isActive: member.isActive ?? true, joinedDate: member.joinedDate || '',
    });
    setImagePreview(getMediaUrl(member.profileImageUrl));
    setImageFile(null);
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    setError('');
    setSuccess('');
    try {
      await adminAPI.deleteTeamMember(id);
      setSuccess('Member deleted');
      fetchMembers();
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

  // ==================== RENDER ====================
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Member
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-3 rounded mb-4">{success}</div>}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Member' : 'Add Member'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Profile Image */}
                <div className="col-span-2 flex items-center gap-4">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-1">Profile Image</label>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
                  </div>
                </div>
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input type="text" name="name" required className="w-full px-3 py-2 border rounded" value={form.name} onChange={handleChange} />
                </div>
                {/* Designation */}
                <div>
                  <label className="block text-sm font-medium mb-1">Designation *</label>
                  <input type="text" name="designation" required className="w-full px-3 py-2 border rounded" value={form.designation} onChange={handleChange} />
                </div>
                {/* Department */}
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <input type="text" name="department" className="w-full px-3 py-2 border rounded" value={form.department} onChange={handleChange} />
                </div>
                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium mb-1">Years of Experience</label>
                  <input type="number" name="yearsOfExperience" className="w-full px-3 py-2 border rounded" value={form.yearsOfExperience} onChange={handleChange} />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" name="email" className="w-full px-3 py-2 border rounded" value={form.email} onChange={handleChange} />
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input type="tel" name="phone" className="w-full px-3 py-2 border rounded" value={form.phone} onChange={handleChange} />
                </div>
                {/* LinkedIn */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                  <input type="url" name="linkedinUrl" className="w-full px-3 py-2 border rounded" value={form.linkedinUrl} onChange={handleChange} />
                </div>
                {/* Qualifications */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Qualifications (comma separated)</label>
                  <input type="text" name="qualifications" className="w-full px-3 py-2 border rounded" value={form.qualifications} onChange={handleChange} placeholder="B.Arch, M.Tech, PMP" />
                </div>
                {/* Bio */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea name="bio" rows={3} className="w-full px-3 py-2 border rounded" value={form.bio} onChange={handleChange} />
                </div>
                {/* Display Order */}
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <input type="number" name="displayOrder" className="w-full px-3 py-2 border rounded" value={form.displayOrder} onChange={handleChange} />
                </div>
                {/* Joined Date */}
                <div>
                  <label className="block text-sm font-medium mb-1">Joined Date</label>
                  <input type="date" name="joinedDate" className="w-full px-3 py-2 border rounded" value={form.joinedDate} onChange={handleChange} />
                </div>
                {/* Active */}
                <div>
                  <label className="flex items-center gap-2 pt-6">
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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-gray-100">
              <th className="p-3">Photo</th><th className="p-3">Name</th><th className="p-3">Designation</th><th className="p-3">Department</th><th className="p-3">Active</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {member.profileImageUrl ? (
                      <img src={getMediaUrl(member.profileImageUrl)} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">{member.name?.[0]}</div>
                    )}
                  </td>
                  <td className="p-3 font-medium">{member.name}</td>
                  <td className="p-3">{member.designation}</td>
                  <td className="p-3">{member.department}</td>
                  <td className="p-3">{member.isActive ? '✅' : '❌'}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(member)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:underline">Delete</button>
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
