"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { registerUser } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { UserPlus, Sparkles, Loader2, AlertCircle, ArrowRight, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function RegisterPage() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
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
      const user = await registerUser(name, email, password);
      login(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
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
            Join the <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Community
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Create an account to start sharing your stories and connecting with fellow writers.
          </p>
        </div>

        {/* Right Side: Register form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl border shadow-2xl shadow-orange-900/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500" />
            
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-orange-400" /> Sign Up
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">
                Create a new account to get started.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {error && (
                <div className="mb-5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <form id="register-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-slate-300">
                    Full Name <span className="text-orange-400">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      required
                      className="pl-10 bg-slate-800/40 border-slate-700 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                    />
                  </div>
                </div>

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

            <CardFooter className="pt-2 pb-6 flex-col">
              <Button
                type="submit"
                form="register-form"
                disabled={loading}
                className="w-full py-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white shadow-lg shadow-pink-500/20 font-bold transition-all duration-300 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Signing up...
                  </>
                ) : (
                  <>
                    Sign Up <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
              <div className="mt-4 text-center text-sm text-slate-400 w-full">
                Already have an account?{" "}
                <Link href="/login" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
