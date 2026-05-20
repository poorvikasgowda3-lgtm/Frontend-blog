import Link from "next/link";
import { Button } from "./ui/button";

export function TopNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link href="/feed" className="flex items-center space-x-2">
          <span className="font-bold text-2xl tracking-tighter bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Contrary Canvas
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/write">
            <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity">
              Write a Post
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
