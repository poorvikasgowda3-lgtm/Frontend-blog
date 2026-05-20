"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export function PublishForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/articles/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_id: 1, // Mock user
          title,
          content,
          summary,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Immediately publish it for demo purposes
        await fetch(`/api/articles/${data.article_id}/publish`, {
          method: "PUT",
        });
        router.push("/feed");
      } else {
        console.error("Failed to post article", await res.text());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-border/50 bg-card/80 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Publish an Article
        </CardTitle>
        <CardDescription className="text-lg">
          Share your contrarian views with the world.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="publish-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Title</Label>
            <Input 
              id="title" 
              placeholder="e.g., Why we should ban email..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
              className="text-lg py-6 focus-visible:ring-purple-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary" className="text-sm font-semibold">Summary (Optional)</Label>
            <Input 
              id="summary" 
              placeholder="A brief teaser..." 
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="focus-visible:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-semibold">Content</Label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              placeholder="Write your article here..."
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* We would add a multi-select for tags here, simplified for this demo */}
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          form="publish-form" 
          disabled={loading}
          className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Send className="mr-2 h-5 w-5" />
          )}
          {loading ? "Publishing..." : "Publish Article"}
        </Button>
      </CardFooter>
    </Card>
  );
}
