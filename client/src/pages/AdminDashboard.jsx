import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    stock: ''
  });
  
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(`${API_BASE_URL}/api/products/${id}`, config);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock
    });
    setEditId(product._id);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      if (isEditing) {
        await axios.put(`${API_BASE_URL}/api/products/${editId}`, formData, config);
        alert('Product updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/products`, formData, config);
        alert('Product created successfully');
      }

      setShowForm(false);
      setIsEditing(false);
      setEditId(null);
      setFormData({ name: '', price: '', image: '', description: '', category: '', stock: '' });
      fetchProducts();
    } catch (error) {
      alert(isEditing ? 'Error updating product' : 'Error creating product');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: '', price: '', image: '', description: '', category: '', stock: '' });
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black text-gray-900">Admin Dashboard</h1>
        <button 
          onClick={showForm ? handleCancel : () => setShowForm(true)}
          className={`${showForm ? 'bg-gray-500' : 'bg-blue-600'} text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition duration-300 shadow-lg`}
        >
          {showForm ? 'Cancel' : '+ Add New Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Product' : 'Create New Product'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-600 mb-1">Product Name</label>
              <input type="text" name="name" placeholder="Enter product name" value={formData.name} onChange={handleInputChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-600 mb-1">Price (USD)</label>
              <input type="number" step="0.01" name="price" placeholder="0.00" value={formData.price} onChange={handleInputChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-600 mb-1">Image URL</label>
              <input type="text" name="image" placeholder="https://example.com/image.png" value={formData.image} onChange={handleInputChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-600 mb-1">Category</label>
              <input type="text" name="category" placeholder="e.g. Electronics, Home" value={formData.category} onChange={handleInputChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-600 mb-1">Stock Quantity</label>
              <input type="number" name="stock" placeholder="0" value={formData.stock} onChange={handleInputChange} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-bold text-gray-600 mb-1">Description</label>
              <textarea name="description" placeholder="Enter product description" value={formData.description} onChange={handleInputChange} className="border p-3 rounded-xl min-h-[100px] focus:ring-2 focus:ring-blue-500 outline-none" required></textarea>
            </div>
            <button type="submit" className={`py-4 rounded-xl font-bold md:col-span-2 text-white transition-all ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`}>
              {isEditing ? 'Update Product' : 'Save Product'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Product</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Price</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Stock</th>
              <th className="px-6 py-4 text-right text-xs font-black text-gray-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-contain bg-gray-50" />
                    <span className="font-bold text-gray-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{product.category}</td>
                <td className="px-6 py-4 font-black text-blue-600">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.stock} in stock
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800 font-bold text-sm">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800 font-bold text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
