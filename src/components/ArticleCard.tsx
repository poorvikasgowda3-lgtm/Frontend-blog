"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";

interface ArticleProps {
  article: {
    article_id: number;
    title: string;
    summary?: string;
    author_id: number;
    published_at: string;
  };
}

export function ArticleCard({ article }: ArticleProps) {
  const handleClick = async () => {
    try {
      // Fire the interaction endpoint silently
      await fetch("/api/interactions/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          article_id: article.article_id,
          duration_seconds: 15,
          user_id: 1, // Mock user for demo purposes
          device_type: "desktop"
        }),
      });
      console.log("Interaction logged for", article.title);
    } catch (err) {
      console.error("Failed to log interaction", err);
    }
  };

  return (
    <Card 
      onClick={handleClick} 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50 border-border/50 backdrop-blur-sm"
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold leading-tight">{article.title}</CardTitle>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            Author #{article.author_id}
          </span>
        </div>
        <CardDescription className="line-clamp-2 mt-2 text-muted-foreground">
          {article.summary || "No summary provided."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Placeholder for tags if they existed */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">Contrarian</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground border-t border-border/50 pt-4">
        <span>{new Date(article.published_at).toLocaleDateString()}</span>
        <Button variant="ghost" size="sm" className="hover:bg-primary/20 hover:text-primary transition-colors">
          <Eye className="w-4 h-4 mr-2" /> Read More
        </Button>
      </CardFooter>
    </Card>
  );
}
