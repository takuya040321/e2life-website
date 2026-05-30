import Link from "next/link";

import { siteMetadata } from "@/lib/data/site";

const navLinks = [
  { href: "/skills", label: "~/skills" },
  { href: "/career", label: "~/career" },
  { href: "/contact", label: "~/contact" },
] as const;

export function Header() {
  return (
    <header className="border-foreground/10 border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-lg font-bold">
          <span className="text-terminal" aria-hidden="true">
            ❯
          </span>{" "}
          {siteMetadata.title}
        </Link>
        <nav>
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground/70 hover:text-terminal font-mono text-sm transition-colors"
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
