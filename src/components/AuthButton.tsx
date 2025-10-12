'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <img src={session.user?.image || ''} className="w-6 h-6 rounded-full" />
        <span>{session.user?.name}</span>
        <button onClick={() => signOut()} className="bg-blue-500 px-2 py-1 rounded">
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => signIn('github')} className="bg-gray-500 text-white px-3 py-1 rounded">
      Sign in with GitHub
    </button>
  )
}
