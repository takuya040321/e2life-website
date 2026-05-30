import { siteMetadata } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="mt-auto">
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent, var(--accent-from), var(--accent-to), transparent)",
        }}
      />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <p className="text-foreground/50 text-sm">
          &copy; {new Date().getFullYear()} {siteMetadata.author}
        </p>
        <div className="flex gap-4">
          {siteMetadata.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 text-sm transition-colors hover:text-[var(--accent-from)]"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
