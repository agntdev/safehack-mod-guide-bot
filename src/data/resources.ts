// Curated topics and resources for the CyberEthics & Modding Guide bot.
// This data is static and curated by the bot owner.

export interface Topic {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export interface Resource {
  id: string;
  title: string;
  summary: string;
  url: string;
  tags: string[];
  topicId: string;
  addedAt: string; // ISO date string for "latest" ordering
}

export const TOPICS: Topic[] = [
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Learn about ethical hacking, security concepts, and best practices to protect systems.",
    emoji: "🔒",
  },
  {
    id: "modding",
    name: "Modding",
    description: "Explore game and software modification techniques and communities.",
    emoji: "🎮",
  },
  {
    id: "careers",
    name: "Careers",
    description: "Discover career paths in cybersecurity and related fields.",
    emoji: "💼",
  },
  {
    id: "tools",
    name: "Tools & Frameworks",
    description: "Find the right tools and frameworks for security testing and development.",
    emoji: "🛠",
  },
  {
    id: "communities",
    name: "Communities",
    description: "Join communities of like-minded enthusiasts and professionals.",
    emoji: "👥",
  },
];

export const RESOURCES: Resource[] = [
  // Cybersecurity
  {
    id: "cs-1",
    title: "OWASP Top 10 Web Application Security Risks",
    summary: "The standard awareness document for web application security, representing a broad consensus about the most critical risks.",
    url: "https://owasp.org/www-project-top-ten/",
    tags: ["web", "owasp", "beginner"],
    topicId: "cybersecurity",
    addedAt: "2025-12-01",
  },
  {
    id: "cs-2",
    title: "Nmap: The Network Mapper",
    summary: "Free and open-source utility for network discovery and security auditing, used by professionals worldwide.",
    url: "https://nmap.org",
    tags: ["networking", "scanning", "tool"],
    topicId: "cybersecurity",
    addedAt: "2025-11-28",
  },
  {
    id: "cs-3",
    title: "TryHackMe: Learn Cyber Security",
    summary: "Browser-based cybersecurity training with guided learning paths and virtual labs.",
    url: "https://tryhackme.com",
    tags: ["training", "beginner", "labs"],
    topicId: "cybersecurity",
    addedAt: "2025-11-25",
  },
  {
    id: "cs-4",
    title: "Kali Linux Documentation",
    summary: "Official documentation for Kali Linux, a penetration testing and security auditing platform.",
    url: "https://www.kali.org/docs/",
    tags: ["linux", "penetration-testing", "advanced"],
    topicId: "cybersecurity",
    addedAt: "2025-11-20",
  },

  // Modding
  {
    id: "md-1",
    title: "Game Modding with Cheat Engine",
    summary: "Learn how to use Cheat Engine for game memory editing and modding single-player games.",
    url: "https://www.cheatengine.org",
    tags: ["memory-editing", "game", "beginner"],
    topicId: "modding",
    addedAt: "2025-12-02",
  },
  {
    id: "md-2",
    title: "Nexus Mods Community",
    summary: "The largest community for game mods, with thousands of modifications for popular games.",
    url: "https://www.nexusmods.com",
    tags: ["community", "downloads", "games"],
    topicId: "modding",
    addedAt: "2025-11-30",
  },
  {
    id: "md-3",
    title: "Minecraft Mod Development Guide",
    summary: "Step-by-step guide to creating your own Minecraft mods using Java and Forge.",
    url: "https://mcmoddevelopment.com",
    tags: ["minecraft", "development", "tutorial"],
    topicId: "modding",
    addedAt: "2025-11-22",
  },

  // Careers
  {
    id: "cr-1",
    title: "Cybersecurity Career Roadmap",
    summary: "Comprehensive guide to building a career in cybersecurity, from entry-level to expert.",
    url: "https://www.cyberseek.org",
    tags: ["career", "certification", "roadmap"],
    topicId: "careers",
    addedAt: "2025-12-03",
  },
  {
    id: "cr-2",
    title: "CompTIA Security+ Certification Guide",
    summary: "Everything you need to know about the Security+ certification, a foundational cybersecurity credential.",
    url: "https://www.comptia.org/certifications/security",
    tags: ["certification", "comptia", "beginner"],
    topicId: "careers",
    addedAt: "2025-11-29",
  },
  {
    id: "cr-3",
    title: "Ethical Hacker Job Market Overview",
    summary: "Current trends, salary ranges, and demand for ethical hackers in the job market.",
    url: "https://www.salary.com/research/salary/alternate/ethical-hacker-salary",
    tags: ["salary", "market", "job"],
    topicId: "careers",
    addedAt: "2025-11-18",
  },

  // Tools & Frameworks
  {
    id: "tl-1",
    title: "Burp Suite: Web Vulnerability Scanner",
    summary: "Leading software for web application security testing, used by professionals and learners alike.",
    url: "https://portswigger.net/burp",
    tags: ["web", "scanner", "professional"],
    topicId: "tools",
    addedAt: "2025-12-04",
  },
  {
    id: "tl-2",
    title: "Metasploit Framework",
    summary: "The world's most used penetration testing framework, with thousands of exploits and payloads.",
    url: "https://www.metasploit.com",
    tags: ["penetration-testing", "framework", "advanced"],
    topicId: "tools",
    addedAt: "2025-11-27",
  },
  {
    id: "tl-3",
    title: "Wireshark: Network Protocol Analyzer",
    summary: "Free and open-source network protocol analyzer for deep inspection of network traffic.",
    url: "https://www.wireshark.org",
    tags: ["networking", "analysis", "free"],
    topicId: "tools",
    addedAt: "2025-11-24",
  },

  // Communities
  {
    id: "cm-1",
    title: "Reddit r/netsec Community",
    summary: "Active community discussing news, research, and tools in network security.",
    url: "https://www.reddit.com/r/netsec/",
    tags: ["reddit", "discussion", "news"],
    topicId: "communities",
    addedAt: "2025-12-05",
  },
  {
    id: "cm-2",
    title: "Hack The Box Platform",
    summary: "Gamified cybersecurity training platform with active community challenges and forums.",
    url: "https://www.hackthebox.com",
    tags: ["challenges", "community", "training"],
    topicId: "communities",
    addedAt: "2025-11-26",
  },
  {
    id: "cm-3",
    title: "OWASP Local Chapters",
    summary: "Find or start an OWASP chapter in your area for local networking and learning.",
    url: "https://owasp.org/chapter/",
    tags: ["owasp", "local", "networking"],
    topicId: "communities",
    addedAt: "2025-11-21",
  },
];

/** Find a topic by its ID. */
export function getTopic(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}

/** Get all resources for a topic, sorted by addedAt (newest first). */
export function getResourcesByTopic(topicId: string): Resource[] {
  return RESOURCES.filter((r) => r.topicId === topicId).sort(
    (a, b) => b.addedAt.localeCompare(a.addedAt),
  );
}

/** Search resources by query (matches title, summary, or tags). Returns up to `limit` results. */
export function searchResources(query: string, limit = 5): Resource[] {
  const q = query.toLowerCase();
  return RESOURCES.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q)),
  ).slice(0, limit);
}

/** Get the latest resources across all topics, limited to `limit`. */
export function getLatestResources(limit = 5): Resource[] {
  return [...RESOURCES].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, limit);
}

/** Find a resource by its URL (for bookmarking and reporting). */
export function findResourceByUrl(url: string): Resource | undefined {
  return RESOURCES.find((r) => r.url === url);
}

/** Format a resource as a readable card. */
export function formatResourceCard(resource: Resource): string {
  const tags = resource.tags.map((t) => `#${t}`).join(" ");
  return `📖 ${resource.title}\n\n${resource.summary}\n\n🔗 ${resource.url}\n\n${tags}`;
}
