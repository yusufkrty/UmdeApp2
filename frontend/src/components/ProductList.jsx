import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

   const handleDeleteProduct = async (productId) => {
     try {
       await axios.delete(`http://localhost:5000/products/${productId}`);
       setProducts((prevProducts) =>
         prevProducts.filter((product) => product._id !== productId)
       );
     } catch (error) {
       console.error("Error deleting product:", error);
     }
   };

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);


  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product._id}
            className="border-b py-2 flex justify-between items-center"
          >
            <span>
              {product.name} - ${product.price}
            </span>
            <span className="text-gray-600">
              {product.category ? product.category.name : ""}
            </span>
            <div
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700 cursor-pointer"
              onClick={() => handleDeleteProduct(product._id)}
            >
              Delete
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;