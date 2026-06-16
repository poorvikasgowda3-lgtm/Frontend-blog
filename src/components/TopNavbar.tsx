import Link from "next/link";
import { Button } from "./ui/button";
import { PenSquare, Sparkles, Home } from "lucide-react";

export function TopNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60 shadow-lg shadow-cyan-500/5">
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
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link href="/feed">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Feed</span>
            </Button>
          </Link>
          
          <Link href="/write">
            <Button 
              className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-white shadow-lg shadow-fuchsia-500/30 border-0 font-semibold px-6 py-5 rounded-lg transition-all hover:shadow-xl active:scale-95"
            >
              <PenSquare className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Write</span>
              <span className="sm:hidden">Post</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
