import type { Article } from "./types";

const STORAGE_KEY = "meet5_local_articles";

export function getLocalArticles(): Article[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Article[]) : [];
  } catch {
    return [];
  }
}

export function saveLocalArticle(article: Article): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalArticles();
    const updated = [article, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}
