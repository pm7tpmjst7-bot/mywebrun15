import Link from 'next/link'
import dynamic from 'next/dynamic'

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false })

const plans = [
  { name: 'Free', price: '0', period: 'forever', features: ['Browse public content', 'Limited video playback', 'Basic access'] },
  { name: 'Pro', price: '299', period: 'month', features: ['Unlimited video streaming', 'Full playlist management', 'Priority support', 'Download offline'] },
  { name: 'Annual', price: '2,499', period: 'year', features: ['Everything in Pro', '2 months free', 'Early access to features', 'Exclusive content'] },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <ParticleBackground />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <span className="font-semibold tracking-widest text-sm text-neutral-300 uppercase">rootprompt</span>
        <div className="flex items-center gap-6">
          <Link href="#features" className="text-neutral-400 text-sm hover:text-white transition hidden md:block">Features</Link>
          <Link href="#pricing" className="text-neutral-400 text-sm hover:text-white transition hidden md:block">Pricing</Link>
          <Link href="/login" className="text-sm text-white border border-neutral-700 rounded px-4 py-1.5 hover:border-neutral-500 transition">Sign in</Link>
          {/* Subtle membership sign-up — low contrast, small, easy to miss */}
          <Link href="/register" className="text-neutral-600 text-xs hover:text-neutral-500 transition">join</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-[80vh] px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Stream.<br className="md:hidden" /> Explore.<br className="md:hidden" /> Create.
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl max-w-xl mb-10">
          A curated video platform built for the modern viewer. Discover content, manage playlists, and connect with what matters.
        </p>
        <Link href="/login" className="bg-white text-neutral-950 px-8 py-3 rounded font-medium hover:bg-neutral-200 transition">
          Get started
        </Link>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-6 md:px-12">
        <h2 className="text-2xl font-semibold text-center mb-16 text-neutral-200">Everything you need</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { title: 'Video Streaming', desc: 'Adaptive HLS streaming with a clean, distraction-free player.' },
            { title: 'Playlists', desc: 'Organize and queue videos exactly the way you like.' },
            { title: 'Live Monitoring', desc: 'Administrators get real-time visibility into platform usage.' },
          ].map((f) => (
            <div key={f.title} className="border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition">
              <h3 className="text-white font-medium mb-2">{f.title}</h3>
              <p className="text-neutral-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-24 px-6 md:px-12 bg-neutral-950/60">
        <h2 className="text-2xl font-semibold text-center mb-16 text-neutral-200">Simple pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {plans.map((p) => (
            <div key={p.name} className="border border-neutral-800 rounded-lg p-6 flex flex-col">
              <h3 className="text-white font-semibold text-lg mb-1">{p.name}</h3>
              <p className="text-3xl font-bold text-white mb-1">฿{p.price}</p>
              <p className="text-neutral-500 text-xs mb-6">/ {p.period}</p>
              <ul className="space-y-2 flex-1 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="text-neutral-400 text-sm flex items-center gap-2">
                    <span className="text-neutral-600">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="block text-center border border-neutral-700 rounded py-2 text-sm text-neutral-300 hover:border-neutral-500 hover:text-white transition">
                Choose {p.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-900 py-10 px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-neutral-700 text-xs">© {new Date().getFullYear()} rootpromptxai.life</span>
          <div className="flex gap-6 text-neutral-700 text-xs">
            <Link href="/login" className="hover:text-neutral-500 transition">Sign in</Link>
            {/* Very subtle sign-up in footer */}
            <Link href="/register" className="hover:text-neutral-500 transition">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
