'use client'
import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string | null
  email: string
  role: string
  emailVerified: string | null
  createdAt: string
  subscription: { status: string } | null
}

interface Props {
  users: User[]
  activeSessions: number
  totalVideos: number
}

export default function AdminClient({ users, activeSessions, totalVideos }: Props) {
  const [liveCount, setLiveCount] = useState(activeSessions)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/admin/active-sessions')
      const data = await res.json()
      setLiveCount(data.count)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const filtered = users.filter(
    (u) => u.email.includes(search) || (u.name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-2xl font-semibold mb-2">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 mt-6">
        {[
          { label: 'Active Sessions', value: liveCount, note: 'updates every 30s' },
          { label: 'Total Users', value: users.length, note: '' },
          { label: 'Total Videos', value: totalVideos, note: '' },
        ].map((s) => (
          <div key={s.label} className="border border-neutral-800 rounded-lg p-5">
            <p className="text-neutral-500 text-xs mb-1">{s.label}</p>
            <p className="text-3xl font-bold">{s.value}</p>
            {s.note && <p className="text-neutral-600 text-xs mt-1">{s.note}</p>}
          </div>
        ))}
      </div>

      {/* User table */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Users</h2>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users…"
          className="bg-neutral-900 border border-neutral-800 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-neutral-600 w-64"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-500">
              <th className="text-left py-2 pr-4">Name</th>
              <th className="text-left py-2 pr-4">Email</th>
              <th className="text-left py-2 pr-4">Role</th>
              <th className="text-left py-2 pr-4">Verified</th>
              <th className="text-left py-2 pr-4">Subscription</th>
              <th className="text-left py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-neutral-900 hover:bg-neutral-900/50">
                <td className="py-2 pr-4 text-white">{u.name ?? '—'}</td>
                <td className="py-2 pr-4 text-neutral-300">{u.email}</td>
                <td className="py-2 pr-4">
                  <span className={`text-xs px-2 py-0.5 rounded ${u.role === 'ADMIN' ? 'bg-amber-900 text-amber-300' : 'bg-neutral-800 text-neutral-400'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-2 pr-4">
                  <span className={u.emailVerified ? 'text-green-500' : 'text-red-500'}>
                    {u.emailVerified ? '✓' : '✗'}
                  </span>
                </td>
                <td className="py-2 pr-4 text-neutral-400">{u.subscription?.status ?? '—'}</td>
                <td className="py-2 text-neutral-500">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
