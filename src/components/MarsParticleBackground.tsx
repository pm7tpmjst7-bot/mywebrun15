'use client'
import { ParticlesProvider, Particles } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'
import type { ISourceOptions } from '@tsparticles/engine'

const marsOptions: ISourceOptions = {
  background: { color: { value: 'transparent' } },
  particles: {
    number: { value: 90, density: { enable: true } },
    color: { value: ['#c2521e', '#e07840', '#a0400e', '#d4824a', '#8b3510'] },
    opacity: {
      value: { min: 0.04, max: 0.55 },
      animation: { enable: true, speed: 0.4, sync: false },
    },
    size: { value: { min: 0.5, max: 3.5 } },
    move: {
      enable: true,
      speed: 0.35,
      direction: 'right',
      random: true,
      straight: false,
      outModes: 'out',
      drift: 0.4,
    },
    links: { enable: false },
  },
  detectRetina: true,
}

async function initEngine(engine: Engine) {
  await loadSlim(engine)
}

export default function MarsParticleBackground() {
  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id="mars-particles"
        className="absolute inset-0 z-0"
        options={marsOptions}
      />
    </ParticlesProvider>
  )
}
