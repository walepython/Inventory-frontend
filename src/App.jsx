import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import CategoryList from './components/category/CategoryList';

import ProductList from './components/products/ProductList';
import CreateProduct from './components/products/CreateProduct';

import IncomingOrderList from './components/incomingOrder/IncomingOrderList';

import OutgoingOrderList from './components/outgoingOrder/OutgoingOrderList';

import StaffList from './components/staff/StaffList';

import Login from './components/staff/Login';
import SupplierList from './components/supplier/SupplierList';
import './App.css';
import CreateCategory from './components/category/CreateCategory';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const staff = localStorage.getItem('staff');
  
  console.log('Token exists:', !!token);
  console.log('Staff exists:', !!staff);
  
  if (!token || !staff) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Add this right below PrivateRoute, before the App function
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const staff = localStorage.getItem('staff');
  if (token && staff) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  const isLoggedIn = localStorage.getItem('staff');
  
  return (
    <Router>
    <Toaster position="top-right" />
    <Routes>
    <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
    <Route 
        path="/login" 
        element={
          localStorage.getItem('token') 
            ? <Navigate to="/dashboard" replace /> 
            : <Login />
        } 
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Layout>
              <ProductList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/products/create"
        element={
          <PrivateRoute>
            <Layout>
              <CreateProduct />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/categories/create"
        element={
          <PrivateRoute>
            <Layout>
              <CreateCategory />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <Layout>
              <CategoryList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/categories/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <CreateCategory />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/suppliers"
        element={
          <PrivateRoute>
            <Layout>
              <SupplierList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/incoming-orders"
        element={
          <PrivateRoute>
            <Layout>
              <IncomingOrderList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/outgoing-orders"
        element={
          <PrivateRoute>
            <Layout>
              <OutgoingOrderList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/staff"
        element={
          <PrivateRoute>
            <Layout>
              <StaffList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Router>
     
  );
}

export default App;