import { TopNavbar } from "@/components/TopNavbar";
import { FeedContainer } from "@/components/FeedContainer";
import { Footer } from "@/components/Footer";

export default function FeedPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-950 selection:bg-orange-500/30">
      {/* Dynamic Background Gradients - Curved */}
      <div className="absolute top-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-orange-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[700px] h-[700px] rounded-full bg-pink-600/15 blur-[160px] pointer-events-none" />
      <div className="absolute top-[20%] left-[35%] w-[500px] h-[500px] rounded-full bg-rose-400/5 blur-[120px] pointer-events-none" />

      {/* Curved decorative shapes */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent blur-md pointer-events-none" />
      <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent blur-sm pointer-events-none" />

      <TopNavbar />
      
      <main className="container relative z-10 mx-auto px-4 py-16 flex-1">
        <div className="mb-16 text-center space-y-6">
          <div className="inline-block mb-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 backdrop-blur-md">
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-300">
              Latest Stories
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Welcome to <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-rose-500 bg-clip-text text-transparent drop-shadow-sm">BLOG</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light">
            Discover amazing stories and articles shared by our community. Read, engage, and share your thoughts.
          </p>
        </div>
        
        <div className="bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800 backdrop-blur-xl shadow-2xl shadow-orange-900/10 relative overflow-hidden">
          {/* Curved accent inside */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-bl from-orange-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <FeedContainer />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
