import { TopNavbar } from "@/components/TopNavbar";
import { PublishForm } from "@/components/PublishForm";
import { Footer } from "@/components/Footer";

export default function WritePage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-950 selection:bg-orange-500/30">
      {/* Dynamic Background Gradients - Curved */}
      <div className="absolute top-[-35%] right-[-15%] w-[700px] h-[700px] rounded-full bg-orange-600/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-pink-600/15 blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] right-[30%] w-[500px] h-[500px] rounded-full bg-rose-400/5 blur-[120px] pointer-events-none" />

      {/* Curved decorative line */}
      <div className="absolute top-32 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent blur-sm pointer-events-none" />

      <TopNavbar />
      
      <main className="container relative z-10 mx-auto px-4 py-12 md:py-16 flex-1">
        {/* Header */}
        <div className="mb-12 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-block mb-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 backdrop-blur-md">
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-400">
              Create & Share
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Write Your <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-rose-500 bg-clip-text text-transparent drop-shadow-sm">Story</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Share your thoughts, experiences, and ideas with the world. Let your voice be heard.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <PublishForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
