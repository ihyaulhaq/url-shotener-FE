"use client";
import { useState } from "react";
import { Copy } from "lucide-react";

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleShorten() {
    if (!inputUrl) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/urls/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_url: inputUrl }), 
      });

      const data = await res.json();

      console.warn("Response from server:", data);

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setShortUrl(data.data.short_url ?? ""); 
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-100 px-4 py-10">
      <div className="w-full max-w-6xl rounded-4xl bg-yellow-50 px-8 py-10 shadow-[0_30px_40px_rgba(15,23,42,0.2)] text-[#04172f]">
        <h2 className="text-2xl font-semibold">Shorten a long link</h2>
        <label className="mt-4 block font-medium text-slate-600">
          Paste your long link here
        </label>
        <div className="mt-3 flex flex-col gap-4 md:flex-row">
          <input
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
            placeholder="https://example.com/my-long-url"
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <button 
            className="flex items-center justify-center rounded-2xl bg-amber-300 px-6 py-3 font-semibold text-white shadow-[0_15px_30px_rgba(255,211,77,0.35)] hover:bg-amber-400"
            onClick={handleShorten}
            disabled={loading}
          >
            {loading ? "Shortening..." : "Get link"}
          </button>
        </div>
        {/* Result */}
        <div className="mt-3 relative">
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
            value={shortUrl}
            readOnly
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            onClick={handleCopy}
          >
            <Copy size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}