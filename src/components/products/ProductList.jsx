import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data1 = await productService.getAllProducts();
      setProducts(data1);
    } catch (error) {
      toast.error('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSubmit = async (productData) => {
    try {
      if (isEditing && selectedProduct) {
        await productService.updateProduct(selectedProduct.id, productData);
        toast.success('Product updated successfully');
      } else {
        await productService.createProduct(productData);
        toast.success('Product created successfully');
      }
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      toast.error('Error saving product');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
            onClick={() => navigate('/products/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Add Product
            </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CategoryId
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                availableQuantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                unitPrice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                totalPrice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                imageUrl
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                dateCreated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            { products?.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category?.name}</td>
                <td className="px-6 py-4">{product.availableQuantity}</td>
                <td className="px-6 py-4">${product.unitPrice}</td>
                <td className="px-6 py-4">${product.totalPrice}</td>
                <td className="px-6 py-4">{product.imageUrl}</td>
                <td className="px-6 py-4">{product.dateCreated}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleView(product)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
      <ProductForm
        product={selectedProduct}
        categories={categories}
        isEditing={isEditing}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />
    )}
    </div>
  );
};



export default ProductList;