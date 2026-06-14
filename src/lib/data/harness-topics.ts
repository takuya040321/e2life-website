// ハーネス設計（/harness/）のコンテンツ。
//
// 構造は 3 階層:
//  1. トップ          = 複数の専門ハーネスを束ねる「全体のオーケストレーション設計」。
//  2. 専門ハーネス    = 役割・機能別の AI エージェント設計。その中で意識している項目を一覧する。
//  3. 項目            = 各専門ハーネスの中の 1 テーマ。概要と「意識していること」を書く。
//
// いずれも「何を・なぜ」意識しているかに絞り、具体的な実装手順（how）は
// 意図的に書かない（模倣されないため）。個人情報・固有名・機密も含めない。

/** トップ（全体オーケストレーション）で意識していること */
export type OrchestrationPrinciple = {
  title: string;
  body: string;
};

export const orchestrationPrinciples: OrchestrationPrinciple[] = [
  {
    title: "入口はひとつ",
    body: "やりたいことを伝える相手は、窓口役の AI ひとつだけ。各専門ハーネスへの振り分けは窓口が引き受けます。",
  },
  {
    title: "記録を活かす",
    body: "やり取りや判断を記録として残し、区切りごとに振り返って次の判断に活かします。残すのは活かすための土台です。",
  },
  {
    title: "組織のように分業する",
    body: "ひとつの AI に何でもやらせず、役割ごとに専門ハーネスを分け、ひとつの会社のように連携させます。",
  },
  {
    title: "独立した目でレビューする",
    body: "重要なアウトプットは、作った本人とは別の独立したハーネスが確認してから世に出します。",
  },
  {
    title: "安全に自走させる",
    body: "戻せる範囲は任せて自走させ、外部に影響する操作や戻せない操作の手前では必ず止めます。",
  },
];

/** 項目の中で意識していることの 1 つ */
export type HarnessPoint = {
  heading: string;
  body: string;
};

/** 別ハーネスなどへのリンク */
export type HarnessLink = {
  label: string;
  href: string;
};

/** 専門ハーネスの中の 1 項目（3 階層目） */
export type HarnessItem = {
  slug: string;
  title: string;
  /** 項目一覧カード用の短い説明 */
  summary: string;
  /** 項目詳細の概要 */
  overview: string;
  /** この項目で意識していること */
  points: HarnessPoint[];
  /** 他ハーネスへ委ねる話題のリンク（任意） */
  links?: HarnessLink[];
};

/** 専門ハーネス（2 階層目） */
export type SpecialistHarness = {
  slug: string;
  title: string;
  /** 一覧カード用の短い説明 */
  summary: string;
  /** このハーネスの役割（1 行） */
  role: string;
  /** 詳細ページの概要（どんなハーネスか） */
  overview: string;
  /** ready = 中身を公開 / preparing = 準備中 */
  status: "ready" | "preparing";
  /** このハーネスの項目（3 階層目） */
  items: HarnessItem[];
};

