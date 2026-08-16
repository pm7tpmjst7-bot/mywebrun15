'use client'
import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const MarsParticleBackground = dynamic(() => import('@/components/MarsParticleBackground'), { ssr: false })

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
      <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 130% 90% at 50% 110%, #3d1206 0%, #1e0a04 35%, #0f0604 65%, #070303 100%)' }}>
        <MarsParticleBackground />
        <div className="relative z-10 text-center mars-glass rounded-2xl px-8 py-10 max-w-sm w-full">
          <span className="text-4xl block mb-4">🚀</span>
          <h1 className="text-xl font-bold text-orange-100 mb-3">Transmission sent</h1>
          <p className="text-orange-300/60 text-sm leading-relaxed max-w-xs mx-auto">
            A verification link is on its way to{' '}
            <span className="text-orange-200">{email}</span>.
            Check your inbox to activate your account.
          </p>
          <Link href="/login"
            className="block mt-7 text-xs text-orange-400 hover:text-orange-200 transition tracking-wider">
            ← Back to outpost login
          </Link>
        </div>
      </div>
    )
  }

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
      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-2xl">🔴</span>
          <span className="text-orange-200/80 font-semibold tracking-widest text-sm uppercase">rootprompt</span>
        </div>

        <div className="mars-glass rounded-2xl px-7 py-8">
          <h1 className="text-xl font-bold text-orange-100 text-center mb-1">Request colony access</h1>
          <p className="text-center text-xs text-orange-400/60 mb-6 tracking-wide">New Settler Registration — Mars Base Alpha</p>

          {error && (
            <p className="text-red-400/90 text-xs text-center mb-4 bg-red-900/20 border border-red-800/40 rounded-lg py-2">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <input
              type="text"
              required
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mars-input w-full rounded-lg px-4 py-2.5 text-sm"
            />
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
              minLength={8}
              placeholder="Password (min 8 characters)"
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
              {loading ? 'Sending transmission…' : 'Create account'}
            </button>
          </form>

          <p className="text-orange-900/60 text-xs text-center mt-5">
            Already registered?{' '}
            <Link href="/login" className="text-orange-400 hover:text-orange-200 transition">Sign in</Link>
          </p>
        </div>

        <p className="text-center mt-5 text-[10px] text-orange-900/30 tracking-wider">
          Sol {new Date().getDate()} · Surface temp −63°C · Dust nominal
        </p>
      </div>
    </div>
  )
}
