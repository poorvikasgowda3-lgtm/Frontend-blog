"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { PenSquare, Sparkles, Home, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function TopNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60 shadow-lg shadow-orange-500/5">
      <div className="container mx-auto flex h-20 items-center px-4 justify-between">
        <Link href="/feed" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-br from-orange-400 to-pink-600 p-2 rounded-[20px] group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-pink-600/20 rounded-[20px] blur-sm" />
            <Sparkles className="w-6 h-6 text-white relative z-10" />
          </div>
          <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-orange-400 via-pink-500 to-rose-500 bg-clip-text text-transparent drop-shadow-sm">
            BLOG
          </span>
        </Link>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {user && (
            <div className="flex items-center space-x-2 mr-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 text-xs font-bold shadow-inner">
                {(user.display_name || user.username || "U").charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-semibold text-slate-300 max-w-[80px] sm:max-w-[120px] truncate hidden xs:inline">
                {user.display_name || user.username || "User"}
              </span>
            </div>
          )}

          <Link href="/feed">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-300 hover:text-orange-400 hover:bg-slate-800/50 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Feed</span>
            </Button>
          </Link>
          
          <Link href="/write">
            <Button 
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white shadow-lg shadow-pink-500/30 border-0 font-semibold px-4 sm:px-6 py-5 rounded-lg transition-all hover:shadow-xl active:scale-95 text-xs sm:text-sm"
            >
              <PenSquare className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Write</span>
              <span className="sm:hidden">Post</span>
            </Button>
          </Link>

          {user && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={logout}
              className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
