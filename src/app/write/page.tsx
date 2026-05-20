import { TopNavbar } from "@/components/TopNavbar";
import { PublishForm } from "@/components/PublishForm";

export default function WritePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <main className="container mx-auto px-4 py-12">
        <PublishForm />
      </main>
    </div>
  );
}
