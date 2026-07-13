"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Article } from "@/lib/types";
import { findArticleById } from "@/lib/articles";
import { ArrowLeft, Calendar, User, Bookmark, Share2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const id = Number(params?.id);
    if (!id) { setNotFound(true); return; }

    // Try local + mock first (instant)
    const local = findArticleById(id);
    if (local) { setArticle(local); return; }

    // Try backend
    const API_BASE = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/$/, "");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    fetch(`${API_BASE}/api/articles/${id}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        clearTimeout(timeout);
        if (data) setArticle(data); else setNotFound(true);
      })
      .catch(() => {
        clearTimeout(timeout);
        setNotFound(true);
      });
  }, [params?.id]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
  };

  const formattedDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  };

  const readingTime = (text?: string) => {
    if (!text) return 1;
    return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">📄</div>
        <h1 className="text-3xl font-bold text-white mb-2">Article Not Found</h1>
        <p className="text-slate-400 mb-6">This article doesn't exist or has been removed.</p>
        <Button
          onClick={() => router.push("/feed")}
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Feed
        </Button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Top nav bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSaved(!isSaved)}
              className="text-slate-400 hover:text-orange-400 transition-colors"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-orange-400 text-orange-400" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-slate-400 hover:text-orange-400 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Category badge */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 text-xs font-semibold uppercase tracking-wider text-orange-400">
            Featured Story
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
          {article.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm mb-8 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-orange-400" />
            <span>Author #{article.author_id}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-orange-400" />
            <span>{formattedDate(article.published_at || article.created_at)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-orange-400" />
            <span>{readingTime(article.content)} min read</span>
          </div>
        </div>

        {/* Summary callout */}
        {article.summary && (
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20">
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-medium italic">
              &ldquo;{article.summary}&rdquo;
            </p>
          </div>
        )}

        {/* Article body */}
        <div className="prose prose-invert prose-lg max-w-none">
          {(article.content || "Full story content not available.")
            .split("\n\n")
            .filter(Boolean)
            .map((para, i) => (
              <p
                key={i}
                className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6"
              >
                {para.trim()}
              </p>
            ))}
        </div>

        {/* Bottom actions */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <Button
            onClick={() => router.push("/feed")}
            variant="outline"
            className="flex items-center gap-2 border-slate-700 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Feed
          </Button>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsSaved(!isSaved)}
              variant="outline"
              className="flex items-center gap-2 border-slate-700 text-slate-300 hover:text-orange-400"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-orange-400 text-orange-400" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button
              onClick={handleShare}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
