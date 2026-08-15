'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    setLoading(false)
    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Something went wrong.')
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-4">Check your email</h1>
          <p className="text-neutral-400 text-sm max-w-xs">
            We sent a verification link to <span className="text-white">{email}</span>. Click it to activate your account.
          </p>
          <Link href="/login" className="block mt-6 text-neutral-400 text-sm hover:text-white transition">
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-white text-center mb-8">Create account</h1>
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-600"
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-600"
          />
          <input
            type="password"
            required
            minLength={8}
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-neutral-950 rounded py-2.5 text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-50"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="text-neutral-500 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-neutral-300 hover:text-white transition">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
