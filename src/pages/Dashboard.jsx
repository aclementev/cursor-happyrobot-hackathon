import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loadProducts } from "../utils/dataLoader";
import { formatPrice } from "../data/mockProducts";

function Dashboard() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [products] = useState(() => loadProducts());
  const productsPerPage = 12;

  function handleProductClick(productId) {
    // Navigate to products page to see order history
    navigate("/products");
  }

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  function handlePreviousPage() {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNextPage() {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-gray-600">
            Browse our selection of {products.length} apparel products
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of{" "}
            {products.length} products
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentProducts.map((product) => (
            <div
              key={product.product_id}
              onClick={() => handleProductClick(product.product_id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x300?text=Product+Image";
                }}
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                  <span>Size: {product.size}</span>
                  <span>•</span>
                  <span>Color: {product.color}</span>
                  <span>•</span>
                  <span
                    className={
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </span>
                </div>
                <p className="text-2xl font-bold text-indigo-600">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
