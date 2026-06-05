import { loadDefaultJapaneseParser } from "budoux";

const japaneseParser = loadDefaultJapaneseParser();
const trailingParticlePattern = /[はがをにでとへの]、?$/;
const standaloneParticlePattern = /^[はがをにでとへの]、?$/;

type JapaneseLineBreakProps = {
  text: string;
};

export function JapaneseLineBreak({ text }: JapaneseLineBreakProps) {
  const chunks = normalizeLeadingSpaces(
    mergeTrailingParticleChunks(japaneseParser.parse(text)).flatMap(splitLongChunk),
  );

  return (
    <span className="ja-budoux" aria-label={text}>
      {chunks.map((chunk, index) => (
        <span key={`${chunk}-${index}`} aria-hidden="true">
          {chunk}
          {index < chunks.length - 1 && <wbr />}
        </span>
      ))}
    </span>
  );
}

function normalizeLeadingSpaces(chunks: string[]) {
  const normalized: string[] = [];

  for (const chunk of chunks) {
    const leadingSpaces = chunk.match(/^\s+/)?.[0] ?? "";

    if (leadingSpaces && normalized.length > 0) {
      normalized[normalized.length - 1] = `${normalized.at(-1)}${leadingSpaces}`;
      normalized.push(chunk.slice(leadingSpaces.length));
      continue;
    }

    normalized.push(chunk);
  }

  return normalized;
}

function mergeTrailingParticleChunks(chunks: string[]) {
  const merged: string[] = [];

  for (const chunk of chunks) {
    const previous = merged.at(-1);

    if (previous && standaloneParticlePattern.test(chunk.trim())) {
      merged[merged.length - 1] = `${previous}${chunk}`;
      continue;
    }

    if (previous && trailingParticlePattern.test(previous.trim())) {
      merged[merged.length - 1] = `${previous}${chunk}`;
      continue;
    }

    merged.push(chunk);
  }

  return merged;
}

function splitLongChunk(chunk: string) {
  const trimmedLength = chunk.trim().length;
  if (trimmedLength <= 12) return [chunk];

  const scriptBoundaryIndex = findJapaneseScriptBoundary(chunk);
  if (scriptBoundaryIndex > 0) {
    return [chunk.slice(0, scriptBoundaryIndex), chunk.slice(scriptBoundaryIndex)];
  }

  return [chunk];
}

function findJapaneseScriptBoundary(text: string) {
  for (let index = 1; index < text.length; index += 1) {
    const previous = text[index - 1];
    const current = text[index];

    if (!previous || !current) continue;
    if (isKatakanaOrAscii(previous) && isHiraganaOrKanji(current)) {
      return index;
    }
  }

  return -1;
}

function isKatakanaOrAscii(character: string) {
  return /[ァ-ヶーA-Za-z0-9]/.test(character);
}

function isHiraganaOrKanji(character: string) {
  return /[ぁ-ん一-龠々]/.test(character);
}
