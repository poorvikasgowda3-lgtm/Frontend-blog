"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, ArrowRight, Sparkles } from "lucide-react";

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
      await fetch("/api/interactions/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          article_id: article.article_id,
          duration_seconds: 15,
          user_id: 1, 
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
      className="group cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-2 bg-slate-900/80 border-slate-800/80 backdrop-blur-md overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500" />

      <CardHeader className="relative z-10 pb-2">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 flex items-center">
            <Sparkles className="w-3 h-3 mr-1" /> Algorithm Pick
          </span>
          <span className="text-xs text-slate-500 font-medium bg-slate-800/50 px-2 py-1 rounded-md">
            @{article.author_id}
          </span>
        </div>
        <CardTitle className="text-2xl font-bold leading-snug group-hover:text-cyan-300 transition-colors duration-300 text-slate-100">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="line-clamp-3 text-slate-400 leading-relaxed text-sm">
          {article.summary || "No summary provided. Read more to explore this contrarian viewpoint."}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 font-medium">Contrarian</span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 font-medium">Debate</span>
        </div>
      </CardContent>
      <CardFooter className="relative z-10 flex justify-between items-center text-sm text-slate-500 border-t border-slate-800/60 pt-4 mt-2">
        <span className="font-medium text-xs">{new Date(article.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        <div className="flex items-center text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform duration-300">
          <span className="text-sm mr-1 opacity-0 group-hover:opacity-100 transition-opacity">Read</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
