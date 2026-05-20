import { TopNavbar } from "@/components/TopNavbar";
import { FeedContainer } from "@/components/FeedContainer";

export default function FeedPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 selection:bg-fuchsia-500/30">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-fuchsia-600/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none" />

      <TopNavbar />
      
      <main className="container relative z-10 mx-auto px-4 py-16">
        <div className="mb-16 text-center space-y-6">
          <div className="inline-block mb-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-fuchsia-500/20 border border-blue-500/30 backdrop-blur-md">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              Personalized for you
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Your <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">Contrarian</span> Feed
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light">
            Discover articles that challenge your perspective. The more you interact, the smarter the algorithm gets.
          </p>
        </div>
        
        <div className="bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800 backdrop-blur-xl shadow-2xl shadow-blue-900/20">
          <FeedContainer />
        </div>
      </main>
    </div>
  );
}
