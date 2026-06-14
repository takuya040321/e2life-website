import Image from "next/image";
import Link from "next/link";

import { siteMetadata } from "@/lib/data/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ai", label: "AI活用" },
  { href: "/harness", label: "ハーネス設計" },
  { href: "/about", label: "自分について" },
] as const;

export function Header() {
  return (
    <header className="border-border/80 bg-background/85 border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold">
          <span aria-hidden="true" className="bg-accent size-2.5 rounded-sm" />
          {siteMetadata.title}
          <Image
            src="/illustrations/hanko-e2life.png"
            alt=""
            width={36}
            height={36}
            aria-hidden="true"
            className="size-9"
            priority
          />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
          <ul className="flex flex-wrap justify-end gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex items-center rounded-sm px-3 py-1.5 text-sm font-bold transition-colors sm:px-4 sm:py-2"
          >
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
