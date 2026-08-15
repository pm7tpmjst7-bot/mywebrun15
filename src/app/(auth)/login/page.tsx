'use client'
import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(
    params.get('error') === 'CredentialsSignin' ? 'Invalid email or password.' :
    params.get('error') === 'InvalidToken' ? 'Invalid verification link.' :
    params.get('error') === 'TokenExpired' ? 'Verification link has expired.' :
    null
  )
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) {
      setError('Invalid email or password.')
    } else {
      router.push('/home')
    }
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-white text-center mb-8">Sign in</h1>
      {params.get('verified') && (
        <p className="text-green-500 text-sm text-center mb-4">Email verified — you can now sign in.</p>
      )}
      {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-neutral-950 rounded py-2.5 text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="text-neutral-500 text-sm text-center mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-neutral-300 hover:text-white transition">Register</Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <Suspense fallback={<div className="text-neutral-500 text-sm">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
