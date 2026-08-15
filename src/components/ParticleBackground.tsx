'use client'
import { ParticlesProvider, Particles } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'
import type { ISourceOptions } from '@tsparticles/engine'

const particleOptions: ISourceOptions = {
  background: { color: { value: 'transparent' } },
  particles: {
    number: { value: 120, density: { enable: true } },
    color: { value: '#ffffff' },
    opacity: { value: { min: 0.1, max: 0.5 } },
    size: { value: { min: 0.5, max: 1.5 } },
    move: { enable: true, speed: 0.3, direction: 'none', random: true },
    links: { enable: false },
  },
  detectRetina: true,
}

async function initEngine(engine: Engine) {
  await loadSlim(engine)
}

export default function ParticleBackground() {
  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        options={particleOptions}
      />
    </ParticlesProvider>
  )
}
