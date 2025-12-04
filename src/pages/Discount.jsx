import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Discount() {
  const navigate = useNavigate();

  // Mocked product data from products.csv line 14
  const product = {
    product_id: "PROD00013",
    name: "Red V-Neck T-Shirt",
    category: "T-Shirts",
    description: "High-quality red v-neck t-shirt in size XXL. Perfect for everyday wear.",
    size: "XXL",
    color: "Red",
    stock: 89,
    originalPrice: 187.96,
    discountPercentage: 25, // Mocked 25% discount
    image_url: "https://images.unsplash.com/photo-1500000000664?w=800&h=800&fit=crop",
  };

  const discountedPrice = product.originalPrice * (1 - product.discountPercentage / 100);
  const savings = product.originalPrice - discountedPrice;

  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }

  function handleBackToDashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Discount Banner */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 px-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Special Discount!</h2>
                <p className="text-red-100 mt-1">
                  Limited time offer - {product.discountPercentage}% OFF
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{product.discountPercentage}%</div>
                <div className="text-sm text-red-100">OFF</div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full md:w-80 h-80 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=Product+Image";
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="mb-4">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                </div>

                {/* Product Attributes */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Size:</span> {product.size}
                  </div>
                  <div>
                    <span className="font-semibold">Color:</span> {product.color}
                  </div>
                  <div>
                    <span className="font-semibold">Stock:</span>{" "}
                    <span className="text-green-600">{product.stock} available</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-4xl font-bold text-indigo-600">
                      {formatPrice(discountedPrice)}
                    </span>
                    <span className="text-2xl text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>You save {formatPrice(savings)}!</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md">
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBackToDashboard}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Back to Products
                  </button>
                </div>

                {/* Discount Timer (Mocked) */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Offer expires in:</p>
                  <div className="flex gap-4 text-lg font-semibold text-gray-700">
                    <div>
                      <span className="text-2xl text-indigo-600">23</span>
                      <span className="text-sm text-gray-500 ml-1">hours</span>
                    </div>
                    <div>
                      <span className="text-2xl text-indigo-600">45</span>
                      <span className="text-sm text-gray-500 ml-1">minutes</span>
                    </div>
                    <div>
                      <span className="text-2xl text-indigo-600">12</span>
                      <span className="text-sm text-gray-500 ml-1">seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-semibold mb-1">
                Special Promotion
              </p>
              <p className="text-sm text-blue-700">
                This is a limited-time discount offer. The discount applies only to
                this product and cannot be combined with other promotions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discount;

