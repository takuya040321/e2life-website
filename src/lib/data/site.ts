type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

type SiteMetadata = {
  title: string;
  description: string;
  url: string;
  author: string;
  locale: string;
  socialLinks: SocialLink[];
};

export const siteMetadata: SiteMetadata = {
  title: "e2life.dev",
  description: "AI で開発プロセス自体を設計するエンジニア",
  url: "https://e2life.dev",
  author: "たくや",
  locale: "ja_JP",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/takuya040321",
      icon: "github",
    },
  ],
};
