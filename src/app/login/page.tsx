"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {



  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={() => signIn("github")}
        className="bg-gray-900 text-white px-4 py-2 rounded"
      >
        Sign in with GitHub
      </button>
    </main>
  );
}
