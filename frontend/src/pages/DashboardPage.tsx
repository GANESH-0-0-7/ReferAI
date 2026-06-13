import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/store'
import { logoutSuccess } from '@/store/authSlice'
import { authService } from '@/services/authService'

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
    dispatch(logoutSuccess())
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">ReferAI Dashboard</h1>
            <p className="text-slate-400 mt-1">Welcome, {user?.firstName}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Stats Cards */}
          {[
            { label: 'Career Rating', value: 0, unit: '/100' },
            { label: 'Global Rank', value: '-', unit: '' },
            { label: 'Current Streak', value: 0, unit: 'days' },
            { label: 'XP Points', value: 0, unit: '' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-2">
                {stat.value}
                <span className="text-lg text-slate-400 ml-2">{stat.unit}</span>
              </p>
            </div>
          ))}
        </div>

        {/* User Info Card */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">Email</p>
              <p className="text-white text-lg">{user?.email}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">Name</p>
              <p className="text-white text-lg">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">Role(s)</p>
              <div className="flex gap-2 mt-2">
                {user?.roles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-sm"
                  >
                    {role.replace('ROLE_', '')}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">Account Status</p>
              <p className="text-green-400 text-lg">Active</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Complete Profile', description: 'Add more details to your profile' },
              { title: 'Mock Interview', description: 'Practice with AI interview simulator' },
              { title: 'Browse Jobs', description: 'Explore job opportunities' },
            ].map((action, i) => (
              <button
                key={i}
                className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors text-left group"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
