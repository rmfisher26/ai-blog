"use client";
import { useState } from "react";

export default function WritePage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) setResult(data.error);
    else setResult(`✅ Post saved! View it at /posts/${data.slug}`);
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 AI Blog Writer</h1>
      <input
        type="text"
        placeholder="Enter a topic (e.g. AI in games)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Post"}
      </button>
      {result && <p className="mt-4 text-green-600">{result}</p>}
    </main>
  );
}
