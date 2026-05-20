"use client";

import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Loader2 } from "lucide-react";

export function FeedContainer() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch personalized feed algorithm (Track B)
    // If user 1 is our mock user
    const fetchFeed = async () => {
      try {
        const res = await fetch("/api/users/1/feed/recommended");
        if (!res.ok) {
          // Fallback to general feed if recommended fails
          const fallbackRes = await fetch("/api/articles");
          const fallbackData = await fallbackRes.json();
          setArticles(fallbackData);
        } else {
          const data = await res.json();
          setArticles(data.feed || []);
        }
      } catch (err) {
        console.error("Failed to fetch feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center w-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 font-medium">Curating your contrarian feed...</span>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center w-full bg-secondary/20 rounded-xl border border-dashed border-border p-8 text-center">
        <h3 className="text-xl font-bold mb-2">No articles found</h3>
        <p className="text-muted-foreground">It's quiet in here. Why not write the first post?</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}
