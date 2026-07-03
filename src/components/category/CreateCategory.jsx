import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';
import toast from 'react-hot-toast';

const CreateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (isEditing) {
      loadCategory();
    }
  }, []);

  const loadCategory = async () => {
    try {
      const data = await categoryService.getCategoryById(id);
      setFormData(data);
    } catch (error) {
      toast.error('Failed to load category');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await categoryService.updateCategory(id, formData);
        toast.success('Category updated successfully');
      } else {
        await categoryService.createCategory(formData);
        toast.success('Category created successfully');
      }

      navigate('/categories');
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  return (
    <div className="container">
      
      <h1>{isEditing ? 'Edit Category' : 'Create Category'}</h1>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>Name *</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate('/categories')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Back
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEditing ? 'Update Category' : 'Create Category'}
          </button>
       </div>
        
      </form>
    </div>
  );
};

export default CreateCategory;