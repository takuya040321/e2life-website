import { siteMetadata } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-foreground/10 mt-auto border-t">
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
              className="text-foreground/50 hover:text-foreground text-sm transition-colors"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
