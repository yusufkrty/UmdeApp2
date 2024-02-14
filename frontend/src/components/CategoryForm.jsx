import React, { useState } from "react";
import axios from "axios";

function CategoryForm() {
  const [categoryName, setCategoryName] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newCategory = {
      name: categoryName,
    };

    axios
      .post("http://localhost:5000/categories", newCategory)
      .then((response) => alert("Kategori eklendi."))
      .catch((error) => console.error("Error adding category:", error));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}

export default CategoryForm;