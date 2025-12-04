import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { mockProducts } from '../data/mockProducts'

function Dashboard() {
  const navigate = useNavigate()

  function handleBuy(productId) {
    // Fake buy button - just show demo message
    alert(`This is a demo. Product #${productId} cannot be purchased.`)
  }

  function handleReturn(productId) {
    // Navigate to chatbot for returns
    navigate('/chat')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-gray-600">Browse our selection of products</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                <p className="text-2xl font-bold text-indigo-600 mb-4">
                  {product.price}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBuy(product.id)}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleReturn(product.id)}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Return
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/chat')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Start Return Process
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

