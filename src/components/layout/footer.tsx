import Image from "next/image";
import Link from "next/link";

import { siteMetadata } from "@/lib/data/site";

const siteMapLinks = [
  { href: "/", label: "Home" },
  { href: "/ai", label: "AI活用事例" },
  { href: "/harness", label: "ハーネス設計" },
  { href: "/about", label: "自分について" },
  { href: "/contact", label: "お問い合わせ" },
] as const;

export function Footer() {
  return (
    <footer className="border-border/80 bg-card/60 relative mt-auto border-t">
      <div aria-hidden="true" className="bg-accent/80 mx-auto h-px max-w-5xl" />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <p className="font-serif text-base font-bold">{siteMetadata.title}</p>
            <p className="text-muted-foreground mt-1 text-xs leading-6">
              {siteMetadata.description}
            </p>
            <Link
              href="/contact"
              className="text-accent mt-4 inline-block font-mono text-xs font-bold tracking-[0.16em]"
            >
              お問い合わせ →
            </Link>
          </div>
          <nav aria-label="サイトマップ">
            <p className="text-accent font-mono text-[10px] font-bold tracking-[0.22em] uppercase">
              Site Map
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-1">
              {siteMapLinks.map((link) => (
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
        <div className="border-border/60 mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6 pr-24">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} {siteMetadata.author}
          </p>
          <div className="flex gap-4">
            {siteMetadata.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent text-xs transition-colors"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
      <Image
        src="/illustrations/hanko-e2life.png"
        alt=""
        width={56}
        height={56}
        aria-hidden="true"
        className="absolute right-6 bottom-3 size-14 opacity-90"
      />
    </footer>
  );
}
