import Link from "next/link";
import { Sparkles, Github, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-orange-400 to-pink-600 p-1.5 rounded-[12px]">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-lg bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                BLOG
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Share your thoughts, stories, and ideas with the world.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/feed" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Browse Feed
                </Link>
              </li>
              <li>
                <Link href="/write" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Write Article
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-slate-800 hover:bg-orange-500/20 rounded-lg transition-colors text-slate-400 hover:text-orange-400"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 hover:bg-pink-500/20 rounded-lg transition-colors text-slate-400 hover:text-pink-400"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800/30 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {currentYear} BLOG. All rights reserved.</p>
          <p>Made with ❤️ by Meet5 Team</p>
        </div>
      </div>
    </footer>
  );
}
