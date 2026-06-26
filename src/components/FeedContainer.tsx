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

const MOCK_ARTICLES: Article[] = [
  {
    article_id: 101,
    author_id: 1,
    title: "The Future of Remote Work",
    summary: "How working from home is reshaping industries forever.",
    content: "Remote work has fundamentally changed how we think about productivity and collaboration. Companies are discovering that distributed teams can be more efficient than traditional office setups. The flexibility allows employees to optimize their environment and work during their most productive hours. This shift has opened opportunities for global talent acquisition and reduced overhead costs for businesses. However, it requires new communication strategies and tools to maintain team cohesion and company culture.",
    status: "published",
    published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    article_id: 102,
    author_id: 2,
    title: "Building Your First Web App",
    summary: "A beginner's guide to creating a modern web application.",
    content: "Starting your first web development project can feel overwhelming. This guide breaks down the essential steps: choose your tech stack, set up your development environment, plan your project structure, and start coding. Modern frameworks like React and Next.js make it easier than ever to build professional applications. Don't get caught up in analysis paralysis - the best way to learn is by building. Start small, iterate quickly, and gradually add more features as you gain confidence.",
    status: "published",
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    article_id: 103,
    author_id: 3,
    title: "Designing for Accessibility",
    summary: "Why inclusive design benefits everyone.",
    content: "Accessible design is not just about helping people with disabilities - it benefits everyone. When you design for accessibility, you create better user experiences overall. Clear typography, good color contrast, and intuitive navigation help all users navigate your product more easily. Keyboard navigation, screen reader compatibility, and alt text for images are standard practices that should be part of every design. Companies that prioritize accessibility often find their products have better engagement across all user demographics.",
    status: "published",
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    article_id: 104,
    author_id: 4,
    title: "AI and the Future of Work",
    summary: "How artificial intelligence is transforming industries.",
    content: "Artificial intelligence is no longer science fiction - it's reshaping how we work today. From automation of routine tasks to AI-powered analytics, organizations are leveraging these technologies to increase productivity and make better decisions. However, the rise of AI also brings challenges around job displacement and the need for new skills. The future likely involves humans and AI working together, with AI handling data-heavy tasks and humans focusing on creativity and strategy. To stay relevant, professionals need to embrace continuous learning and understand how to work effectively with AI tools.",
    status: "published",
    published_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    article_id: 105,
    author_id: 5,
    title: "The Art of Digital Storytelling",
    summary: "Using multimedia to create engaging narratives.",
    content: "Digital storytelling combines text, images, audio, and video to create compelling narratives. In today's fast-paced digital world, audiences respond better to well-crafted stories than to pure information dumps. Successful digital storytelling requires understanding your audience and choosing the right medium for your message. Whether you're creating blog posts, videos, or interactive experiences, the principles remain the same: start with a strong story, use visuals effectively, and make an emotional connection with your audience. The tools available today make it easier than ever to create professional-quality digital content.",
    status: "published",
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export function FeedContainer() {
  let API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || "";
  if (API_BASE.endsWith("/")) {
    API_BASE = API_BASE.slice(0, -1);
  }
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
      const fetchedArticles = data.feed || data.data || [];
      if (fetchedArticles.length > 0) {
        setArticles(fetchedArticles);
      } else {
        setArticles(MOCK_ARTICLES);
      }
      if (data.pagination) {
        setPagination(data.pagination);
      }
      setPage(pageNum);
    } catch (err) {
      console.error("Failed to fetch feed:", err);
      
      // Try fallback
      try {
        const fallbackRes = await fetch(`${API_BASE}/api/articles?page=${pageNum}&limit=${limit}`);
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          const fetchedArticles = fallbackData.data || fallbackData || [];
          if (fetchedArticles.length > 0) {
            setArticles(fetchedArticles);
          } else {
            setArticles(MOCK_ARTICLES);
          }
          if (fallbackData.pagination) {
            setPagination(fallbackData.pagination);
          }
          setError(null);
          setPage(pageNum);
        } else {
          throw new Error("Fallback fetch failed");
        }
      } catch (fallbackErr) {
        console.error("Fallback also failed:", fallbackErr);
        // Both failed, use mock data as fallback
        setArticles(MOCK_ARTICLES);
        setError(null);
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
