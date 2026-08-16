'use client'
import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const MarsParticleBackground = dynamic(() => import('@/components/MarsParticleBackground'), { ssr: false })

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
      {/* Logo / wordmark */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-2xl">🔴</span>
        <span className="text-orange-200/80 font-semibold tracking-widest text-sm uppercase">rootprompt</span>
      </div>

      <div className="mars-glass rounded-2xl px-7 py-8">
        <h1 className="text-xl font-bold text-orange-100 text-center mb-1">Welcome back, explorer</h1>
        <p className="text-center text-xs text-orange-400/60 mb-6 tracking-wide">Outpost Login — Mars Base Alpha</p>

        {params.get('verified') && (
          <p className="text-green-400/80 text-xs text-center mb-4 bg-green-900/20 border border-green-800/40 rounded-lg py-2">
            ✓ Email verified — you can now sign in.
          </p>
        )}
        {error && (
          <p className="text-red-400/90 text-xs text-center mb-4 bg-red-900/20 border border-red-800/40 rounded-lg py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mars-input w-full rounded-lg px-4 py-2.5 text-sm"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mars-input w-full rounded-lg px-4 py-2.5 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-50"
            style={{
              background: loading ? 'rgba(150,60,20,0.6)' : 'linear-gradient(135deg, #c2521e 0%, #e07030 100%)',
              color: '#fff1e6',
              boxShadow: loading ? 'none' : '0 0 20px rgba(194,82,30,0.45)',
            }}
          >
            {loading ? 'Authenticating…' : 'Sign in'}
          </button>
        </form>

        <p className="text-orange-900/60 text-xs text-center mt-5">
          No account?{' '}
          <Link href="/register" className="text-orange-400 hover:text-orange-200 transition">Request access</Link>
        </p>
      </div>

      <p className="text-center mt-5 text-[10px] text-orange-900/30 tracking-wider">
        Sol {new Date().getDate()} · Surface temp −63°C · Dust nominal
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 130% 90% at 50% 110%, #3d1206 0%, #1e0a04 35%, #0f0604 65%, #070303 100%)',
      }}>

      {/* Mars dust particles */}
      <MarsParticleBackground />

      {/* Horizon glow */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-56"
        style={{ background: 'linear-gradient(to top, rgba(150,50,10,0.18) 0%, transparent 100%)' }} />

      {/* Rocky surface silhouette */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 overflow-hidden" style={{ height: 120 }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full" aria-hidden>
          <path
            d="M0,90 C80,70 140,110 240,80 C320,55 380,100 480,85 C560,72 620,105 720,78 C820,52 880,98 980,82 C1060,68 1140,108 1240,72 C1320,44 1390,90 1440,75 L1440,120 L0,120 Z"
            fill="rgba(60,18,6,0.85)"
          />
          <path
            d="M0,110 C100,90 180,115 300,100 C400,88 460,112 560,105 C660,98 740,115 840,102 C940,90 1020,114 1140,100 C1240,88 1360,110 1440,98 L1440,120 L0,120 Z"
            fill="rgba(30,8,2,0.95)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Suspense fallback={<div className="text-orange-800/50 text-xs text-center">Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
