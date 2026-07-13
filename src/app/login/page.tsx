"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Sparkles, User as UserIcon, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import type { User } from "@/lib/types";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  let API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || "";
  if (API_BASE.endsWith("/")) {
    API_BASE = API_BASE.slice(0, -1);
  }

  useEffect(() => {
    // Fetch registered database users
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) {
        console.error("Failed to load user profiles from backend:", err);
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsers();
  }, [API_BASE]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          display_name: displayName.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to log in");
      }

      const loggedInUser = await res.json();
      login(loggedInUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = (profile: User) => {
    login(profile);
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-950 selection:bg-orange-500/30 justify-center items-center px-4 py-16">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Side: Brand and profiles list */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-8 pr-0 md:pr-4">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 w-fit backdrop-blur-md">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Welcome to Meet5 Blog
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none">
              Discover, Write &amp; <br />
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                Share Your Story
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Connect with fellow writers, explore recommended feeds, and save your favourite columns.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Select a Quick Profile
            </h3>
            
            {usersLoading ? (
              <div className="flex items-center space-x-2 text-slate-500 py-4">
                <Loader2 className="w-5 h-5 animate-spin text-orange-400" />
                <span className="text-sm">Retrieving active profiles...</span>
              </div>
            ) : users.length === 0 ? (
              <div className="text-sm text-slate-500 border border-dashed border-slate-800 p-6 rounded-2xl bg-slate-900/20">
                No profiles registered in database. Use the registration form to create one!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {users.map((profile) => (
                  <button
                    key={profile.user_id}
                    onClick={() => handleProfileClick(profile)}
                    className="flex items-center space-x-3 p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900 hover:border-orange-500/40 text-left transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-0.5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold group-hover:from-orange-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300">
                      {profile.display_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-white truncate">
                        {profile.display_name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        @{profile.username}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Log in form */}
        <div className="md:col-span-5 flex items-center">
          <Card className="w-full border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500" />
            
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <LogIn className="w-5 h-5 text-orange-400" /> Sign In
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">
                Enter your username to access your dashboard. New usernames will automatically register.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-500 text-sm">Authentication failed</p>
                    <p className="text-xs text-red-400 mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              <form id="login-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-semibold text-slate-300">
                    Username <span className="text-orange-400">*</span>
                  </Label>
                  <Input
                    id="username"
                    placeholder="e.g. sarah_writer"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    required
                    className="bg-slate-800/40 border-slate-800 focus-visible:ring-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-sm font-semibold text-slate-300">
                    Display Name (For new users)
                  </Label>
                  <Input
                    id="displayName"
                    placeholder="e.g. Sarah Chen"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={loading}
                    className="bg-slate-800/40 border-slate-800 focus-visible:ring-pink-500"
                  />
                </div>
              </form>
            </CardContent>

            <CardFooter className="pt-4">
              <Button
                type="submit"
                form="login-form"
                disabled={loading}
                className="w-full py-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white shadow-lg shadow-pink-500/20 font-bold transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Loggin in...
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
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
