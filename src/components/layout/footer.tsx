import Image from "next/image";

import { siteMetadata } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-border/80 bg-card/60 relative mt-auto border-t">
      <div aria-hidden="true" className="bg-accent/80 mx-auto h-px max-w-5xl" />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 pr-24">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} {siteMetadata.author}
        </p>
        <div className="flex gap-4">
          {siteMetadata.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent text-sm transition-colors"
            >
              {link.platform}
            </a>
          ))}
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
