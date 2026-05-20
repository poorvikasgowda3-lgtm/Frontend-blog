import Link from "next/link";
import { Button } from "./ui/button";
import { PenSquare, Sparkles } from "lucide-react";

export function TopNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/30">
      <div className="container mx-auto flex h-20 items-center px-4 justify-between">
        <Link href="/feed" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
            Contrary Canvas
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/write">
            <Button variant="default" className="bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:from-blue-500 hover:to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/25 border-0 font-semibold px-6 py-5 rounded-full transition-all hover:scale-105 active:scale-95">
              <PenSquare className="w-4 h-4 mr-2" />
              Write a Post
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
