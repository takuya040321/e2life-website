import Link from "next/link";

import { siteMetadata } from "@/lib/data/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
] as const;

const accentGradient = "linear-gradient(to right, var(--accent-from), var(--accent-to))";

export function Header() {
  return (
    <header className="border-foreground/10 border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full"
            style={{ backgroundImage: accentGradient }}
          />
          {siteMetadata.title}
        </Link>
        <nav>
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground/70 text-sm transition-colors hover:text-[var(--accent-from)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
