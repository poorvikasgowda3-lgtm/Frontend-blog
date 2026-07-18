"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Sparkles, Loader2, AlertCircle, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { fetchWithTimeout, getApiBase } from "@/lib/api";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetchWithTimeout(`${getApiBase()}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      }, 8000);

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      login(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-950 selection:bg-orange-500/30 justify-center items-center px-4 py-16">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-rose-500/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 items-center">
        
        {/* Left Side: Brand */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 w-fit backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Welcome to Meet5 Blog
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Discover, Write &amp; <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Share Your Story
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Connect with fellow writers, explore recommended feeds, and share your favourite stories with the community.
          </p>

          {/* Demo credentials helper */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-3">
              Demo Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { name: "Sarah Chen", email: "sarah@meet5.com" },
                { name: "John Developer", email: "john@meet5.com" },
                { name: "Emma Designer", email: "emma@meet5.com" },
                { name: "Alex Thompson", email: "alex@meet5.com" },
              ].map((demo) => (
                <button
                  key={demo.email}
                  type="button"
                  onClick={() => { setEmail(demo.email); setPassword("password123"); setError(null); }}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-800/60 bg-slate-900/30 hover:bg-slate-800/50 hover:border-orange-500/30 text-left transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold group-hover:from-orange-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-200">
                    {demo.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-300 truncate">{demo.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{demo.email}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-600 mt-2.5">
              Password for all demo accounts: <code className="text-orange-400/70 bg-slate-800/50 px-1 py-0.5 rounded">password123</code>
            </p>
          </div>
        </div>

        {/* Right Side: Login form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl border shadow-2xl shadow-orange-900/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500" />
            
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <LogIn className="w-5 h-5 text-orange-400" /> Sign In
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">
                Enter your email and password. New emails are automatically registered.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {error && (
                <div className="mb-5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <form id="login-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-300">
                    Email ID <span className="text-orange-400">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                      className="pl-10 bg-slate-800/40 border-slate-700 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-300">
                    Password <span className="text-orange-400">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                      minLength={6}
                      className="pl-10 pr-10 bg-slate-800/40 border-slate-700 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500">Minimum 6 characters</p>
                </div>
              </form>
            </CardContent>

            <CardFooter className="pt-2 pb-6">
              <Button
                type="submit"
                form="login-form"
                disabled={loading}
                className="w-full py-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white shadow-lg shadow-pink-500/20 font-bold transition-all duration-300 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
