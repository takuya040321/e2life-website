// ハーネス設計（/harness/）のコンテンツ。
//
// このページは「わたしがどんなハーネス設計をしているか」を紹介するページ。
// すべての文章は一人称（わたし）で書き、初めて読む人にも自己紹介として伝わるようにする。
//
// 構造は 3 階層:
//  1. トップ          = 複数の専門ハーネスを束ねる「全体のオーケストレーション設計」。
//  2. 専門ハーネス    = 役割・機能別の AI エージェント設計。
//  3. 項目            = 各専門ハーネスの中の 1 テーマ。概要と「意識していること」を書く。
//
// いずれも「何を・なぜ」意識しているかに絞り、具体的な実装手順（how）は
// 意図的に書かない（模倣されないため）。個人情報・固有名・機密も含めない。

/** トップ（全体オーケストレーション）でわたしが意識していること */
export type OrchestrationPrinciple = {
  title: string;
  body: string;
};

export const orchestrationPrinciples: OrchestrationPrinciple[] = [
  {
    title: "入口はひとつ",
    body: "わたしが話す相手は、秘書役の AI ひとつだけ。各専門ハーネスへの振り分けは秘書役に任せ、自分は「何をしたいか」だけに集中できるようにしています。",
  },
  {
    title: "記録を活かす",
    body: "やり取りや判断を記録として残し、区切りごとに振り返って次の判断に活かしています。残すこと自体が目的ではなく、活かすための土台として記録しています。",
  },
  {
    title: "組織のように分業する",
    body: "ひとつの AI に何でもやらせるのではなく、役割ごとに専門ハーネスを分け、ひとつの組織として分担して動かしています。各々が自分の役割に集中できるようにしています。",
  },
  {
    title: "独立した目でレビューする",
    body: "重要なアウトプットは、作った本人とは別の独立したハーネスが確認してから世に出すようにしています。作り手の議論の流れに加わっていない目を通すのがポイントです。",
  },
  {
    title: "安全に自走させる",
    body: "戻せる範囲は任せて自走させ、外部に影響する操作や戻せない操作の手前では必ず止める設計にしています。速さと安全のバランスを線引きで決めています。",
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
    summary: "わたしと唯一接する窓口として、議論し、束ね、安全に走らせるハーネス。",
    role: "窓口・司令塔",
    overview:
      "わたしが直接話す唯一の窓口であり、全体の司令塔となるハーネスです。わたしの相談相手として一緒に考え、関連する専門ハーネスを束ねて方針を決め、安全な範囲で実行まで進めます。",
    status: "ready",
    items: [
      {
        slug: "discussion-partner",
        title: "議論パートナーになる",
        summary: "わたしの 1on1・壁打ち相手として、一緒に考える。",
        overview:
          "作業を任せる相手としてだけでなく、わたしの 1on1 や壁打ち相手として使っています。ひとりで考えるより、ぶつけて返してもらいながら思考を深め、より良い結論にたどり着くための相談役にしています。",
        points: [
          {
            heading: "見えていない所を指摘してもらう",
            body: "ただ同意するのではなく、わたしに抜けている視点や盲点を補ってもらいます。気持ちよく賛成するだけの相手では、相談する意味がないからです。",
          },
          {
            heading: "意見に足して広げてもらう",
            body: "わたしの考えを否定するのではなく、その上に付け加えて選択肢を広げてもらいます。良いところは残したまま、さらに良くする方向で返してもらうように設計しています。",
          },
          {
            heading: "決めるのはわたし",
            body: "相談相手に徹してもらい、結論を押しつけてこないようにしています。意見は出してもらっても、最終的に決めるのはわたし自身です。",
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
        summary: "関連する部門担当を集めて会議を開き、方針をまとめて段取りする。",
        overview:
          "わたしの依頼を受けた秘書役が、関連する部門担当の AI を集めて会議を開き、意見をまとめて方針を決め、実装まで段取りするハーネスです。",
        points: [
          {
            heading: "関連する部門担当を集めて会議する",
            body: "依頼に関わる専門ハーネスを呼び、それぞれに意見を出させます。秘書役ひとりで決めず、関係する立場の声を集めるようにしています。",
          },
          {
            heading: "意見を磨いて、ひとつの方針にまとめる",
            body: "各部門担当の意見に、秘書役がさらに良い案を足したり、複数の意見を束ねたりして、ひとつの方針を作ります。議論パートナーとしての力が、ここで効いてきます。",
          },
          {
            heading: "実装を段取りする",
            body: "方針が決まったら、各部門担当に指示を出し、その下で実装を進めさせます。最後まで流れを組み立てて見届けさせています。",
          },
        ],
        links: [
          {
            label: "上がってきた成果の品質を独立した目で確認する仕組みは、レビューハーネスへ",
            href: "/harness/review",
          },
        ],
      },
      {
        slug: "autonomy",
        title: "基本は自走し、許可がいる所で止まる",
        summary: "許可がいらない範囲は自走、いる範囲は止まってわたしに確認。",
        overview:
          "基本は秘書役が自分で判断して進め、わたしに確認した方がいいケースに来たら、そこで止まって聞いてくるハーネスです。",
        points: [
          {
            heading: "許可がいらない範囲は自走する",
            body: "内側で完結する作業は、いちいち確認させずに走らせます。一つひとつ許可を取っていては前に進まないからです。",
          },
          {
            heading: "許可がいる範囲は止まる",
            body: "外に出す・本番に反映する・取り消せない操作の手前では、止まってわたしに確認させます。取り返しのつかないことは、勝手に進めさせません。",
          },
          {
            heading: "その線引きをはっきり持っておく",
            body: "どこまでが自走で、どこからが要確認かを、あらかじめ決めておきます。迷ったときは、止まる側に寄せるようにしています。",
          },
        ],
      },
    ],
  },
  {
    slug: "department",
    title: "部門担当ハーネス",
    summary: "わたしの各事業領域ごとの判断軸を背負って方針を考える。",
    role: "領域ごとの判断役",
    overview:
      "わたしの担当領域ごとに専任の AI を置き、その領域固有の判断軸で方針を検討してもらうハーネスです。",
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
