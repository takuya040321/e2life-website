// 掲載対象ホワイトリスト。スプシ「技術」列の表記をキーに、サイト掲載用の
// id / 表示名 / ロゴファイルを一元管理する。
//
// - ここに無い技術はサイトに掲載しない（ロゴが無い組込/自社ツール/各種ライブラリ等）。
//   これにより skills.ts の「ロゴのある技術のみ掲載」ルールをコードで担保する。
// - logo は public/logos 配下のファイル名。生成時に実在検証する。
// - id を固定で持つことで、スプシの行順が変わっても skills.ts の id がドリフトしない。

export type TechEntry = {
  id: string;
  name: string;
  logo: string;
};

/** スプシ技術名 → 掲載メタ情報 */
export const TECH_REGISTRY: Record<string, TechEntry> = {
  // 言語
  "C/C++": { id: "c-cpp", name: "C/C++", logo: "cplusplus.svg" },
  "C#": { id: "csharp", name: "C#", logo: "csharp.svg" },
  Python: { id: "python", name: "Python", logo: "python.svg" },
  TypeScript: { id: "typescript", name: "TypeScript", logo: "typescript.svg" },
  JavaScript: { id: "javascript", name: "JavaScript", logo: "javascript.svg" },

  // フレームワーク・UI
  React: { id: "react", name: "React", logo: "react.svg" },
  Vite: { id: "vite", name: "Vite", logo: "vite.svg" },
  "ASP.NET Core": { id: "aspnet-core", name: "ASP.NET Core", logo: "dotnet.svg" },
  MUI: { id: "mui", name: "MUI", logo: "mui.svg" },
  "Tailwind CSS": { id: "tailwindcss", name: "Tailwind CSS", logo: "tailwindcss.svg" },
  "Google Apps Script": {
    id: "google-apps-script",
    name: "Google Apps Script",
    logo: "googleappsscript.svg",
  },
  Playwright: { id: "playwright", name: "Playwright", logo: "playwright.svg" },

  // データベース
  "SQL Server": { id: "sql-server", name: "SQL Server", logo: "microsoftsqlserver.svg" },
  "Google Sheets API": {
    id: "google-sheets-api",
    name: "Google Sheets API",
    logo: "googlesheets.svg",
  },

  // バージョン管理
  Git: { id: "git", name: "Git", logo: "git.svg" },
  GitHub: { id: "github", name: "GitHub", logo: "github.svg" },
  GitLab: { id: "gitlab", name: "GitLab", logo: "gitlab.svg" },

  // CI・自動化
  "GitHub Actions": { id: "github-actions", name: "GitHub Actions", logo: "githubactions.svg" },
  Jenkins: { id: "jenkins", name: "Jenkins", logo: "jenkins.svg" },

  // パッケージ・ビルド
  uv: { id: "uv", name: "uv", logo: "uv.svg" },
  Rye: { id: "rye", name: "Rye", logo: "rye.svg" },
  Yarn: { id: "yarn", name: "Yarn", logo: "yarn.svg" },
  "Node.js": { id: "nodejs", name: "Node.js", logo: "nodedotjs.svg" },
  Docker: { id: "docker", name: "Docker", logo: "docker.svg" },

  // 開発支援
  ESLint: { id: "eslint", name: "ESLint", logo: "eslint.svg" },
  Prettier: { id: "prettier", name: "Prettier", logo: "prettier.svg" },
  Ruff: { id: "ruff", name: "Ruff", logo: "ruff.svg" },
  pytest: { id: "pytest", name: "pytest", logo: "pytest.svg" },
  Swagger: { id: "swagger", name: "Swagger", logo: "swagger.svg" },

  // IDE
  "VS Code": { id: "vscode", name: "VS Code", logo: "vscode.svg" },
  "Visual Studio": { id: "visual-studio", name: "Visual Studio", logo: "visualstudio.svg" },
  Eclipse: { id: "eclipse", name: "Eclipse", logo: "eclipseide.svg" },
  Cursor: { id: "cursor", name: "Cursor", logo: "cursor.svg" },

  // ライブラリ・API
  "楽天市場 API": { id: "rakuten-api", name: "楽天市場 API", logo: "rakuten.svg" },
  pandas: { id: "pandas", name: "pandas", logo: "pandas.svg" },
  Axios: { id: "axios", name: "Axios", logo: "axios.svg" },

  // AI
  "Claude Code": { id: "claude-code", name: "Claude Code", logo: "claude.svg" },
  Copilot: { id: "copilot", name: "GitHub Copilot", logo: "githubcopilot.svg" },
};
