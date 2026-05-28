import { siteMetadata } from "@/lib/data/site";

type JsonLdData = Record<string, unknown>;

export function PersonJsonLd() {
  const data: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMetadata.author,
    url: siteMetadata.url,
    description: siteMetadata.description,
    sameAs: siteMetadata.socialLinks.map((link) => link.url),
    jobTitle: "ソフトウェアエンジニア",
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function WebSiteJsonLd() {
  const data: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMetadata.title,
    url: siteMetadata.url,
    description: siteMetadata.description,
    inLanguage: "ja-JP",
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
