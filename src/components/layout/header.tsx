import Image from "next/image";
import Link from "next/link";

import { siteMetadata } from "@/lib/data/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ai", label: "AI" },
  { href: "/skills", label: "スキル" },
  { href: "/career", label: "経歴" },
  { href: "/contact", label: "お問い合わせ" },
] as const;

export function Header() {
  return (
    <header className="border-border/80 bg-background/85 border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
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
        <nav>
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
        </nav>
      </div>
    </header>
  );
}
