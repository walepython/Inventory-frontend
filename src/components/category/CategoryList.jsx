import React, { useEffect, useState } from 'react';
import { Link,  useNavigate} from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { categoryService } from '../../services/categoryService';
import toast from 'react-hot-toast';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

const navigate = useNavigate();

const handleDelete = async (id) => {
  if (!window.confirm('Delete this category?')) return;

  try {
    await categoryService.deleteCategory(id);
    toast.success('Category deleted');
    fetchCategories();
  } catch (error) {
    toast.error('Delete failed');
  }
};

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="header-actions">
        <h1 className="font-medium text-3xl">Categories</h1>
        <Link to="/categories/create" className="btn-primary flex items-center w-max gap-1 mb-4 ml-auto mt-4">
          <FiPlus/>Create Category
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              
              <td className="flex gap-2">

                <button
                  onClick={() => navigate(`/categories/edit/${category.id}`)}
                  className="btn-secondary"
                >
                  <FiEdit2 />
                </button>

                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded"
                >
                  <FiTrash2 />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;