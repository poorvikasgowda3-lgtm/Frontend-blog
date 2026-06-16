"use client";

import { useState } from "react";
import type { Article } from "@/lib/types";
import { Button } from "./ui/button";
import { X, Calendar, User, Share2, Bookmark } from "lucide-react";

interface ArticleModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-orange-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-6">
          {/* Header */}
          <div>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                Featured Story
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Author #{article.author_id}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(article.published_at).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          {article.summary && (
            <div className="p-6 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-xl">
              <p className="text-lg text-slate-300 leading-relaxed">
                {article.summary}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-base md:text-lg text-slate-300 leading-relaxed whitespace-pre-wrap">
              {article.content || "Full story content not available."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-800">
            <Button
              onClick={() => setIsSaved(!isSaved)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              onClick={onClose}
              className="ml-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
