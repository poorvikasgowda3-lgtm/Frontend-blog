import type { Article } from "./types";
import { getLocalArticles } from "./localArticles";

export const MOCK_ARTICLES: Article[] = [
  {
    article_id: 101,
    author_id: 1,
    title: "The Future of Remote Work",
    summary: "How working from home is reshaping industries forever.",
    content: `Remote work has fundamentally changed how we think about productivity and collaboration. Companies are discovering that distributed teams can be more efficient than traditional office setups.

The flexibility allows employees to optimize their environment and work during their most productive hours. Night owls can work when their focus peaks; early birds can start the day before distractions mount. This personalization of the work schedule has led to measurable improvements in output quality across many knowledge-work sectors.

This shift has opened opportunities for global talent acquisition and reduced overhead costs for businesses. A company in San Francisco can now hire the best developer in Bangalore without relocation costs. A startup with five people can compete with an enterprise for the same talent pool.

However, it requires new communication strategies and tools to maintain team cohesion and company culture. Asynchronous communication, thoughtful documentation, and intentional virtual gatherings have become essential skills. Leaders who adapt will find remote work is not a compromise — it's an upgrade.`,
    status: "published",
    published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    article_id: 102,
    author_id: 2,
    title: "Building Your First Web App",
    summary: "A beginner's guide to creating a modern web application.",
    content: `Starting your first web development project can feel overwhelming. The ecosystem is vast, opinions are loud, and tutorials often assume knowledge you don't yet have. This guide breaks it down simply.

Step one: choose your tech stack. For beginners, HTML, CSS, and JavaScript are your foundation. Once comfortable, move to a framework like React or Next.js. These tools are industry-standard and have enormous communities.

Step two: set up your development environment. Install Node.js, use VS Code as your editor, and get comfortable with the terminal. These three tools will be with you for your entire career.

Step three: plan your project structure before writing a single line of code. Knowing where files go, how data flows, and what components you need saves hours of painful refactoring.

Step four: start coding — and embrace the mess. Your first version will not be pretty. That's expected and completely fine. Don't get caught up in analysis paralysis. The best way to learn is by building. Start small, iterate quickly, and gradually add more features as you gain confidence. Every expert was once a beginner who kept going.`,
    status: "published",
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    article_id: 103,
    author_id: 3,
    title: "Designing for Accessibility",
    summary: "Why inclusive design benefits everyone.",
    content: `Accessible design is not just about helping people with disabilities — it benefits everyone. When you design for accessibility, you create better user experiences for all your users, regardless of their abilities or context.

Clear typography makes text easier to read in bright sunlight, for someone with dyslexia, and for an elderly user with declining vision. Good color contrast helps colorblind users — and also anyone reading on a dim laptop screen outdoors. Intuitive navigation helps all users move through your product more easily.

Keyboard navigation, screen reader compatibility, and alt text for images are not edge-case features. They are standard practices that should be part of every design. They also improve your SEO, since search engines read your content similarly to how screen readers do.

Companies that prioritize accessibility often find their products have better engagement across all user demographics. It signals care, thoroughness, and quality. Accessibility is not a cost — it's an investment in a better product for everyone.`,
    status: "published",
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    article_id: 104,
    author_id: 4,
    title: "AI and the Future of Work",
    summary: "How artificial intelligence is transforming industries.",
    content: `Artificial intelligence is no longer science fiction — it's reshaping how we work today. From automation of routine tasks to AI-powered analytics, organizations are leveraging these technologies to increase productivity and make better decisions.

In legal, AI tools are reviewing contracts in minutes instead of hours. In medicine, AI models are reading X-rays with accuracy that rivals specialists. In software, AI coding assistants are writing boilerplate, catching bugs, and suggesting optimizations in real time. The changes are not theoretical — they're happening in offices right now.

However, the rise of AI also brings real challenges: job displacement, the need for new skills, and questions about accountability when AI makes mistakes. These are not small concerns and deserve serious attention from governments, companies, and workers alike.

The future likely involves humans and AI working together symbiotically — AI handling data-heavy, repetitive tasks while humans focus on creativity, empathy, strategy, and judgment. To stay relevant, professionals need to embrace continuous learning, understand how AI works at a conceptual level, and develop the skills that machines still struggle with: nuanced communication, ethical reasoning, and original thinking.`,
    status: "published",
    published_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    article_id: 105,
    author_id: 5,
    title: "The Art of Digital Storytelling",
    summary: "Using multimedia to create engaging narratives.",
    content: `Digital storytelling combines text, images, audio, and video to create compelling narratives that resonate far beyond what words alone can achieve. In today's fast-paced digital world, audiences respond better to well-crafted stories than to raw information.

Great digital stories follow a classic structure: a hook that grabs attention in the first few seconds, rising tension or curiosity that keeps the audience engaged, and a satisfying payoff that delivers value. Whether it's a blog post, a documentary, or a social media thread, this structure works because human brains are wired for narrative.

Successful digital storytelling requires understanding your audience deeply. What do they care about? What language do they use? What platforms do they trust? The answers shape every creative decision, from tone to medium to distribution channel.

The tools available today — from free video editors to AI-generated imagery — make it easier than ever to create professional-quality digital content. The barrier is no longer technical. It's creative. The storytellers who will win are those who combine authentic human perspective with the technical fluency to bring it to life.`,
    status: "published",
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/** Returns all articles: local (user-published) + mock, deduped by article_id */
export function getAllArticles(): Article[] {
  const local = getLocalArticles();
  const mockIds = new Set(MOCK_ARTICLES.map((a) => a.article_id));
  const uniqueLocal = local.filter((a) => !mockIds.has(a.article_id));
  return [...uniqueLocal, ...MOCK_ARTICLES];
}

/** Find a single article by id across local + mock sources */
export function findArticleById(id: number): Article | undefined {
  return getAllArticles().find((a) => a.article_id === id);
}
