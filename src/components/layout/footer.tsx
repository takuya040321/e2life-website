import { siteMetadata } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-border/80 bg-card/60 mt-auto border-t">
      <div aria-hidden="true" className="bg-accent/80 mx-auto h-px max-w-5xl" />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
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
    </footer>
  );
}
