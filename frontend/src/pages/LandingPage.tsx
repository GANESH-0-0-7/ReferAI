import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="flex items-center justify-between px-8 py-6 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="text-2xl font-bold text-blue-500">ReferAI</div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-2 rounded-lg text-slate-200 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your AI Career Growth Platform
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Master interview skills, get referrals, and accelerate your career with AI-powered guidance.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Learning Today
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-lg border border-slate-400 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          {[
            { title: 'AI Mock Interviews', description: 'Practice with AI-powered interview simulations' },
            { title: 'Smart Matching', description: 'Get matched with job opportunities and mentors' },
            { title: 'Career Growth', description: 'Track your progress with gamified learning' },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
