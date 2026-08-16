'use client'
import { ParticlesProvider, Particles } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'
import type { ISourceOptions } from '@tsparticles/engine'

const particleOptions: ISourceOptions = {
  background: { color: { value: 'transparent' } },
  particles: {
    number: { value: 160, density: { enable: true } },
    color: { value: ['#ffffff', '#c7d2fe', '#a5b4fc', '#e0e7ff'] },
    opacity: {
      value: { min: 0.05, max: 0.8 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    size: { value: { min: 0.4, max: 2.2 } },
    move: {
      enable: true,
      speed: 0.15,
      direction: 'none',
      random: true,
      straight: false,
      outModes: 'out',
    },
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
