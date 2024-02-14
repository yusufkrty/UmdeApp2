import React, { useState, useEffect } from "react";
import axios from "axios";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${categoryId}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Category List</h2>
      <div className="">
        {categories.map((category, index) => (
          <div className="flex justify-between">
            <div
              key={category._id}
              className="py-2 flex justify-between items-center"
            >
              <div>
                {index + 1} - {category.name}
              </div>
            </div>
            <div
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700 cursor-pointer"
              onClick={() => handleDeleteCategory(category._id)}
            >
              Delete
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;