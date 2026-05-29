// 職務経歴データ。大本スキルシート（SE 事業のスキルシート v1）の案件実績を元に、
// CLAUDE.md の匿名化ルールに従って顧客名・契約金額を一切含めない形で記述している。
// 業務案件は同一企業（製造業）での正社員案件のため、業界名のみで匿名化する。
// 個人開発は個人事業（EC 自動化）として記載する。

export const projectTypes = [
  "web-app",
  "mobile-app",
  "api",
  "infrastructure",
  "data-pipeline",
  "other",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export type CareerProject = {
  id: string;
  period: {
    start: string;
    end?: string;
  };
  projectType: ProjectType;
  title: string;
  description: string;
  teamSize: string;
  role: string;
  technologies: string[];
  highlights: string[];
};

export const projects: CareerProject[] = [
  {
    id: "project-001",
    period: { start: "2026-05" },
    projectType: "web-app",
    title: "AI 活用開発プロセス設計・ポートフォリオサイト構築",
    description:
      "マルチエージェント構成による品質管理と自己改善する開発プロセスを設計。ポートフォリオサイトを Next.js 16 で構築（個人開発）",
    teamSize: "1名",
    role: "個人開発",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vitest",
      "Playwright",
      "GitHub Actions",
      "Vercel",
      "Claude Code",
    ],
    highlights: [
      "Claude Code を用いたマルチエージェント開発プロセスを設計",
      "CI で lint / test / Lighthouse を PR ごとに自動実行",
      "Vercel プレビューと組み合わせた継続的デリバリーを構築",
    ],
  },
  {
    id: "project-002",
    period: { start: "2026-01", end: "2026-04" },
    projectType: "web-app",
    title: "マスタ管理機能のフルスタック開発",
    description:
      "製造業の社内システムにおけるマスタメンテナンス機能をフルスタックで開発。REST API 設計・実装からフロントエンド画面実装まで一貫して担当",
    teamSize: "3名",
    role: "リーダー",
    technologies: [
      "C#",
      "ASP.NET Core",
      "TypeScript",
      "React",
      "MUI",
      "Vite",
      "Swagger",
      "SQL Server",
      "Docker",
    ],
    highlights: [
      "REST API 設計（Swagger 定義）から CRUD・バリデーション実装まで担当",
      "フロントエンドのマスタ一覧・編集モーダル・状態管理を実装",
      "設計レビュー・コードレビュー・スケジュール管理を主導",
    ],
  },
  {
    id: "project-003",
    period: { start: "2026-01", end: "2026-04" },
    projectType: "data-pipeline",
    title: "マルチプラットフォーム在庫同期システム",
    description:
      "Amazon SP-API および複数 EC API 経由で商品・在庫データを自動取得し、スプレッドシートに同期するシステムを設計・実装（個人事業）",
    teamSize: "1名",
    role: "個人開発",
    technologies: [
      "Python",
      "Google Apps Script",
      "Playwright",
      "Amazon SP-API",
      "楽天市場 API",
      "GitHub Actions",
    ],
    highlights: [
      "SP-API・複数 EC API・スクレイピングを統合した在庫同期基盤を構築",
      "GitHub Actions による定期実行基盤を設計・構築",
      "ユニットテストを整備し CI で自動実行",
    ],
  },
  {
    id: "project-004",
    period: { start: "2026-01", end: "2026-02" },
    projectType: "other",
    title: "レビュー依頼自動送信バッチ",
    description:
      "配送完了した注文の購入者に対し、レビュー依頼を自動送信するバッチシステムを単独で設計・開発（個人事業）",
    teamSize: "1名",
    role: "個人開発",
    technologies: ["Python", "Amazon SP-API", "GitHub Actions", "pytest"],
    highlights: [
      "SP-API のレート制限対策（リトライロジック）を実装",
      "GitHub Actions によるスケジュール実行基盤を構築",
      "依存性注入対応のリファクタリングとユニットテストを整備",
    ],
  },
  {
    id: "project-005",
    period: { start: "2025-12", end: "2026-01" },
    projectType: "other",
    title: "ソースコード変更量分析ツール",
    description:
      "バージョン管理システムと連携し、リビジョン間の変更量を解析して Excel 出力するデスクトップツールを開発",
    teamSize: "1名",
    role: "リーダー",
    technologies: ["Python", "Tkinter", "Perforce", "PyInstaller", "uv"],
    highlights: [
      "Perforce 連携でリビジョン間 diff を解析するモジュールを実装",
      "GUI（ユーザー取得・カレンダー・プログレスバー）を実装",
      "PyInstaller で単一 EXE としてパッケージング",
    ],
  },
  {
    id: "project-006",
    period: { start: "2025-11", end: "2026-01" },
    projectType: "other",
    title: "音声認識による作業支援システム",
    description:
      "マイク入力からリアルタイムに音声を認識し、音声コマンドで業務アプリケーション操作を自動化するデスクトップシステムを設計・開発",
    teamSize: "1名",
    role: "リーダー",
    technologies: ["Python", "Tkinter", "Vosk", "uv"],
    highlights: [
      "Vosk + VAD でリアルタイム音声認識パイプラインを実装",
      "トリガーワードによるコマンド抽出と業務アプリ操作制御を実現",
      "ノイズ抑制・録音機能・配布環境構築まで対応",
    ],
  },
  {
    id: "project-007",
    period: { start: "2025-08", end: "2026-02" },
    projectType: "data-pipeline",
    title: "EC 売上データ自動転記・在庫管理システム",
    description:
      "Amazon・メルカリの売上データを自動読み込みし、商品管理シートへ転記するシステムを設計・開発。SP-API を利用した商品登録・在庫調整機能も実装（個人事業）",
    teamSize: "1名",
    role: "個人開発",
    technologies: ["JavaScript", "Google Apps Script", "Amazon SP-API", "Google Sheets API"],
    highlights: [
      "2 プラットフォームの売上自動転記を GAS で構築",
      "SP-API で商品登録・在庫調整・販売レポート取得を実装",
      "一括書き込み・バッチ処理によるパフォーマンス最適化",
    ],
  },
  {
    id: "project-008",
    period: { start: "2025-07", end: "2025-09" },
    projectType: "web-app",
    title: "品質管理システムのフロントエンド開発",
    description:
      "製造業向け品質管理システムのフロントエンド開発。検査ロット管理に使う各種マスタメンテナンス画面の新規実装と既存画面のリファクタリングを担当",
    teamSize: "4名",
    role: "プログラマー",
    technologies: ["TypeScript", "JavaScript", "React", "MUI", "Vite", "Tailwind CSS", "Axios"],
    highlights: [
      "React + MUI で新規マスタメンテナンス画面を実装",
      "既存コードをリファクタリング（バレル化・命名規則統一・ロジック/UI 分離）",
      "コードレビュー指摘への対応",
    ],
  },
  {
    id: "project-009",
    period: { start: "2025-03", end: "2025-07" },
    projectType: "data-pipeline",
    title: "市況データ自動収集システム",
    description:
      "調達部門向けに、複数 Web サイトから市況データを自動収集し、Excel に蓄積・グラフ化するシステムを開発",
    teamSize: "2名",
    role: "リーダー",
    technologies: ["Python", "VBA", "BeautifulSoup", "Requests", "pandas"],
    highlights: [
      "複数 Web サイト対応のデータ取得モジュール（HTML / 動的サイト / PDF 解析）を実装",
      "タスクスケジューラによる月次自動実行基盤を構築",
      "ロックファイル排他制御・遡及取得・デスクトップ通知を実装",
    ],
  },
  {
    id: "project-010",
    period: { start: "2024-06", end: "2024-11" },
    projectType: "other",
    title: "Excel 管理表の自動転記ツール",
    description:
      "複数機種間で Excel 管理表データを自動転記する GUI ツールを設計・開発。手作業のデータ入力を自動化",
    teamSize: "1名",
    role: "リーダー",
    technologies: ["Python", "Tkinter", "openpyxl", "xlwings", "pandas"],
    highlights: [
      "19 種類の Excel 管理表を openpyxl / xlwings で自動転記",
      "年度・季節判定など業務ロジックを実装",
      "exe 化して現場へ配布",
    ],
  },
  {
    id: "project-011",
    period: { start: "2023-07", end: "2026-04" },
    projectType: "other",
    title: "組込製品ファームウェアの UI 立ち上げ",
    description:
      "製造業の組込製品向けファームウェアの UI 部分を立ち上げ。見積もり・契約から Define 定義設計・実装、各種デバイスのテスト・納品までリーダーとして一貫対応",
    teamSize: "3名",
    role: "リーダー",
    technologies: ["C/C++", "MFC", "Perforce", "Jenkins"],
    highlights: [
      "組込 FW のリーダーとして工数見積もりから納品まで一貫して担当",
      "C/C++ による Define 定義実装・データテーブル作成・デバイス立ち上げ",
      "スケジュール管理・コードレビュー・顧客/他部門との仕様調整を主導",
    ],
  },
];
