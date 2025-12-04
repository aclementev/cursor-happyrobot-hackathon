import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    // Fake logout - just redirect to login
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-indigo-600"
            >
              Products
            </Link>
            <Link
              to="/chat"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-indigo-600"
            >
              Chat
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-indigo-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

