"use client";

import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Loader2, AlertCircle, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import type { Article } from "@/lib/types";
import { Button } from "./ui/button";
import { FeedSkeletonLoader } from "./Skeleton";

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export function FeedContainer() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const limit = 12;

  const fetchFeed = async (pageNum: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/users/1/feed/recommended?page=${pageNum}&limit=${limit}`, {
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch feed: ${res.status}`);
      }
      
      const data = await res.json();
      setArticles(data.feed || data.data || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
      setPage(pageNum);
    } catch (err) {
      console.error("Failed to fetch feed:", err);
      setError(err instanceof Error ? err.message : "Failed to load feed");
      
      // Try fallback
      try {
        const fallbackRes = await fetch(`${API_BASE}/api/articles?page=${pageNum}&limit=${limit}`);
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          setArticles(fallbackData.data || fallbackData || []);
          if (fallbackData.pagination) {
            setPagination(fallbackData.pagination);
          }
          setError(null);
          setPage(pageNum);
        }
      } catch (fallbackErr) {
        console.error("Fallback also failed:", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed(1);
  }, []);

  if (loading && articles.length === 0) {
    return <FeedSkeletonLoader />;
  }

  if (error && articles.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center w-full bg-red-500/10 rounded-xl border border-red-500/30 p-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
        <h3 className="text-xl font-bold mb-2">Unable to load feed</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button 
          onClick={() => fetchFeed(1)} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center w-full bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-xl border border-dashed border-slate-700/50 p-8 text-center">
        <div className="text-5xl mb-4">📝</div>
        <h3 className="text-2xl font-bold mb-2">No articles yet</h3>
        <p className="text-slate-400 mb-6">Be the first to share your story!</p>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90">
          Write Your First Story
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-8 border-t border-slate-800">
          <Button
            onClick={() => fetchFeed(page - 1)}
            disabled={page === 1 || loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, pagination.pages) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  onClick={() => fetchFeed(pageNum)}
                  disabled={loading}
                  variant={pageNum === page ? "default" : "outline"}
                  className="w-10 h-10 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            onClick={() => fetchFeed(page + 1)}
            disabled={page === pagination.pages || loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>

          <span className="text-sm text-slate-400 ml-4">
            Page {page} of {pagination.pages} ({pagination.total} total)
          </span>
        </div>
      )}
    </div>
  );
}
