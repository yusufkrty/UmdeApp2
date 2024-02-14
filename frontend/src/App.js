import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";

function App() {
  return (
    <Router>
      <div className="bg-slate-200 h-screen">
        <nav className="flex justify-around gap-12 text-xl font-bold mx-52 pt-12 pb-12">
          <div>
            <Link to="/products">Products</Link>
          </div>
          <div>
            <Link to="/categories">Categories</Link>
          </div>
          <div>
            <Link to="/products/add">Add Product</Link>
          </div>
          <div>
            <Link to="/categories/add">Add Category</Link>
          </div>
        </nav>

        <hr />
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<ProductForm />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/add" element={<CategoryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;