import Link from 'next/link'
import dynamic from 'next/dynamic'

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false })

const plans = [
  { name: 'Free', price: '0', period: 'forever', features: ['Browse public content', 'Limited video playback', 'Basic access'], accent: false },
  { name: 'Pro', price: '299', period: 'month', features: ['Unlimited video streaming', 'Full playlist management', 'Priority support', 'Download offline'], accent: true },
  { name: 'Annual', price: '2,499', period: 'year', features: ['Everything in Pro', '2 months free', 'Early access to features', 'Exclusive content'], accent: false },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden"
      style={{ background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #1e1040 0%, #0d0820 40%, #04040f 100%)' }}>

      {/* Animated starfield */}
      <ParticleBackground />

      {/* Subtle nebula glow — pure CSS, zero extra weight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 20% 60%, rgba(99,102,241,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 35% at 80% 30%, rgba(139,92,246,0.09) 0%, transparent 70%)',
        }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          {/* Star icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-violet-400" aria-hidden>
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="currentColor" fillOpacity="0.9" />
          </svg>
          <span className="font-semibold tracking-widest text-sm text-violet-200 uppercase">rootprompt</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#features" className="text-slate-400 text-sm hover:text-violet-300 transition hidden md:block">Features</Link>
          <Link href="#pricing" className="text-slate-400 text-sm hover:text-violet-300 transition hidden md:block">Pricing</Link>
          <Link href="/login"
            className="text-sm text-violet-200 border border-violet-700/60 rounded-md px-4 py-1.5 hover:border-violet-400 hover:text-white hover:shadow-[0_0_12px_rgba(139,92,246,0.35)] transition">
            Sign in
          </Link>
          <Link href="/register"
            className="text-sm bg-violet-600 hover:bg-violet-500 text-white rounded-md px-4 py-1.5 transition shadow-[0_0_16px_rgba(139,92,246,0.3)]">
            Join free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-[82vh] px-6 pt-8">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 text-xs text-violet-400 border border-violet-800/60 rounded-full px-4 py-1.5 mb-8 tracking-wider uppercase bg-violet-950/40">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Now streaming across the universe
        </span>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08] glow-text">
          Stream.{' '}
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)' }}>
            Explore.
          </span>
          {' '}Create.
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          A curated video platform built for the modern viewer. Discover content, manage playlists, and connect with what matters — anywhere in the universe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/register"
            className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-md font-medium transition shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:shadow-[0_0_32px_rgba(139,92,246,0.6)]">
            Get started free
          </Link>
          <Link href="/login"
            className="border border-slate-700 hover:border-violet-600 text-slate-300 hover:text-white px-8 py-3 rounded-md font-medium transition">
            Sign in
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest text-slate-500 uppercase">Explore</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-500 animate-bounce" aria-hidden>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-28 px-6 md:px-12">
        <p className="text-center text-xs text-violet-500 tracking-widest uppercase mb-3">What you get</p>
        <h2 className="text-3xl font-bold text-center mb-16 text-white">Everything you need</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: '▶', title: 'Video Streaming', desc: 'Adaptive HLS streaming with a clean, distraction-free player built for any screen.' },
            { icon: '◉', title: 'Smart Playlists', desc: 'Organize and queue videos exactly the way you like — save, reorder, replay.' },
            { icon: '⬡', title: 'Live Monitoring', desc: 'Administrators get real-time visibility into platform usage and active sessions.' },
          ].map((f) => (
            <div key={f.title}
              className="group rounded-xl p-6 border border-slate-800/80 hover:border-violet-700/60 transition-all duration-300 glow-border"
              style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(6px)' }}>
              <span className="text-2xl text-violet-400 mb-4 block">{f.icon}</span>
              <h3 className="text-white font-semibold mb-2 group-hover:text-violet-200 transition">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-28 px-6 md:px-12">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)' }} aria-hidden />
        <p className="text-center text-xs text-violet-500 tracking-widest uppercase mb-3">Pricing</p>
        <h2 className="text-3xl font-bold text-center mb-4 text-white">Simple, honest pricing</h2>
        <p className="text-center text-slate-500 text-sm mb-16">No hidden fees. Cancel anytime.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((p) => (
            <div key={p.name}
              className={`rounded-xl p-6 flex flex-col border transition-all duration-300 ${
                p.accent
                  ? 'border-violet-600/70 shadow-[0_0_32px_rgba(139,92,246,0.18)] bg-[rgba(109,40,217,0.08)]'
                  : 'border-slate-800/80 hover:border-violet-800/60'
              }`}
              style={!p.accent ? { background: 'rgba(255,255,255,0.02)' } : {}}>
              {p.accent && (
                <span className="text-[10px] text-violet-300 border border-violet-700/60 rounded-full px-2.5 py-0.5 self-start mb-3 tracking-widest uppercase bg-violet-950/50">
                  Most popular
                </span>
              )}
              <h3 className="text-white font-semibold text-lg mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-white">฿{p.price}</span>
              </div>
              <p className="text-slate-500 text-xs mb-6">/ {p.period}</p>
              <ul className="space-y-2.5 flex-1 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="text-slate-400 text-sm flex items-center gap-2.5">
                    <span className="text-violet-500 flex-shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/register"
                className={`block text-center rounded-md py-2.5 text-sm font-medium transition ${
                  p.accent
                    ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]'
                    : 'border border-slate-700 hover:border-violet-700 text-slate-300 hover:text-white'
                }`}>
                Choose {p.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900/80 py-10 px-6 md:px-12 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-slate-700 text-xs">© {new Date().getFullYear()} rootpromptxai.life</span>
          <div className="flex gap-6 text-slate-700 text-xs">
            <Link href="/login" className="hover:text-violet-500 transition">Sign in</Link>
            <Link href="/register" className="hover:text-violet-500 transition">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
