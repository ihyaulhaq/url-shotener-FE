"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Link2, Loader2 } from "lucide-react";
import { signupUser } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await signupUser(username, email, password);

      if (res.error) {
        setError(res.error.message);
        return;
      }

      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        router.push("/");
      }
    } catch {
      setError("Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-orange-100 px-4 py-10 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300 shadow-lg shadow-amber-300/40">
            <Link2 size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#04172f]">
            LinkConnect
          </h1>
          <p className="text-sm text-slate-500">Create your free account</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-yellow-50 px-8 py-10 shadow-[0_30px_60px_rgba(15,23,42,0.15)]">
          <h2 className="mb-6 text-xl font-semibold text-[#04172f]">
            Get started
          </h2>

          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <span className="mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="signup-form">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-username"
                className="text-sm font-medium text-slate-600"
              >
                Username
              </label>
              <input
                id="signup-username"
                type="text"
                autoComplete="username"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40 transition-all"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-email"
                className="text-sm font-medium text-slate-600"
              >
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40 transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-password"
                className="text-sm font-medium text-slate-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-700 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40 transition-all"
                />
                <button
                  type="button"
                  id="toggle-signup-password"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-confirm-password"
                className="text-sm font-medium text-slate-600"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="signup-confirm-password"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-2xl border bg-white px-4 py-3 pr-12 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    confirmPassword && confirmPassword !== password
                      ? "border-red-300 focus:border-red-400 focus:ring-red-200/40"
                      : "border-slate-200 focus:border-amber-400 focus:ring-amber-300/40"
                  }`}
                />
                <button
                  type="button"
                  id="toggle-confirm-password"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-red-500">Passwords do not match.</p>
              )}
            </div>

            {/* Submit */}
            <button
              id="signup-submit-btn"
              type="submit"
              disabled={loading}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-amber-300 px-6 py-3 font-semibold text-white shadow-[0_10px_25px_rgba(255,193,7,0.35)] hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              id="go-to-login"
              className="font-semibold text-amber-500 hover:text-amber-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Back home */}
        <p className="mt-6 text-center text-sm text-slate-400">
          <Link
            href="/"
            id="back-to-home-signup"
            className="hover:text-slate-600 transition-colors"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