export const specialistHarnesses: SpecialistHarness[] = [
  {
    slug: "secretary",
    title: "秘書役ハーネス",
    summary: "唯一の窓口として、議論し、束ね、安全に走らせる。",
    role: "窓口・司令塔",
    overview:
      "利用者と接する唯一の窓口であり、全体の司令塔となるハーネスです。相談相手として一緒に考え、関連する専門ハーネスを束ねて方針を決め、安全な範囲で実行まで進めます。",
    status: "ready",
    items: [
      {
        slug: "discussion-partner",
        title: "議論パートナーになる",
        summary: "1on1・壁打ちの相手として、一緒に考える。",
        overview:
          "作業を任せる相手としてだけでなく、1on1 や壁打ちの相手として使います。ひとりで考えるより、ぶつけて返してもらいながら思考を深め、より良い結論にたどり着くための相談役です。",
        points: [
          {
            heading: "見えていない所を指摘する",
            body: "ただ同意するのではなく、抜けている視点や盲点を補います。気持ちよく賛成するだけの相手では、相談する意味がないからです。",
          },
          {
            heading: "意見に足して広げる",
            body: "こちらの考えを否定するのではなく、その上に付け加えて選択肢を広げます。良いところは残したまま、さらに良くする方向で返します。",
          },
          {
            heading: "決めるのは本人",
            body: "相談相手に徹し、結論を押しつけません。意見は出しても、最終的に決めるのは自分です。",
          },
        ],
        links: [
          {
            label: "「前にこう決めた」「それは矛盾している」と過去をふまえて照らせる仕組みは、記録ハーネスへ",
            href: "/harness/record",
          },
        ],
      },
      {
        slug: "orchestration",
        title: "司令塔として束ねる",
        summary: "関連する部長を集め、会議で方針をまとめて段取りする。",
        overview:
          "依頼を受けると、関連する部長（専門ハーネス）を集めて会議を開き、意見をまとめて方針を決め、実装まで段取りするハーネスです。",
        points: [
          {
            heading: "関連する部長を集めて会議する",
            body: "依頼に関わる専門ハーネスを呼び、それぞれに意見を出させます。ひとりで決めず、関係する立場の声を集めます。",
          },
          {
            heading: "意見を磨いて、ひとつの方針にまとめる",
            body: "各部長の意見に、秘書役がさらに良い案を足したり、複数の意見を束ねたりして、ひとつの方針を作ります。議論パートナーとしての力が、ここで効いてきます。",
          },
          {
            heading: "実装を段取りする",
            body: "方針が決まったら、各部長に指示を出し、その下で実装を進めさせます。最後まで流れを組み立てて見届けます。",
          },
        ],
        links: [
          {
            label: "上がってきた成果の品質を二重チェックする仕組みは、レビューハーネスへ",
            href: "/harness/review",
          },
        ],
      },
      {
        slug: "autonomy",
        title: "基本は自走し、許可がいる所で止まる",
        summary: "許可がいらない範囲は自走、いる範囲は止まって確認。",
        overview:
          "基本は自分で判断して進め、本人に確認した方がいいケースに来たら、そこで止まって確認するハーネスです。",
        points: [
          {
            heading: "許可がいらない範囲は自走する",
            body: "内側で完結する作業は、いちいち確認せずに走らせます。一つひとつ許可を取っていては前に進まないからです。",
          },
          {
            heading: "許可がいる範囲は止まる",
            body: "外に出す・本番に反映する・取り消せない操作の手前では、止まって本人に確認します。取り返しのつかないことは、勝手に進めません。",
          },
          {
            heading: "その線引きをはっきり持っておく",
            body: "どこまでが自走で、どこからが要確認かを、あらかじめ決めておきます。迷ったときは、止まる側に寄せます。",
          },
        ],
      },
    ],
  },
  {
    slug: "department",
    title: "部門担当ハーネス",
    summary: "領域ごとの判断軸を背負って方針を考える。",
    role: "領域ごとの判断役",
    overview: "担当する領域に特化し、その領域固有の判断軸で方針を検討するハーネスです。",
    status: "preparing",
    items: [],
  },
  {
    slug: "implementation",
    title: "実装ハーネス",
    summary: "役割を絞り、作って直すを反復して形にする。",
    role: "手を動かす役",
    overview: "実際に手を動かして成果物を作るハーネスです。",
    status: "preparing",
    items: [],
  },
  {
    slug: "review",
    title: "レビューハーネス",
    summary: "作り手とは別の独立した目で品質を確認する。",
    role: "独立確認役",
    overview: "成果物を世に出す前に、独立した立場で品質と整合を確認するハーネスです。",
    status: "preparing",
    items: [],
  },
  {
    slug: "record",
    title: "記録ハーネス",
    summary: "判断・知見・やり取りを蓄積し、次に活かす。",
    role: "記録・蓄積の基盤",
    overview:
      "やり取りや判断を記録として残し、振り返って次に活かすための基盤となるハーネスです。",
    status: "preparing",
    items: [],
  },
];

export function getSpecialistHarness(slug: string): SpecialistHarness | undefined {
  return specialistHarnesses.find((harness) => harness.slug === slug);
}

export function getHarnessItem(
  harnessSlug: string,
  itemSlug: string,
): { harness: SpecialistHarness; item: HarnessItem } | undefined {
  const harness = getSpecialistHarness(harnessSlug);
  if (!harness) return undefined;
  const item = harness.items.find((entry) => entry.slug === itemSlug);
  if (!item) return undefined;
  return { harness, item };
}
