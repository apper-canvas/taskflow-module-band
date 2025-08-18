import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { AuthContext } from '../../App'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

function Layout() {
  const { logout } = useContext(AuthContext)
  const { user } = useSelector((state) => state.user)

  return (
<div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent-600 rounded-xl flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold font-display text-gray-800">
                TaskFlow
              </h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {user && (
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.emailAddress}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
              >
                <ApperIcon name="LogOut" size={16} />
                <span className="hidden sm:block">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}

export default Layout