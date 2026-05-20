import { TopNavbar } from "@/components/TopNavbar";
import { FeedContainer } from "@/components/FeedContainer";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Your Contrarian Feed
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover articles that challenge your perspective. The more you read, the smarter the algorithm gets.
          </p>
        </div>
        
        <FeedContainer />
      </main>
    </div>
  );
}
