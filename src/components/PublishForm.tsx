"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2, Send, AlertCircle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function PublishForm() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    if (!title.trim()) {
      setError("Title is required");
      return false;
    }
    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return false;
    }
    if (!content.trim()) {
      setError("Content is required");
      return false;
    }
    if (content.trim().length < 10) {
      setError("Content must be at least 10 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/articles/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_id: 1,
          title: title.trim(),
          content: content.trim(),
          summary: summary.trim() || null,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create article: ${res.status}`);
      }

      const data = await res.json();

      // Publish the article
      const publishRes = await fetch(`${API_BASE}/api/articles/${data.article_id}/publish`, {
        method: "PUT",
      });

      if (!publishRes.ok) {
        throw new Error("Failed to publish article");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/feed");
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Error publishing article:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="shadow-2xl border-orange-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-md border-2">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur-2xl opacity-30" />
            <CheckCircle className="h-20 w-20 text-orange-400 relative animate-bounce" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Story Published! 🎉
          </h2>
          <p className="text-lg text-slate-300">
            Your story is now live for everyone to read.
          </p>
          <p className="text-sm text-slate-400">Redirecting to feed...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-orange-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border-2 overflow-hidden relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 pointer-events-none" />
      
      <CardHeader className="relative z-10 pb-8">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 w-fit">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
            Create & Publish
          </span>
        </div>
        <CardTitle className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-400 via-pink-500 to-rose-500 bg-clip-text text-transparent">
          Share Your Story
        </CardTitle>
        <CardDescription className="text-lg text-slate-300 mt-2">
          Write and publish your thoughts, experiences, and ideas.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3 animate-in">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-red-500">Publishing Error</p>
              <p className="text-sm text-red-400 mt-1">{error}</p>
            </div>
          </div>
        )}
        <form id="publish-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-slate-200">
              Story Title <span className="text-orange-400">*</span>
            </Label>
            <Input 
              id="title" 
              placeholder="e.g., My journey learning to code..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required 
              className="text-base py-6 bg-slate-800/50 border-slate-700 focus-visible:ring-orange-500 focus-visible:border-orange-500"
            />
            <p className="text-xs text-slate-400 flex justify-between">
              <span>Write a compelling title that hooks readers</span>
              <span>{title.length}/100</span>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary" className="text-sm font-semibold text-slate-200">
              Summary (Optional)
            </Label>
            <Input 
              id="summary" 
              placeholder="Brief summary of your story..." 
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              disabled={loading}
              className="bg-slate-800/50 border-slate-700 focus-visible:ring-pink-500 focus-visible:border-pink-500"
            />
            <p className="text-xs text-slate-400 flex justify-between">
              <span>This appears in the feed preview</span>
              <span>{summary.length}/200</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-semibold text-slate-200">
              Story Content <span className="text-orange-400">*</span>
            </Label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              required
              rows={10}
              placeholder="Write your full story here. Share your experiences and ideas..."
              className="flex w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
            <p className="text-xs text-slate-400 flex justify-between">
              <span>Minimum 10 characters</span>
              <span>{content.length}/5000</span>
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="relative z-10 border-t border-slate-800/50 pt-6">
        <Button 
          type="submit" 
          form="publish-form" 
          disabled={loading}
          className="w-full py-6 text-base font-semibold bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Publish Story
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
